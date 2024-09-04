import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import classService from '@/infrastructures/services/class-service';
import { useToast } from '@/states/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Team from '@/infrastructures/models/team';
import { capitalizeFirstLetter } from '@/lib/utils';
import { PasswordInput } from '@/components/password-input';
import { Skeleton } from '@/components/ui/skeleton';

type TeamsCardProps = {
  i: number;
  team: Team;
};

// This is a card component for each class
function TeamsCard({ i, team }: TeamsCardProps) {
  return (
    <div className="col-span-1 gap-4 rounded-lg border bg-white p-6">
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="col-span-3 text-xl font-bold">
            Team {team.name ?? `#${i}`}
          </h1>
          <span className="h-min rounded-full bg-gradient-to-r from-secondary/70 to-secondary px-3 py-1 text-sm font-medium tracking-wide">
            {capitalizeFirstLetter(team.status)}
          </span>
        </div>

        <div className="size-4"></div>

        <h2 className="font-bold">Members</h2>

        <ol className="list-inside list-decimal">
          <li>
            {team.leader ?? 'Student 1'} •{' '}
            <span className="text-secondary">Leader</span>
          </li>
          <li>{team.member1 ?? 'Student 2'}</li>
          <li>{team.member2 ?? 'Student 3'}</li>
          <li>{team.member3 ?? 'Student 4'}</li>
          <li>{team.member4 ?? 'Student 5'}</li>
        </ol>

        <div className="size-4"></div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-bold">
            Username
          </label>
          <Input
            name="username"
            placeholder="Username"
            className="bg-slate-50 px-4"
            autoComplete="off"
            value={team.username}
          />
        </div>

        <div className="size-2"></div>

        <div className="size-2"></div>

        <PasswordInput
          value={team.password}
          setValue={() => {}}
          className="bg-slate-50"
          bold={true}
        />
      </div>
    </div>
  );
}

type Params = {
  id: string;
};

export default function ClassTeamsPage() {
  const { id: classId } = useParams<Params>();

  const toast = useToast();

  const { status, data, error, refetch } = useQuery({
    queryKey: ['class-teams', classId],
    queryFn: () => classService.fetchTeamsByClassId(classId!),
  });

  const { mutate, status: statusMutation } = useMutation({
    mutationFn: (numOfTeams: number) =>
      classService.generateTeams(classId!, numOfTeams),
    onError: (error) => {
      console.log(error);
      toast.toast({
        title: 'Failed to generate teams',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      refetch();
      toast.toast({
        title: 'Teams generated',
        description: 'Teams have been generated successfully',
      });
    },
  });

  const [nTeams, setNTeams] = useState(4);

  const handleSubmit = () => {
    if (!nTeams) {
      toast.toast({
        title: 'Invalid number of teams',
        description: 'Number of teams must be filled',
        variant: 'destructive',
      });
      return;
    }

    if (nTeams < 2) {
      toast.toast({
        title: 'Invalid number of teams',
        description: 'Number of teams must be greater than 2',
        variant: 'destructive',
      });
      return;
    }

    if (nTeams % 2 !== 0) {
      toast.toast({
        title: 'Invalid number of teams',
        description: 'Number of teams must be an even number',
        variant: 'destructive',
      });
      return;
    }

    mutate(nTeams);
  };

  if (status === 'pending') {
    return (
      <>
        <h1 className="mb-8 text-2xl font-semibold">Class Teams</h1>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map(() => (
            <div className="rounded-lg border p-6">
              <Skeleton className="mb-4 h-4 w-[200px] bg-slate-300" />
              <Skeleton className="mb-4 h-4 w-[320px] bg-slate-300" />
              <Skeleton className="h-4 w-[150px] bg-slate-300" />
            </div>
          ))}
        </div>
      </>
    );
  }

  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (data.length === 0) {
    return (
      <>
        <h1 className="mb-8 text-2xl font-semibold">Class Teams</h1>

        <div className="flex flex-col gap-2 lg:w-[540px]">
          <div className="flex justify-between gap-8 lg:w-[540px]">
            <div className="w-max">
              <h2 className="font-bold">Number of teams</h2>
              <p>Input how many teams will be generated</p>
            </div>

            <Input
              name="n_team"
              value={nTeams}
              type="number"
              placeholder='e.g. "4"'
              onChange={(event) => setNTeams(parseInt(event.target.value))}
              className="w-min rounded-full text-right"
            />
          </div>

          {statusMutation === 'pending' ? (
            <Button
              className="ml-auto w-min rounded-full bg-gradient-to-r from-gray-400 to-gray-500 px-8 font-medium text-white"
              variant="default"
              disabled
            >
              <Loader2 className="mr-2 size-5 animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              className="ml-auto w-min rounded-full px-8 font-medium"
              variant="gradient"
              onClick={handleSubmit}
            >
              Save
            </Button>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-8 text-2xl font-semibold">Class Teams</h1>
      <div className="grid grid-cols-2 gap-4">
        {data.map((team, i) => (
          <TeamsCard key={team.id} i={i + 1} team={team} />
        ))}
      </div>
    </>
  );
}
