"use client"

import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const urls = ["/login"]

  return (
    <div>
      <main>{children}</main>
      {!urls.includes(pathname) && <Header />}
    </div>
  );
};

export default MainLayout;