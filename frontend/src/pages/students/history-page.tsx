import { useParams } from 'react-router-dom';

import book from '@/assets/book.jpg';
import LoadingState from '@/components/loading-state';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import elevenlabsService from '@/infrastructures/services/elevenlabs-service';
import storyService from '@/infrastructures/services/story-service';
import teamService from '@/infrastructures/services/team-service';
import { splitSentence } from '@/lib/sentence-splitter';
import { useAppSelector } from '@/states/hooks/use-app-selector';
import { useQuery } from '@tanstack/react-query';
import Story from '@/infrastructures/models/story';
import StudentDiscussion from './student-discussion';

type Params = {
  id: string;
};

export default function HistoryPage() {
  const { id } = useParams<Params>();
  const auth = useAppSelector((state) => state.auth);

  const { status, data, error } = useQuery({
    queryKey: ['history', id],
    queryFn: () => teamService.getTeamsById(auth.user!.id),
  });

  if (status === 'pending') {
    return (
      <div className="p-6">
        <div className="size-8"></div>
        <LoadingState />
      </div>
    );
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  if (data.id === '~~~') {
    return (
      <div className="flex h-56 items-center justify-center">
        You haven't submit your team
      </div>
    );
  }

  if (data.status === 'story') {
    return (
      <>
        <ReadStory id={data.id} />
        <div className="size-96"></div>
        <div className="p-6">
          <StudentDiscussion />
        </div>
      </>
    );
  }

  return (
    <>
      <ReadReStory id={data.id} />
      <div className="size-96"></div>
      <div className="p-6">
        <StudentDiscussion />
      </div>
    </>
  );
}

type StoryProps = {
  id: string;
};

function ReadStory({ id }: StoryProps) {
  const auth = useAppSelector((state) => state.auth);

  const { status, error, data } = useQuery({
    queryKey: ['story', id],
    queryFn: () => storyService.getStoryByKelompokId(auth.user!.id),
  });

  const playAudio = async (text: string) => {
    const audio = await elevenlabsService.convertTextToSpeech(text);
    audio.play();
  };

  const renderSentence = (sentences: string[]) => {
    return sentences.map((word) => (
      <span
        onClick={() => playAudio(word)}
        className="cursor-speaker rounded-md px-1 transition-colors hover:bg-secondary/50"
      >
        {word}
      </span>
    ));
  };

  if (status === 'pending') {
    return (
      <div className="p-6">
        <div className="size-8"></div>
        <LoadingState />
      </div>
    );
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  if (data.id === '~~~') {
    return (
      <div className="flex h-56 items-center justify-center">
        You haven't submit your story
      </div>
    );
  }

  const orientationTexts = splitSentence(data.orientation);
  const complicationTexts = splitSentence(data.complication);
  const resolutionTexts = splitSentence(data.resolution);
  const reorientationTexts = splitSentence(data.reorientation);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="relative h-[500px] bg-gray-700">
          <div className="absolute z-20 flex h-[500px] w-full flex-col items-center justify-center px-8 py-6">
            {/* Illustrations */}

            <Dialog>
              <DialogTrigger className="">
                <div
                  className="mb-8 size-96 rounded-md bg-gray-300 shadow-md"
                  style={{
                    backgroundImage: `url(${data.imageUrl})`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </DialogTrigger>
              <DialogContent>
                <img src={data.imageUrl} alt="Dall-E" className="w-[700px]" />
              </DialogContent>
            </Dialog>
          </div>

          <div className="absolute z-10 h-[500px] w-full bg-gradient-to-b from-background-softer/5 to-white"></div>

          <div
            className="absolute h-[500px] w-full"
            style={{
              backgroundImage: `url(${book})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
            }}
          ></div>
        </div>
      </div>

      <div className="z-30 bg-white px-16 py-2 pb-32 lg:px-52">
        <h1 className="mb-8 text-center text-4xl font-black text-secondary drop-shadow-md">
          {data.title}
        </h1>

        <div className="prose prose-lg flex flex-col gap-6 text-justify indent-8">
          <p>{renderSentence(orientationTexts)}</p>
          <p>{renderSentence(complicationTexts)}</p>
          <p>{renderSentence(resolutionTexts)}</p>
          <p>{renderSentence(reorientationTexts)}</p>
        </div>
      </div>
    </div>
  );
}

type ReStoryProps = {
  id: string;
};

function ReadReStory({ id }: ReStoryProps) {
  const auth = useAppSelector((state) => state.auth);

  const { status, data, error } = useQuery({
    queryKey: ['rival', id],
    queryFn: () => teamService.getRival(auth.user!.id),
  });

  if (status === 'pending') {
    return <LoadingState />;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ReStoryContent
      genapId={data.kelompokGenap.id}
      ganjilId={data.kelompokGanjil.id}
    />
  );
}

type ReStoryContentProps = {
  genapId: string;
  ganjilId: string;
};

function ReStoryContent({ genapId, ganjilId }: ReStoryContentProps) {
  const {
    status: genapStatus,
    error: genapError,
    data: genapData,
  } = useQuery({
    queryKey: ['stoory', genapId],
    queryFn: () => storyService.getStoryByKelompokId(genapId),
  });

  if (genapStatus === 'pending') {
    return (
      <div className="p-6">
        <div className="size-8"></div>
        <LoadingState />
      </div>
    );
  }

  if (genapStatus === 'error') {
    return <div>Error: {genapError.message}</div>;
  }

  return <ReStoryContentContent ganjilId={ganjilId} genapData={genapData} />;
}

function ReStoryContentContent({
  ganjilId,
  genapData,
}: {
  ganjilId: string;
  genapData: Story;
}) {
  const { status, error, data } = useQuery({
    queryKey: ['reestory', ganjilId],
    queryFn: () => storyService.getRestoryByKelompokId(ganjilId),
  });

  const playAudio = async (text: string) => {
    const audio = await elevenlabsService.convertTextToSpeech(text);
    audio.play();
  };

  const renderSentence = (sentences: string[]) => {
    return sentences.map((word) => (
      <span
        onClick={() => playAudio(word)}
        className="cursor-speaker rounded-md px-1 transition-colors hover:bg-secondary/50"
      >
        {word}
      </span>
    ));
  };

  if (status === 'pending') {
    return (
      <div className="p-6">
        <div className="size-8"></div>
        <LoadingState />
      </div>
    );
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  if (data.id === '~~~') {
    return (
      <div className="flex h-56 items-center justify-center">
        You haven't submit your story
      </div>
    );
  }

  const orientationTexts = splitSentence(data.orientation);
  const complicationTexts = splitSentence(data.complication);
  const resolutionTexts = splitSentence(data.resolution);
  const reorientationTexts = splitSentence(data.reorientation);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="relative h-[500px] bg-gray-700">
          <div className="absolute z-20 flex h-[500px] w-full flex-col items-center justify-center px-8 py-6">
            {/* Illustrations */}

            <Dialog>
              <DialogTrigger className="">
                <div
                  className="mb-8 size-96 rounded-md bg-gray-300 shadow-md"
                  style={{
                    backgroundImage: `url(${genapData.imageUrl})`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </DialogTrigger>
              <DialogContent>
                <img
                  src={genapData.imageUrl}
                  alt="Dall-E"
                  className="w-[700px]"
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="absolute z-10 h-[500px] w-full bg-gradient-to-b from-background-softer/5 to-white"></div>

          <div
            className="absolute h-[500px] w-full"
            style={{
              backgroundImage: `url(${book})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
            }}
          ></div>
        </div>
      </div>

      <div className="z-30 bg-white px-16 py-2 pb-32 lg:px-52">
        <h1 className="mb-8 text-center text-4xl font-black text-secondary drop-shadow-md">
          {data.title}
        </h1>

        <div className="prose prose-lg flex flex-col gap-6 text-justify indent-8">
          <p>{renderSentence(orientationTexts)}</p>
          <p>{renderSentence(complicationTexts)}</p>
          <p>{renderSentence(resolutionTexts)}</p>
          <p>{renderSentence(reorientationTexts)}</p>
        </div>
      </div>
    </div>
  );
}
