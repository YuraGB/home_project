'use client';
import { Button } from '../ui/button';
import { useSubscridtion } from './hook/useSubscribtion';

export default function SubscribeButton({ userId }: { userId: number }) {
  const { subscribe, subscribed } = useSubscridtion(userId);

  return (
    <Button onClick={subscribe} disabled={subscribed} variant={'ghost'}>
      {subscribed ? '✅ Subscribed' : '🔔 Subscribe to Push'}
    </Button>
  );
}
