import Visibility from '@/components/icons/visibility';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Props = {
  value: string;
  setValue: (value: string) => void;
  className?: string;
  bold?: boolean;
};

export function PasswordInput({
  value,
  setValue,
  className,
  bold,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label
        htmlFor="password"
        className={cn('text-sm', bold === true ? 'font-bold' : null)}
      >
        Password
      </label>
      <Input
        name="password"
        placeholder="Password"
        type={showPassword ? 'text' : 'password'}
        className={cn('px-4', className)}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <div
        className="absolute bottom-[10px] right-4 hover:cursor-pointer"
        onClick={togglePassword}
      >
        <Visibility show={!showPassword} />
      </div>
    </div>
  );
}
