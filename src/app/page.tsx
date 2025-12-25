import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {}

const page =async (props: Props) => {
  const users = await prisma.user.findMany()
  return (
    <div>
      {JSON.stringify(users)}
    </div>
  )
}

export default page