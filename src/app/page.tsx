
import { getQueryClient , trpc } from '@/trpc/server';
import Client from './client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
type Props = {}

const page =async (props: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <HydrationBoundary state={dehydrate(queryClient)}> 
        <Suspense fallback={<div>Loading...</div>}>
          <Client/>
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}

export default page