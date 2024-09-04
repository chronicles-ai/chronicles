import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import book from '@/assets/book.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { cookiesKey } from '@/config/cookies';
import storyService from '@/infrastructures/services/story-service';
import validateSubmitStory from '@/lib/validate-submit-story';
import { useAppSelector } from '@/states/hooks/use-app-selector';
import { useToast } from '@/states/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function CreateStory() {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [orientation, setOrientation] = useState('');
  const [complication, setComplication] = useState('');
  const [resolution, setResolution] = useState('');
  const [reorientation, setReorientation] = useState('');

  // const [storyId] = useState<string>('');
  const [submitMethod, setSubmitMethod] = useState<'create' | 'update'>(
    'create'
  );

  console.log(submitMethod);

  const {
    status: queryStatus,
    data: queryData,
    error: queryError,
  } = useQuery({
    queryKey: ['story', auth.user!.id],
    queryFn: () => storyService.getStoryByKelompokId(auth.user!.id),
  });

  if (queryStatus === 'error') {
    console.log(queryError);
  }

  useEffect(() => {
    if (queryStatus === 'success' && queryData.id !== '') {
      setSubmitMethod('update');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStatus]);

  useEffect(() => {
    if (Cookies.get(cookiesKey.title) !== undefined) {
      setTitle(Cookies.get(cookiesKey.title)!);
    }

    if (Cookies.get(cookiesKey.orientation) !== undefined) {
      setOrientation(Cookies.get(cookiesKey.orientation)!);
    }

    if (Cookies.get(cookiesKey.complication) !== undefined) {
      setComplication(Cookies.get(cookiesKey.complication)!);
    }

    if (Cookies.get(cookiesKey.resolution) !== undefined) {
      setResolution(Cookies.get(cookiesKey.resolution)!);
    }

    if (Cookies.get(cookiesKey.reorientation) !== undefined) {
      setReorientation(Cookies.get(cookiesKey.reorientation)!);
    }
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    Cookies.set(cookiesKey.title, event.target.value);
  };

  const handleOrientationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOrientation(event.target.value);
    Cookies.set(cookiesKey.orientation, event.target.value);
  };

  const handleComplicationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComplication(event.target.value);
    Cookies.set(cookiesKey.complication, event.target.value);
  };

  const handleResolutionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setResolution(event.target.value);
    Cookies.set(cookiesKey.resolution, event.target.value);
  };

  const handleReorientationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReorientation(event.target.value);
    Cookies.set(cookiesKey.reorientation, event.target.value);
  };

  const { mutate, status } = useMutation({
    mutationKey: ['createStory'],
    mutationFn: () =>
      storyService.createStory({
        id_kelompok: auth.user!.id,
        judul: title,
        orientation,
        complication,
        resolution,
        reorientation,
      }),
    onError: (error) => {
      toast({
        title: 'Oops!',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      Cookies.remove(cookiesKey.title);
      Cookies.remove(cookiesKey.orientation);
      Cookies.remove(cookiesKey.complication);
      Cookies.remove(cookiesKey.resolution);
      Cookies.remove(cookiesKey.reorientation);

      console.log(data!.id);

      navigate(`/story/${data!.id}`);
    },
  });

  // const {mutate: updateMutate, status: updateStatus} = useMutation({
  //   mutationKey: ['updateStory', storyId],
  //   mutationFn: () => {},
  //     storyService.updateStory({
  //       id: storyId,
  //       judul: title,
  //       orientation,
  //       complication,
  //       resolution,
  //       reorientation,
  //     }),
  // });


  const handleSubmit = () => {
    const validate = validateSubmitStory({
      title,
      orientation,
      complication,
      resolution,
      reorientation,
    });

    if (validate !== null) {
      toast({
        title: 'Failed to submit story',
        description: validate,
        variant: 'destructive',
      });
      return;
    }

    mutate();
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="relative h-[500px] bg-gray-700">
          <div className="absolute z-20 flex h-[500px] flex-col justify-center px-16 py-6">
            <h1 className="mb-6 text-6xl font-black text-white">
              Create Story
            </h1>

            <p className="w-3/4 rounded-lg bg-white/60 px-4 py-6 text-lg backdrop-blur-md">
              Modify a narrative text from an existing legendary story as
              creative as you can. Don't forget to submit before due time! Your
              story will be given to another team to recreate the story
            </p>
          </div>

          <div className="absolute z-10 h-[500px] w-full bg-gradient-to-b from-background-softer/5 to-white/100"></div>

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

      <div className="z-30 mb-8 flex flex-col gap-6 bg-white px-16 py-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="col-span-1 text-lg font-bold">
            Title
          </label>
          <Input
            name="title"
            placeholder="Enter your story title"
            className="bg-slate-100 px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            autoComplete="off"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="orientation" className="col-span-1 text-lg font-bold">
            Orientation
          </label>
          <textarea
            className="rounded-lg border bg-slate-100 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            name="orientation"
            id="orientation"
            placeholder="Enter your story orientation here..."
            rows={8}
            value={orientation}
            onChange={handleOrientationChange}
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="complication"
            className="col-span-1 text-lg font-bold"
          >
            Complication
          </label>
          <textarea
            className="rounded-lg border bg-slate-100 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            name="complication"
            id="complication"
            placeholder="Enter your story complication here..."
            rows={8}
            value={complication}
            onChange={handleComplicationChange}
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="resolution" className="col-span-1 text-lg font-bold">
            Resolution
          </label>
          <textarea
            className="rounded-lg border bg-slate-100 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            name="resolution"
            id="resolution"
            placeholder="Enter your story resolution here..."
            rows={8}
            value={resolution}
            onChange={handleResolutionChange}
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="reorientation"
            className="col-span-1 text-lg font-bold"
          >
            Reorientation
          </label>
          <textarea
            className="rounded-lg border bg-slate-100 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            name="reorientation"
            id="reorientation"
            placeholder="Enter your story reorientation here..."
            rows={8}
            value={reorientation}
            onChange={handleReorientationChange}
          ></textarea>
        </div>

        <div className="size-4"></div>

        <div className="mb-20 flex items-center justify-center bg-white">
          {status === 'pending' ? (
            <Button
              className="w-min rounded-full bg-gradient-to-r from-gray-400 to-gray-500 px-8 font-medium text-white"
              variant="default"
              disabled
            >
              <Loader2 className="mr-2 size-5 animate-spin" />
              Please wait, it might take a while...
            </Button>
          ) : (
            <Button
              className="rounded-full px-10 font-medium"
              variant="gradient"
              onClick={handleSubmit}
            >
              Submit my story
            </Button>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
