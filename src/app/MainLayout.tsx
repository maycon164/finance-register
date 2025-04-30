"use client";

import { Header } from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const queryClient = new QueryClient();

  const urls = ["/login"];

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <main>{children}</main>
        {!urls.includes(pathname) && <Header />}
      </div>
      <Toaster richColors />
    </QueryClientProvider>
  );
};

export default MainLayout;
