import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <Topbar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
