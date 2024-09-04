import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import ExclamationTriangle from '@/components/icons/exclamation-triangle';
import { PasswordInput } from '@/components/password-input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LoginParams from '@/infrastructures/params/login-params';
import { login as loginFn } from '@/infrastructures/services/auth-service';
import { useAppDispatch } from '@/states/hooks/use-app-dispatch';
import { useToast } from '@/states/hooks/use-toast';
import { login } from '@/states/stores/auth/auth-slice';
import { useMutation } from '@tanstack/react-query';

export default function LoginPage() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: loginFn,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAs, setLoginAs] = useState<'kelompok' | 'guru'>('kelompok');

  const error = false;

  useEffect(() => {
    if (mutation.status === 'error') {
      toast.toast({
        title: 'Oops!',
        description: mutation.error.message,
        variant: 'destructive',
      });
    }

    if (mutation.status === 'success') {
      dispatch(
        login({
          ...mutation.data,
          role: loginAs,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.status]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      toast.toast({
        title: 'Invalid credentials',
        description: 'Please fill in the form to continue.',
        variant: 'default',
      });
      return;
    }

    const user: LoginParams = {
      username,
      password,
      as: loginAs,
    };

    mutation.mutate(user);
  };

  const handleLoginAsChange = (value: string) => {
    if (value === 'kelompok' || value === 'guru') {
      setLoginAs(value);
    }
  };

  return (
    <main
      className="h-screen w-screen bg-primary"
      style={{
        backgroundImage: 'url("/background.png")',
        backgroundSize: 'cover',
      }}
    >
      <section className="mx-auto h-full gap-10 px-4 py-20 md:px-20 lg:flex lg:justify-end">
        {/* Images */}
        <div className="hidden items-center justify-center lg:flex">
          <img src="/hero.png" className="mb-12 w-10/12" />
        </div>

        {/* Forms */}
        <div className="flex min-w-[500px] flex-col justify-center rounded-2xl bg-white px-12 py-20 shadow-lg shadow-black/10">
          <form onSubmit={handleLogin}>
            <h1 className="mb-2 text-center text-3xl font-extrabold">
              Welcome to Chronicles
            </h1>
            <p className="text-center text-sm text-slate-500">
              Please sign in to your account
            </p>

            {error ? (
              <Alert variant="destructive" className="mt-8">
                <ExclamationTriangle className="size-5" />
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>
                  These credentials do not match our records.
                </AlertDescription>
              </Alert>
            ) : null}

            <div className="size-8"></div>

            <div className="flex flex-col gap-2">
              <label htmlFor="as" className="text-sm">
                Login as
              </label>
              <Select
                onValueChange={handleLoginAsChange}
                defaultValue="kelompok"
              >
                <SelectTrigger className="rounded-full px-4">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kelompok">Student</SelectItem>
                  <SelectItem value="guru">Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="size-4"></div>

            <div className="flex flex-col gap-2">
              <label htmlFor="login" className="text-sm">
                Username
              </label>
              <Input
                name="login"
                placeholder="Username"
                className="rounded-full px-4"
                autoComplete="off"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="size-4"></div>

            <PasswordInput
              value={password}
              setValue={setPassword}
              className="rounded-full"
            />

            <div className="size-2"></div>

            <div className="flex flex-col items-end">
              <a href="/" className="text-xs font-medium text-secondary">
                Forgot Password?
              </a>
            </div>

            <div className="size-8"></div>

            {mutation.status === 'pending' ? (
              <Button
                className="ml-auto w-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500 px-8 font-medium text-white"
                variant="default"
                disabled
              >
                <Loader2 className="mr-2 size-5 animate-spin" />
                Loading...
              </Button>
            ) : (
              <Button className="w-full rounded-full" variant="gradient">
                Sign in
              </Button>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
