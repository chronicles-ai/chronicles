import { useEffect, useState } from 'react';

import LoadingState from '@/components/loading-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import teamService from '@/infrastructures/services/team-service';
import validateSubmitTeam from '@/lib/validate-submit-team';
import { useAppSelector } from '@/states/hooks/use-app-selector';
import { useToast } from '@/states/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';

import CreateStory from './create-story';
import ReCreateStory from './re-create-story';
import TeamConfirmation from './team-confirmation';
import { Loader2 } from 'lucide-react';

export type TaskState =
  | 'initial'
  | 'createTeam'
  | 'loading'
  | 'story'
  | 'restory'
  | 'storyBegin'
  | 'restoryBegin';

export default function TaskPage() {
  const auth = useAppSelector((state) => state.auth);
  const { toast } = useToast();

  const [state, setState] = useState<TaskState>('createTeam');
  const [teamName, setTeamName] = useState('');
  const [leader, setLeader] = useState('');
  const [member1, setMember1] = useState('');
  const [member2, setMember2] = useState('');
  const [member3, setMember3] = useState('');
  const [member4, setMember4] = useState('');
  const [role, setRole] = useState('');

  const { status, data, error } = useQuery({
    queryKey: ['team'],
    queryFn: () => teamService.getTeamsById(auth.user!.id),
  });

  const { mutate, status: mutationStatus } = useMutation({
    mutationKey: ['updateTeam', auth.user!.id],
    mutationFn: () =>
      teamService.updateTeam({
        id: auth.user!.id,
        nama_kelompok: teamName,
        ketua: leader,
        anggota1: member1,
        anggota2: member2,
        anggota3: member3,
        anggota4: member4,
      }),
    onSuccess: () => {
      if (role === 'story') {
        setState('story');
      }

      if (role === 'restory') {
        setState('restory');
      }
    },
  });

  useEffect(() => {
    if (data) {
      setTeamName(data.name);
      setLeader(data.leader);
      setMember1(data.member1);
      setMember2(data.member2);
      setMember3(data.member3);
      setMember4(data.member4);
      setRole(data.status);
    }
  }, [data]);

  const handleSubmitTeam = async () => {
    const validate = validateSubmitTeam({
      teamName,
      leader,
      member1,
      member2,
      member3,
      member4,
    });

    if (validate !== null) {
      toast({
        title: 'Oops!',
        description: validate,
        variant: 'destructive',
      });
      return;
    }

    mutate();
  };

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  if (status === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <LoadingState />
      </div>
    );
  }

  if (state === 'story' || state === 'restory') {
    return <TeamConfirmation state={state} setState={setState} />;
  }

  if (state === 'storyBegin') {
    return <CreateStory />;
  }

  if (state === 'restoryBegin') {
    return <ReCreateStory />;
  }

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-6">
      <div className="col-span-2 grow rounded-lg border bg-white p-4 lg:col-span-1">
        <h3 className="mb-8 text-lg font-bold tracking-wide text-slate-800">
          Team Information
        </h3>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="team_id" className="text-sm font-medium">
            Team ID
          </label>
          <Input
            name="team_id"
            className="bg-slate-100 px-4 text-black shadow-sm focus:outline-none"
            autoComplete="off"
            value={data.id ? data.id : 'Team ID'}
            disabled
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="team_name" className="text-sm font-medium">
            Team Name
          </label>
          <Input
            name="team_name"
            className="px-4 text-black shadow-sm focus:outline-none"
            autoComplete="off"
            placeholder="e.g. Tiger Team"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="col-span-2 grow rounded-lg border bg-white p-4 lg:col-span-1">
        <h3 className="mb-8 text-lg font-bold tracking-wide text-slate-800">
          Team Members
        </h3>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="leader" className="text-sm font-medium">
            Team lead
          </label>
          <Input
            name="leader"
            className="px-4 text-black shadow-sm focus:outline-none"
            autoComplete="off"
            placeholder="Input your leader name here"
            value={leader}
            onChange={(e) => setLeader(e.target.value)}
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="member" className="text-sm font-medium">
            My Teammates
          </label>

          <Input
            name="member1"
            className="mb-2 px-4 text-black shadow-sm focus:outline-none"
            autoComplete="off"
            placeholder="Input your member 1 name here"
            value={member1}
            onChange={(e) => setMember1(e.target.value)}
          />

          <Input
            name="member2"
            className="mb-2 px-4 text-black shadow-sm focus:outline-none"
            autoComplete="off"
            placeholder="Input your member 2 name here"
            value={member2}
            onChange={(e) => setMember2(e.target.value)}
          />

          <Input
            name="member3"
            className="mb-2 px-4 text-black shadow-sm focus:outline-none"
            autoComplete="off"
            placeholder="Input your member 3 name here"
            value={member3}
            onChange={(e) => setMember3(e.target.value)}
          />

          <Input
            name="member4"
            className="mb-2 px-4 text-black shadow-sm focus:outline-none"
            autoComplete="off"
            placeholder="Input your member 4 name here"
            value={member4}
            onChange={(e) => setMember4(e.target.value)}
          />
        </div>
      </div>

      <div className="col-span-2 flex justify-end">
        {mutationStatus === 'pending' ? (
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
            onClick={handleSubmitTeam}
            variant="gradient"
            className="rounded-full px-16"
          >
            Submit
          </Button>
        )}
      </div>
      <Toaster />
    </div>
  );
}
