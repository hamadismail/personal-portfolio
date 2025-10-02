import Sidebar from "@/components/shared/Sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex gap-4">
      <Sidebar />
      <div className="ml-[260px] w-full">
        {children}
      </div>
    </main>
  );
}
