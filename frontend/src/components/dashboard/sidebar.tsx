import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { useAppSelector } from '@/states/hooks/use-app-selector';

export default function Sidebar() {
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();

  const baseSidebarItemClass =
    'mb-2 flex items-center gap-2 rounded-lg px-4 py-2 font-medium capitalize text-slate-800 transition-colors';

  return (
    <aside className="relative flex w-64 flex-col flex-wrap border-r p-6">
      <div className="flex flex-col">
        <Link
          to="/"
          className={cn(
            baseSidebarItemClass,
            location.pathname == '/'
              ? 'bg-primary hover:bg-secondary'
              : 'hover:bg-secondary/20'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Home
        </Link>

        {auth.user?.role === 'guru' ? (
          <>
            <Link
              to="/class"
              className={cn(
                baseSidebarItemClass,
                location.pathname.match(/\/class/)
                  ? 'bg-primary hover:bg-secondary'
                  : 'hover:bg-secondary/20'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              Classes
            </Link>
          </>
        ) : null}

        {auth.user?.role === 'kelompok' ? (
          <>
            <Link
              to="/task"
              className={cn(
                baseSidebarItemClass,
                location.pathname == '/task'
                  ? 'bg-primary hover:bg-secondary'
                  : 'hover:bg-secondary/20'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Tasks
            </Link>
            <Link
              to="/history"
              className={cn(
                baseSidebarItemClass,
                location.pathname == '/history'
                  ? 'bg-primary hover:bg-secondary'
                  : 'hover:bg-secondary/20'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              My Story
            </Link>
          </>
        ) : null}
      </div>
    </aside>
  );
}
