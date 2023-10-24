'use client'; // Error components must be Client Components

import { Button } from '@repo/ui/components/button';
import { Text } from '@repo/ui/components/typography/typography';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="container flex h-full flex-col items-center justify-center">
      <Text className="mb-6" intent="h2">
        Uh oh! We couldn&apos;t find the challenges you were looking for.
      </Text>
      <Link href="/explore">
        <Button>Explore Challenges</Button>
      </Link>
    </div>
  );
}
