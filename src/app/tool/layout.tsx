'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace('/login');
    }
  }, [user, isInitialized, router]);

  if (!isInitialized || !user) {
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
