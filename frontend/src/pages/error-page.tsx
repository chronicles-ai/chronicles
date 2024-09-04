import notFound from '@/assets/404.json';
import { Button } from '@/components/ui/button';
import { Player } from '@lottiefiles/react-lottie-player';

const ErrorPage = () => {
  return (
    <section
      className="flex h-screen items-center justify-center bg-white lg:grid-cols-2"
      style={{
        backgroundImage: 'url("/backgroundWhite.png")',
        backgroundSize: 'cover',
      }}
    >
      <div className="container grid items-center lg:grid-cols-2">
        <div>
          <Player
            autoplay
            loop
            src={notFound}
            style={{ height: '400px', width: '400px' }}
          ></Player>
        </div>

        <div className="text-center lg:text-left">
          <h1 className="mb-2 text-6xl font-black">404 Not Found!</h1>
          <p className="mb-8 text-xl text-black/80">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>

          <a href="/">
            <Button variant="gradient">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-2 size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Take me back</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
