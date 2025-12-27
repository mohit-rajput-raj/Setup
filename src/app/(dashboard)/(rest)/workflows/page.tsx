import {WorkFlowContainer, WorkFlowList} from '@/features/workflow/components/workflows'
import { prefetchWorkflows } from '@/features/workflow/server/prefetch'
import { requireauth } from '@/lib/auth-utils'
import { HydrateClient } from '@/trpc/server'
import React, { Suspense } from 'react'
import {ErrorBoundary} from "react-error-boundary"
type Props = {}

const page = async (props: Props) => {
  await requireauth()
  prefetchWorkflows();
  return (
    <WorkFlowContainer>

    <HydrateClient>
      <ErrorBoundary fallback={<div>Error occurred while loading workflows.</div>}>
        <Suspense fallback={<div>Loading workflows...</div>}>
          <WorkFlowList/>
        </Suspense>

      </ErrorBoundary>
    </HydrateClient>
    </WorkFlowContainer>
  )
}

export default page