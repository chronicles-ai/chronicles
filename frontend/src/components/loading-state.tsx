import { Player } from '@lottiefiles/react-lottie-player';

import aroundTheGlobe from '../assets/around-the-globe.json';

type LoadingState = {
  message?: string;
};

export default function LoadingState({ message }: LoadingState) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Player
        autoplay
        loop
        src={aroundTheGlobe}
        style={{ height: '300px', width: '300px' }}
      ></Player>

      <p className="mt-8 text-xl font-bold">{message || 'Please wait...'}</p>
    </div>
  );
}
