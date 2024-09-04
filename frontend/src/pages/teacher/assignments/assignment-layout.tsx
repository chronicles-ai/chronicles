import { Link, Outlet, useParams } from 'react-router-dom';

import { cn } from '@/lib/utils';

function TabItem({
  title,
  path,
  icon,
}: {
  title: string;
  path: string;
  icon: React.ReactElement;
}) {
  return (
    <Link
      to={path}
      className={cn(
        'flex items-center gap-2 rounded px-4 py-2 font-medium hover:bg-slate-100',
        location.pathname === path ? 'text-secondary' : 'hover:bg-slate-100'
      )}
    >
      {icon}
      {title}
    </Link>
  );
}

type Params = {
  id: string;
  genapId: string;
  ganjilId: string
};

export default function AssignmentLayout() {
  const { id: classId, genapId, ganjilId } = useParams<Params>();
  
  return (
    <>
      <div className="flex h-16 w-full items-center gap-2 border-b bg-white px-6">
        <Link
          to={`/class/${classId}/assignments`}
          className="mr-2 flex items-center gap-2 rounded border border-slate-100 px-4 py-2 font-medium transition-colors hover:bg-slate-100"
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </Link>

        <TabItem
          title="Story"
          path={`/class/${classId}/assignments/${genapId}/${ganjilId}`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          }
        />

        <TabItem
          title="Discussion"
          path={`/class/${classId}/assignments/${genapId}/${ganjilId}/discussion`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          }
        />
      </div>
      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
}
