import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/states/hooks/use-app-dispatch';
import { useAppSelector } from '@/states/hooks/use-app-selector';
import { decrement, increment } from '@/states/stores/counter/counter-slice';

export default function CounterPage() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="mb-8 text-xl">{count}</h1>

      <div className="flex gap-4">
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Button onClick={() => dispatch(increment())}>+</Button>
      </div>
    </div>
  );
}
