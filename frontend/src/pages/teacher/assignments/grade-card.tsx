import { Skeleton } from '@/components/ui/skeleton';
import assignmentService from '@/infrastructures/services/assignment-service';
import { useQuery } from '@tanstack/react-query';

type Props = {
  kelompokId: string;
  teamName: string;
};

export default function GradeCard({ kelompokId, teamName }: Props) {
  const { status, data, error } = useQuery({
    queryKey: ['grade', kelompokId],
    queryFn: () => assignmentService.getGradeByTeamId(kelompokId),
  });

  if (status === 'pending') {
    return (
      <div className="rounded-xl border border-secondary bg-white p-4">
        <Skeleton className="mb-2 h-4 w-2/3 rounded bg-slate-300" />
        <Skeleton className="h-4 w-[80px] rounded bg-slate-300" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-xl border border-secondary bg-white p-4">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return <div className="rounded-xl border border-secondary bg-white p-4">
      <h1 className="mb-2 font-bold">{teamName}'s Grade</h1>
      <h2>
        No grade yet.
      </h2>
    </div>
  }

  return (
    <div className="rounded-xl border border-secondary bg-white p-4">
      <h1 className="mb-2 font-bold">{teamName}'s Grade</h1>
      <h2 className="text-4xl">
        {data[data.length-1]?.nilai_kelompok} <span className="text-sm">/ 100</span>{' '}
      </h2>
    </div>
  );
}
