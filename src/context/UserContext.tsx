"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getCurrentUser } from "@/services/authService";
import { getRolePermissions } from "@/services/roleService";
import { useRouter, usePathname } from "next/navigation";

interface UserContextType {
    user: any;
    setUser: (user: any) => void;
    syncProfile: () => Promise<void>;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const syncProfile = useCallback(async () => {
        try {
            const response = await getCurrentUser();
            const freshUser = response.data;
            if (!freshUser) return;

            // Aggregasi permissions dari semua role
            let allPermissions: string[] = [];

            if (freshUser.roles && freshUser.roles.length > 0) {
                try {
                    const rolePromises = (freshUser.roles || []).map(async (role: any) => {
                        // Robust ID extraction
                        let roleId = null;
                        if (typeof role === 'object' && role !== null) {
                            roleId = role.id || role.role_id || role.roleId;
                        } else if (typeof role === 'number') {
                            roleId = role;
                        }

                        if (roleId) {
                            const permsResp = await getRolePermissions(roleId);
                            if (permsResp.status === "success" || permsResp.status === "200") {
                                return permsResp.data.map((p: any) => p.name.toLowerCase());
                            }
                        }
                        return [];
                    });

                    const results = await Promise.all(rolePromises);
                    allPermissions = Array.from(new Set(results.flat()));
                } catch (e) {
                    console.error("Failed to fetch permissions for roles", e);
                }
            }

            const updatedUser = { ...freshUser, permissions: allPermissions };

            const savedUserStr = localStorage.getItem("user");
            let stateChanged = false;

            if (savedUserStr) {
                const savedUser = JSON.parse(savedUserStr);
                const oldPerms = (savedUser.permissions || []).sort().join(',');
                const newPerms = allPermissions.sort().join(',');
                stateChanged = oldPerms !== newPerms || JSON.stringify(savedUser.roles) !== JSON.stringify(freshUser.roles);
            } else {
                stateChanged = true;
            }

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            // --- REDIRECTION LOGIC (ROBUST) ---
            const roleNames: string[] = (freshUser.roles || []).map((r: any) => {
                if (typeof r === 'string') return r.toLowerCase();
                if (typeof r === 'object' && r !== null) return (r.name || r.roleName || "").toLowerCase();
                return "";
            }).filter((r: string) => r.length > 0);

            if (stateChanged) {
                console.log("Context Sync Result:", { roles: roleNames, permissions: allPermissions });
            }

            const hasSuperAccess = allPermissions.includes("view dashboard superadmin") ||
                roleNames.some(r => r === "superadmin" || r === "superadminevent" || r.includes("superadmin"));

            const hasAdminAccess = allPermissions.includes("view dashboard admin") ||
                roleNames.some(r => r === "admin" || r.includes("admin"));

            if (stateChanged) {
                console.log("Context Sync Result:", {
                    roles: roleNames,
                    permissions: allPermissions,
                    hasSuperAccess,
                    hasAdminAccess
                });
            }

            // Safety: Don't redirect if we are still fetching permissions but have a valid role as fallback
            const isAuthorized = hasSuperAccess || hasAdminAccess;

            // Only redirect if we are sure about the status
            if (pathname.startsWith("/dashboard/superadmin")) {
                if (!hasSuperAccess) {
                    console.warn("Access Denied to Superadmin Path. Redirecting...", { roleNames, allPermissions });
                    router.push(hasAdminAccess ? "/dashboard/admin" : "/member");
                }
            } else if (pathname.startsWith("/dashboard/admin")) {
                if (!hasAdminAccess) {
                    console.warn("Access Denied to Admin Path. Redirecting...", { roleNames, allPermissions });
                    router.push("/member");
                }
            } else if (pathname === "/dashboard") {
                if (!isAuthorized) {
                    console.warn("Access Denied to Dashboard Root. Redirecting to /member");
                    router.push("/member");
                }
            }
        } catch (error: any) {
            if (error.message.includes("401") || error.message.includes("Unauthorized")) {
                router.push("/login");
            }
        } finally {
            setLoading(false);
        }
    }, [pathname, router]);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        syncProfile();

        const interval = setInterval(syncProfile, 10000);
        window.addEventListener("focus", syncProfile);

        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", syncProfile);
        };
    }, [syncProfile]);

    return (
        <UserContext.Provider value={{ user, setUser, syncProfile, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
