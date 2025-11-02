'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, UserCircle } from 'lucide-react';

import { useApp } from '@/hooks/useApp';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from './Logo';

export default function Header() {
  const { user, resetApp } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    resetApp();
    router.push('/login');
  };
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-headline font-semibold text-lg hidden sm:inline-block">e&amp; Zoho Sales Tool</span>
        </Link>
        <div className="ml-auto">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none capitalize">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground capitalize">
                      {user.role.replace('_', ' ')}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button asChild variant="outline">
                <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
