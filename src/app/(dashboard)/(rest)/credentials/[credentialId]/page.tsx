import { requireauth } from '@/lib/auth-utils'
import React from 'react'
interface PageProps{
    params:Promise<{credentialId:string}>

}
const page = async({params}: PageProps) => {
  await requireauth()
    const {credentialId} = await params
  return (
    <div>credentialsid : {credentialId}</div>
  )
}

export default page