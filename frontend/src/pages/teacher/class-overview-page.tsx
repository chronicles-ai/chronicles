import { useParams } from 'react-router-dom';

type Params = {
  id: string;
};

export default function ClassOverviewPage() {
  const {id: classId} = useParams<Params>();

  return (
    <>
    <h1 className="mb-8 text-2xl font-semibold">Class Detail</h1>
      <p>Class of {classId}</p>
    </>
  );
}
