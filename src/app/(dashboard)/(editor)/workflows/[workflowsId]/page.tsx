import { requireauth } from '@/lib/auth-utils'
import React from 'react'
interface PageProps{
    params:Promise<{workflowsId:string}>

}
const page = async({params}: PageProps) => {
  await requireauth()
    const {workflowsId} = await params
  return (
    <div>workflowsId : {workflowsId}</div>
  )
}

export default page