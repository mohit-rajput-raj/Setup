import { requireauth } from '@/lib/auth-utils'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  await requireauth()
  return (
    <div>executions</div>
  )
}

export default page