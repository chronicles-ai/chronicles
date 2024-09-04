import { Link } from 'react-router-dom';

import { Skeleton } from '@/components/ui/skeleton';
import Class from '@/infrastructures/models/class';
import classService from '@/infrastructures/services/class-service';
import { useQuery } from '@tanstack/react-query';

type ClassCardProps = {
  team: Class;
};

// This is a card component for each class
function ClassCard({ team }: ClassCardProps) {
  return (
    <Link
      to={`/class/${team.id}`}
      className="relative col-span-1 flex h-60 items-center gap-4 rounded-lg border bg-gradient-to-t p-6 text-white transition-all hover:-translate-y-1 hover:shadow"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2763&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="z-20 flex h-60 flex-col justify-end py-8">
        <h2 className="text-2xl font-bold">{team.name}</h2>
        <p className="text-sm font-medium">Teacher ID: {team.teacherId}</p>
      </div>
      <div className="absolute left-0 top-0 z-10 h-60 w-full rounded-lg bg-gradient-to-t from-black/80 to-transparent"></div>
    </Link>
  );
}

export default function ClassListPage() {
  const { status, error, data } = useQuery({
    queryKey: ['class'],
    queryFn: classService.fetchAllClasses,
  });

  const renderClasses = () => {
    if (status === 'pending') {
      return (
        <>
          <Skeleton className="h-20 w-full bg-slate-300" />
          <Skeleton className="h-20 w-full bg-slate-300" />
          <Skeleton className="h-20 w-full bg-slate-300" />
          <Skeleton className="h-20 w-full bg-slate-300" />
        </>
      );
    }

    if (status === 'error') {
      return <div>Error: {error.message}</div>;
    }

    return data.map((item) => <ClassCard key={item.id} team={item} />);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">My Classes</h1>

      <div className="grid grid-cols-2 gap-4">{renderClasses()}</div>
    </div>
  );
}
