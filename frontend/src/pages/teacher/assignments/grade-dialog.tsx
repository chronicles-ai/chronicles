import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContentLarge,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import assignmentService from '@/infrastructures/services/assignment-service';
import { useAppSelector } from '@/states/hooks/use-app-selector';
import { useToast } from '@/states/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  kelompokId: string;
  storyId: string;
  children: React.ReactNode;
};

export default function GradeDialog({ kelompokId, storyId, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentLarge className="w-screen">
        <DialogHeader>
          <DialogTitle>Grade</DialogTitle>
          <DialogDescription>Grade the team's assignment.</DialogDescription>
        </DialogHeader>
        <GradeDialogContent kelompokId={kelompokId} storyId={storyId} />
      </DialogContentLarge>
    </Dialog>
  );
}

type GradeDialogProps = {
  kelompokId: string;
  storyId: string;
};

function GradeDialogContent({ kelompokId, storyId }: GradeDialogProps) {
  const auth = useAppSelector((state) => state.auth);

  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const { status, data, error, mutate } = useMutation({
    mutationKey: ['grade', auth.user?.id, kelompokId, storyId],
    mutationFn: () =>
      assignmentService.getGradeRecommendation(
        auth.user!.id,
        kelompokId,
        storyId
      ),
    onSuccess: (grade) => {
      setFeedback(grade.komentar);
      setScore(grade.nilai_kelompok);
    },
  });

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 py-4">
      <div className="col-span-3">
        {status === 'pending' ? (
          <Alert className="flex gap-4 border-none bg-slate-300">
            <Loader2 className="animate-spin" />
            <span>Please wait while the AI recommends the grade...</span>
          </Alert>
        ) : null}

        {status === 'error' ? (
          <Alert className="flex gap-4 border-none bg-gradient-to-r from-red-400 to-red-500 text-white">
            <span>
              Oops! We can't recommend the grade due to a connectivity issue.
              Error: {error.message}
            </span>
          </Alert>
        ) : null}

        {status === 'success' && data?.komentar == undefined ? (
          <Alert className="flex gap-4 border-none bg-gradient-to-r from-red-400 to-red-500 text-white">
            <span>
              Oops! We can't recommend the grade due to a connectivity issue.
            </span>
          </Alert>
        ) : null}
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <label htmlFor="grade" className="font-medium">
          Feedback
        </label>
        <textarea
          id="grade"
          name="grade"
          className="rounded-lg border p-4"
          rows={12}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>
      <div className="col-span-1 flex flex-col justify-between gap-2">
        <div>
          <p className="mb-2 font-medium">Grade</p>
          <div className="rounded-lg bg-primary p-4">
            <p className="mb-2">I would rate this narrative...</p>

            <div className="flex h-9 items-center rounded-lg border bg-slate-100">
              <input
                type="number"
                name="grade"
                id="grade"
                placeholder="e.g. 80"
                className="h-full w-2/5 rounded-l-lg border px-2 py-1"
                max={100}
                value={parseInt(score?.toString() || '')}
                onChange={(e) => setScore(parseInt(e.target.value))}
              />
              <div className="px-2 text-right">out of 100.</div>
            </div>
          </div>
        </div>

        <div className="size-2"></div>

        {status == 'pending' ? (
          <Button
            className="ml-auto w-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500 px-8 font-medium text-white"
            variant="default"
            disabled
          >
            <Loader2 className="mr-2 size-5 animate-spin" />
            Loading...
          </Button>
        ) : null}

        {status == 'error' ? (
          <Button
            className="ml-auto w-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500 px-8 font-medium text-white"
            variant="default"
            disabled
          >
            Save changes
          </Button>
        ) : null}

        {status == 'success' ? (
          <GradeDialogButton scoreId={data!.id} score={score ?? 0} />
        ) : null}
      </div>
    </div>
  );
}

type GradeDialogButtonProps = {
  scoreId: string;
  score: number;
};

function GradeDialogButton({ scoreId, score }: GradeDialogButtonProps) {
  const auth = useAppSelector((state) => state.auth);
  const { toast } = useToast();

  const { status, mutate } = useMutation({
    mutationKey: ['grade', auth.user?.id, scoreId],
    mutationFn: () => assignmentService.updateGrade(scoreId, score!),
    onError: (error) => {
      toast({
        title: 'Failed to save grade',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Grade saved',
        description: 'The grade has been saved successfully.',
      });
    },
  });

  if (status === 'pending') {
    return (
      <Button
        className="ml-auto w-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500 px-8 font-medium text-white"
        variant="default"
        disabled
      >
        <Loader2 className="mr-2 size-5 animate-spin" />
        Saving...
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      variant="gradient"
      className="rounded-full"
      onClick={() => mutate()}
    >
      Save changes
    </Button>
  );
}
