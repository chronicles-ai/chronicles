import { Button } from '@/components/ui/button';
import teamService from '@/infrastructures/services/team-service';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/states/hooks/use-app-selector';
import { useQuery } from '@tanstack/react-query';

import { TaskState } from './task-page';
import LoadingState from '@/components/loading-state';
import storyService from '@/infrastructures/services/story-service';
import { TeamResponse } from '@/infrastructures/models/team';

type Props = {
  state: 'story' | 'restory';
  setState: React.Dispatch<React.SetStateAction<TaskState>>;
};

export default function TeamConfirmation({ state, setState }: Props) {
  const auth = useAppSelector((state) => state.auth);

  const { status, data, error } = useQuery({
    queryKey: ['rival', auth.user!.id],
    queryFn: () => teamService.getRival(auth.user!.id),
  });

  if (status === 'pending') {
    return <LoadingState />;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  const myTeam =
    data.kode_kelompok_ganjil === auth.user!.id
      ? data.kelompokGanjil
      : data.kelompokGenap;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <img src="/story.png" width={320} className="mb-4" />
      <h1 className="mb-2 text-2xl font-bold text-slate-800">
        {myTeam.status === 'story'
          ? 'Your team gets to create a story'
          : 'Your team will re-create the other team story'}
      </h1>
      <p className="mb-8 text-black/80">
        {myTeam.status === 'story'
          ? 'While the other team will re-create your story'
          : 'After the other team creates a story'}
      </p>

      <div className="mb-8 flex items-center justify-center gap-8">
        <TeamCard
          teamName={data.kelompokGenap.username}
          // members={[
          //   'Windah Basudara',
          //   'Agung Hadi Winoto',
          //   'Nadya Khairani',
          //   'Ariq Heritsa Maalik',
          //   'Adrian Putra Pratama Badjideh',
          // ]}
          role="story"
          isMyTeam={data.kelompokGenap.id === auth.user!.id}
        />

        <TeamCard
          teamName={data.kelompokGanjil.username}
          // members={['Marie', 'John', 'Anna', 'Richard', 'Mike']}
          role="restory"
          isMyTeam={data.kelompokGanjil.id === auth.user!.id}
        />
      </div>

      {myTeam.status === 'story' ? (
        <Button
          onClick={() => {
            if (state === 'restory') {
              setState('restoryBegin');
              return;
            }

            setState('storyBegin');
          }}
          variant="gradient"
          className="mb-8 rounded-full px-12 font-medium"
        >
          Begin my story
        </Button>
      ) : (
        <ButtonNext
          state={state}
          setState={setState}
          item={data.kelompokGenap}
        />
      )}
    </div>
  );
}

type ButtonNextProps = {
  state: 'story' | 'restory';
  setState: React.Dispatch<React.SetStateAction<TaskState>>;
  item: TeamResponse;
};

function ButtonNext({ state, setState, item }: ButtonNextProps) {
  const { data } = useQuery({
    queryKey: ['story', 'story'],
    queryFn: () => storyService.getStoryByKelompokId(item.id),
  });

  const handleBeginStory = () => {
    if (state === 'restory') {
      setState('restoryBegin');
      return;
    }

    setState('storyBegin');
  };

  console.log(data);

  return (
    <Button
      onClick={handleBeginStory}
      variant="gradient"
      className="mb-8 rounded-full px-12 font-medium"
      disabled={data?.id === '~~~'}
    >
      Begin my story
    </Button>
  );
}

function TeamCard({
  teamName,
  // members,
  role,
  isMyTeam = false,
}: {
  teamName: string;
  // members: string[];
  role: 'story' | 'restory';
  isMyTeam: boolean;
}) {
  const borderStyle = isMyTeam ? 'border-secondary' : '';

  return (
    <div
      className={cn(
        'min-w-96 max-w-96 rounded-xl border bg-white p-8',
        borderStyle
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{teamName}</h2>
          <h3 className="font-medium text-secondary">
            {role === 'story' ? 'Create Story' : 'Re-Create Story'}
          </h3>
        </div>

        {isMyTeam && (
          <div className="ml-auto h-min w-max rounded-full bg-gradient-to-br from-primary to-secondary px-4 py-1 text-center text-xs font-medium">
            My team
          </div>
        )}
      </div>

      {/* <p>Member:</p>
      <ul className="list-inside list-disc">
        {members.map((member) => (
          <li>{member}</li>
        ))}
      </ul> */}
    </div>
  );
}
