import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

import noImage from '@/assets/no-image.png';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import storyService from '@/infrastructures/services/story-service';
import { useQuery } from '@tanstack/react-query';

import GradeCard from './grade-card';
import GradeDialog from './grade-dialog';
import SimilarityCard from './similarity-card';

type Params = {
  id: string;
  genapId: string;
  ganjilId: string;
};

export default function ClassAssignmentDetailsPage() {
  const { id: classId, genapId, ganjilId } = useParams<Params>();

  const {
    status: statusStory,
    data: dataStory,
    error: errorStory,
  } = useQuery({
    queryKey: ['story', classId, genapId],
    queryFn: () => storyService.getStoryByKelompokId(genapId!),
  });

  const {
    status: statusRestory,
    data: dataRestory,
    error: errorRestory,
  } = useQuery({
    queryKey: ['restory', classId, ganjilId],
    queryFn: () => storyService.getRestoryByKelompokId(ganjilId!),
  });

  // Render Story
  const renderStory = () => {
    if (statusStory === 'pending') {
      return <div>Loading...</div>;
    }

    if (statusStory === 'error') {
      if (errorStory.message === 'Unexpected end of JSON input') {
        return (
          <div className="mb-4 rounded-xl border bg-white p-4">
            <p>
              The team <span className="text-secondary">{genapId}</span> hasn't
              posted the story.
            </p>
          </div>
        );
      }

      return <div>Error: {errorStory.message}</div>;
    }

    if (dataStory == undefined) {
      return <div>No data</div>;
    }

    const {
      title,
      orientation,
      complication,
      resolution,
      reorientation,
      teamId,
    } = dataStory;

    return (
      <div className="mb-4 rounded-xl border bg-white p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {/* <p>by {teamId}</p> */}
        <p>by Tiger Team</p>

        <div className="size-4"></div>

        <h2 className="font-bold text-secondary">Orientation</h2>
        <p>{orientation}</p>

        <div className="size-4"></div>

        <h2 className="font-bold text-secondary">Complication</h2>
        <p>{complication}</p>

        <div className="size-4"></div>

        <h2 className="font-bold text-secondary">Resolution</h2>
        <p>{resolution}</p>

        <div className="size-4"></div>

        <h2 className="font-bold text-secondary">Reorientation</h2>
        <p>{reorientation}</p>

        <div className="size-6"></div>

        <div className="mb-2 flex justify-center">
          <GradeDialog kelompokId={teamId} storyId={dataStory.id}>
            <Button className="rounded-full px-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Grade Team 1
            </Button>
          </GradeDialog>
        </div>
      </div>
    );
  };

  const renderRestory = () => {
    if (statusRestory === 'pending') {
      return <div>Loading...</div>;
    }

    if (statusRestory === 'error') {
      if (errorRestory.message === 'Unexpected end of JSON input') {
        return (
          <div className="mb-4 rounded-xl border bg-white p-4">
            <p>
              The team <span className="text-secondary">{ganjilId}</span> hasn't
              posted the story.
            </p>
          </div>
        );
      }

      return <div>Error: {errorRestory.message}</div>;
    }

    if (dataRestory == undefined) {
      return <div>No data</div>;
    }

    const { title, orientation, complication, resolution, reorientation } =
      dataRestory;

    return (
      <div className="mb-4 rounded-xl border bg-white p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {/* <p>by {teamId}</p> */}
        <p>by Snake Team</p>

        <div className="size-4"></div>

        <h2 className="font-bold text-secondary">Orientation</h2>
        <p>{orientation}</p>

        <div className="size-4"></div>

        <h2 className="font-bold text-secondary">Complication</h2>
        <p>{complication}</p>

        <div className="size-4"></div>

        <h2 className="font-bold text-secondary">Resolution</h2>
        <p>{resolution}</p>

        <div className="size-4"></div>

        <h2 className="font-bold text-secondary">Reorientation</h2>
        <p>{reorientation}</p>

        <div className="size-6"></div>

        <div className="mb-2 flex justify-center">
          <GradeDialog kelompokId={ganjilId!} storyId={dataRestory.id}>
            <Button className="rounded-full px-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Grade Team 2
            </Button>
          </GradeDialog>
        </div>
      </div>
    );
  };

  if (statusStory === 'success') {
    console.log(dataStory);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col gap-4">
          <div className="rounded-xl border bg-white p-4">
            {statusStory === 'pending' ? (
              <Skeleton className="mb-4 h-48 w-full rounded-lg bg-slate-300" />
            ) : null}
            {statusStory === 'success' ? (
              <Dialog>
                <DialogTrigger>
                  <img
                    src={dataStory!.imageUrl ?? noImage}
                    className="mb-4 rounded-lg"
                  />
                </DialogTrigger>
                <DialogContent>
                  <img
                    src={dataStory!.imageUrl ?? noImage}
                    alt="Dall-E"
                    className="w-[700px]"
                  />
                </DialogContent>
              </Dialog>
            ) : null}

            {statusStory === 'pending' || statusRestory === 'pending' ? (
              <div className="flex w-full items-center">
                <Loader2 className="mr-2 animate-spin" />
                <span>Please wait...</span>
              </div>
            ) : null}

            {statusStory === 'success' && statusRestory === 'success' ? (
              <SimilarityCard
                genapId={genapId!}
                ganjilId={ganjilId!}
                orientationStory={dataStory.orientation}
                complicationStory={dataStory.complication}
                resolutionStory={dataStory.resolution}
                reorientationStory={dataStory.reorientation}
                orientationRestory={dataRestory.orientation}
                complicationRestory={dataRestory.complication}
                resolutionRestory={dataRestory.resolution}
                reorientationRestory={dataRestory.reorientation}
              />
            ) : null}
          </div>

          <GradeCard teamName="Tiger Team" kelompokId={genapId!} />

          <GradeCard teamName="Snake Team" kelompokId={ganjilId!} />
        </div>

        <div className="col-span-3">
          {/* story di sini */}
          {renderStory()}

          <hr className="my-8 h-px border-0 bg-secondary/80" />

          {renderRestory()}
        </div>
      </div>
    </>
  );
}
