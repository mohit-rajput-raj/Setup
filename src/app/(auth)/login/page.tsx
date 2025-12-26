// import { LoginForm } from '@/features/auth/components/loginForm'
import { LoginForm } from '@/features/auth/components/loginForm'
import { requireUnauth } from '@/lib/auth-utils'
import React from 'react'

type Props = {}

const Login = async(props: Props) => {
  await requireUnauth()
  return (
    <div className='flex h-screen w-full justify-center items-center'>
            <LoginForm className='w-87.5  '/>

        
    </div>
  )
}

export default Login