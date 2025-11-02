'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/hooks/useApp';
import Header from '@/components/Header';
import ToolStepper from '@/components/tool/ToolStepper';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isInitialized } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only enforce login for steps after company-info
    if (isInitialized && !user && pathname !== '/tool/company-info') {
      router.replace('/login');
    }
  }, [user, isInitialized, router, pathname]);

  // Don't show a full-screen loader for the initial step if the user isn't logged in.
  // The page can be used by guest users.
  if (isInitialized && !user && pathname !== '/tool/company-info') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!isInitialized) {
     return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <ToolStepper />
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
