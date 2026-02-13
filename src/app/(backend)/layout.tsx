import { AppLayout } from "@/app/(backend)/_components/layout/AppLayout";

export default function BackendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
