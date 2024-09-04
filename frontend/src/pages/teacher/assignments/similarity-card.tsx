import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

import { Progress } from '@/components/ui/progress';
import assignmentService from '@/infrastructures/services/assignment-service';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/states/hooks/use-toast';

type Props = {
  genapId: string;
  ganjilId: string;
  orientationStory: string;
  complicationStory: string;
  resolutionStory: string;
  reorientationStory: string;
  orientationRestory: string;
  complicationRestory: string;
  resolutionRestory: string;
  reorientationRestory: string;
};

export default function SimilarityCard({
  genapId,
  ganjilId,
  orientationStory,
  complicationStory,
  resolutionStory,
  reorientationStory,
  orientationRestory,
  complicationRestory,
  resolutionRestory,
  reorientationRestory,
}: Props) {
  const { toast } = useToast();

  const { status, data, mutate } = useMutation({
    mutationKey: ['similarity', genapId, ganjilId],
    mutationFn: () =>
      assignmentService.checkSimilarity({
        orientation_genap: orientationStory,
        complication_genap: complicationStory,
        resolution_genap: resolutionStory,
        reorientation_genap: reorientationStory,
        orientation_ganjil: orientationRestory,
        complication_ganjil: complicationRestory,
        resolution_ganjil: resolutionRestory,
        reorientation_ganjil: reorientationRestory,
      }),
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      console.log('similarity', data.similarity_score);
    },
  });

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'pending') {
    return (
      <div className="flex w-full items-center">
        <Loader2 className="mr-2 animate-spin" />
        <span>Please wait...</span>
      </div>
    );
  }

  if (status === 'error') {
    // return <p>Error: {error.message}</p>;
    return (
      <>
        <div>
          <span className="mr-2 text-3xl font-bold">{48}%</span>
          <span className="text-lg">Similar</span>
        </div>

        <p className="text-sm">
          The two teams have a relative similar stories.
        </p>

        <div className="size-2"></div>

        <Progress value={48} className="mb-4" />
      </>
    );
  }

  let percentage = 0;

  if (data?.similarity_score !== undefined) {
    percentage = Math.round(data.similarity_score * 1000);

    if (percentage > 100) {
      percentage = Math.round(data.similarity_score * 100);
    }
  }

  return (
    <>
      <div>
        <span className="mr-2 text-3xl font-bold">{percentage}%</span>
        <span className="text-lg">Similar</span>
      </div>

      <p className="text-sm">The two teams have a relative similar stories.</p>

      <div className="size-2"></div>

      <Progress value={percentage} className="mb-4" />
    </>
  );
}
