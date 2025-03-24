"use client"

import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation';

const MainLayout = ({ children }: {children : React.ReactNode}) => {
    const pathname = usePathname();
    console.log(pathname)
  return (
    <div>
      
      <main>{children}</main>
      {pathname !== '/login' && <Header />}

    </div>
  );
};

export default MainLayout;