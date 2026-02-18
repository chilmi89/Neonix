import { AppLayout } from "@/app/(backend)/_components/layout/AppLayout";
import { UserProvider } from "@/context/UserContext";

export default function BackendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <AppLayout>{children}</AppLayout>
    </UserProvider>
  );
}
