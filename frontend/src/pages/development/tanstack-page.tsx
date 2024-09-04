import { Skeleton } from '@/components/ui/skeleton';
import { fetchTeachers } from '@/infrastructures/services/guru-service';
import { useQuery } from '@tanstack/react-query';

export default function TanstackPage() {
  const { status, error, data } = useQuery({
    queryKey: ['teacher'],
    queryFn: fetchTeachers,
  });

  const renderQuery = () => {
    if (status === 'pending') {
      return (
        <ul>
          <Skeleton className="mb-4 h-4 w-[300px] bg-slate-300" />
          <Skeleton className="mb-4 h-4 w-[250px] bg-slate-300" />
          <Skeleton className="mb-4 h-4 w-[380px] bg-slate-300" />
        </ul>
      );
    }

    if (status === 'error') {
      return <div>Error: {error.message}</div>;
    }

    if (data) {
      return (
        <ul>
          {data.map((teacher) => (
            <li key={teacher.id} className="mb-2">
              {teacher.name} - {teacher.username}
            </li>
          ))}
        </ul>
      );
    }

    return <p>No Data Found, {status}</p>;
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-bold">React Query Test Page</h1>

      {renderQuery()}
    </div>
  );
}
