import {WorkFlowContainer, WorkFlowList} from '@/features/workflow/components/workflows'
import { WorkFlowParamsLoader } from '@/features/workflow/server/params-loader'
import { prefetchWorkflows } from '@/features/workflow/server/prefetch'
import { requireauth } from '@/lib/auth-utils'
import { HydrateClient } from '@/trpc/server'
import type { SearchParams } from 'nuqs/server'
import React, { Suspense } from 'react'
import {ErrorBoundary} from "react-error-boundary"
type Props = {
  searchParams:Promise<SearchParams>
}

const page = async ({searchParams}: Props) => {
  await requireauth()
  const params = await WorkFlowParamsLoader(searchParams);
  const r = prefetchWorkflows(params);
  return (


    <WorkFlowContainer>

    <HydrateClient>
      <ErrorBoundary fallback={<div>Error occurred while loading workflows.</div>}>
          <WorkFlowList/>

        {/* <Suspense fallback={<div>Loading workflows...</div>}>
        </Suspense> */}

      </ErrorBoundary>
    </HydrateClient>
    </WorkFlowContainer>
  )
}

export default page