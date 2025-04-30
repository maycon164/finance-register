"use client";

import { Header } from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

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
    </QueryClientProvider>
  );
};

export default MainLayout;
