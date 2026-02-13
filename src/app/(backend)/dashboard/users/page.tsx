"use client";


import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import { GlassBadge } from "@/app/(frontend)/_components/ui/GlassBadge";
import { GlassButton } from "@/app/(frontend)/_components/ui/GlassButton";
import { Plus, MoreVertical, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

const users = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Inactive" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "Active" },
    { id: "4", name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active" },
    { id: "5", name: "Ethan Hunt", email: "ethan@example.com", role: "Editor", status: "Pending" },
];

export default function UsersPage() {
    return (

        <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-glass-text">User Management</h1>
                    <p className="text-glass-text/60">Manage your team members and their account permissions.</p>
                </div>
                <GlassButton className="flex items-center gap-2">
                    <Plus size={18} /> Add User
                </GlassButton>
            </div>

            <DataTable
                data={users}
                columns={[
                    {
                        header: "User",
                        accessor: (user) => (
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    {user.name[0]}
                                </div>
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-xs text-glass-text/40">{user.email}</p>
                                </div>
                            </div>
                        )
                    },
                    {
                        header: "Role",
                        accessor: (user) => (
                            <span className="text-xs font-semibold px-2 py-1 bg-white/5 rounded-lg border border-glass-border">
                                {user.role}
                            </span>
                        )
                    },
                    {
                        header: "Status",
                        accessor: (user) => (
                            <GlassBadge variant={user.status === "Active" ? "success" : user.status === "Pending" ? "warning" : "default"}>
                                {user.status}
                            </GlassBadge>
                        )
                    },
                    {
                        header: "Actions",
                        accessor: () => (
                            <div className="flex items-center gap-2">
                                <GlassButton variant="ghost" size="sm" className="p-2">
                                    <Mail size={16} />
                                </GlassButton>
                                <GlassButton variant="ghost" size="sm" className="p-2">
                                    <MoreVertical size={16} />
                                </GlassButton>
                            </div>
                        ),
                        className: "text-right"
                    }
                ]}
            />
        </motion.div>

    );
}
