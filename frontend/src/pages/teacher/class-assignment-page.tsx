import { Link, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { PertandinganWithClass } from '@/infrastructures/models/pertandingan_with_class';
import assignmentService from '@/infrastructures/services/assignment-service';
import { capitalizeFirstLetter } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

type Params = {
  id: string;
};

type AssignmentCardProps = {
  pertandingan: PertandinganWithClass;
};

function AssignmentCard({ pertandingan }: AssignmentCardProps) {
  const { id: classId } = useParams<Params>();

  return (
    <div className="col-span-1 gap-4 rounded-lg border bg-white p-6">
      <div className="flex items-center gap-10">
        <div>
          <h1 className="text-xl font-medium">
            {pertandingan.kelompokGenap.nama_kelompok ?? pertandingan.kelompokGenap.username}
          </h1>
          <div className="size-min rounded-full bg-gradient-to-r from-secondary/70 to-secondary px-3 py-1 text-xs font-medium tracking-wide">
            {capitalizeFirstLetter(pertandingan.kelompokGenap.status)}
          </div>
        </div>

        <div>and</div>

        <div>
          <h1 className="text-xl font-medium">
            {pertandingan.kelompokGanjil.nama_kelompok ?? pertandingan.kelompokGanjil.username}
          </h1>
          <div className="size-min rounded-full bg-gradient-to-r from-secondary/70 to-secondary px-3 py-1 text-xs font-medium tracking-wide">
            {capitalizeFirstLetter(pertandingan.kelompokGanjil.status)}
          </div>
        </div>

        <Link
          to={`/class/${classId}/assignments/${pertandingan.kode_kelompok_genap}/${pertandingan.kode_kelompok_ganjil}`}
          className="ml-auto"
        >
          <Button className="rounded-full px-8">View Assignment</Button>
        </Link>
      </div>
    </div>
  );
}

export default function ClassAssignmentPage() {
  const { id: classId } = useParams<Params>();

  const { status, data, error } = useQuery({
    queryKey: ['class', classId],
    queryFn: () => assignmentService.getPertandinganByClass(classId!),
  });

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1 className="mb-8 text-2xl font-semibold">Class Assignments</h1>
      <div className="flex flex-col gap-4">
        {data.map((assignment, i) => (
          <AssignmentCard key={i} pertandingan={assignment} />
        ))}
      </div>
    </>
  );
}
