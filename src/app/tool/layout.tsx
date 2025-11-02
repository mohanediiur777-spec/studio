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
    // If initialization is complete and there's no user, redirect to login,
    // but allow access to the first step of the tool.
    if (isInitialized && !user && pathname !== '/tool/company-info') {
      router.replace('/login');
    }
  }, [user, isInitialized, router, pathname]);

  // Determine if we should show a loading state.
  // This happens if the app isn't initialized yet, or if we are redirecting.
  const isLoading = !isInitialized || (!user && pathname !== '/tool/company-info');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container px-4 md:px-6 py-8">
        {isLoading ? (
          <div className="flex h-[50vh] w-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <ToolStepper />
            <div className="mt-8">{children}</div>
          </div>
        )}
      </main>
    </div>
  );
}
