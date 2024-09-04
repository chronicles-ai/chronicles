import { useParams } from 'react-router-dom';

import book from '@/assets/book.jpg';
import LoadingState from '@/components/loading-state';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import elevenlabsService from '@/infrastructures/services/elevenlabs-service';
import storyService from '@/infrastructures/services/story-service';
import { splitSentence } from '@/lib/sentence-splitter';
import { useQuery } from '@tanstack/react-query';

type Params = {
  id: string;
};

export default function ReadStoryPage() {
  const { id } = useParams<Params>();

  const { status, error, data } = useQuery({
    queryKey: ['story', id],
    queryFn: () => storyService.getStoryById(id!),
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
    return <div className="p-6">
      <div className="size-8"></div>
      <LoadingState />
    </div>;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
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
                    backgroundImage: `url(${data.url_gambar})`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </DialogTrigger>
              <DialogContent>
                <img src={data.url_gambar} alt="Dall-E" className="w-[700px]" />
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
          {data.judul}
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
