import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Sidebar from '@/components/dashboard/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toaster } from '@/components/ui/toaster';
import { useAppDispatch } from '@/states/hooks/use-app-dispatch';
import { useAppSelector } from '@/states/hooks/use-app-selector';
import { initialize, logout } from '@/states/stores/auth/auth-slice';

import LoginPage from './login-page';

export default function Root() {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Run once when the component is mounted
  useEffect(() => {
    dispatch(initialize());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = () => {
    const yes = confirm('Are you sure you want to sign out?');

    if (yes) {
      dispatch(logout());
      navigate('/');
    }
  };

  if (auth.status === 'unauthenticated') {
    return (
      <div>
        <LoginPage />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <nav className="flex h-20 w-full items-center border-b bg-white px-6">
        <h1 className="text-2xl font-black">Chronicles</h1>

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto flex items-center gap-2 rounded-full border py-2 pl-4 pr-2 text-sm font-medium">
            Hi, {auth.user?.name ?? 'User'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div className="flex h-full flex-row flex-wrap">
        <Sidebar />

        <main className="flex-1 bg-slate-50">
          <Outlet />
        </main>
      </div>

      <Toaster />
    </div>
  );
}
