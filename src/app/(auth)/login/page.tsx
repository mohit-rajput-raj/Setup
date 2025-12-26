// import { LoginForm } from '@/features/auth/components/loginForm'
import { LoginForm } from '@/features/auth/components/loginForm'
import { requireUnauth } from '@/lib/auth-utils'
import React from 'react'

type Props = {}

const Login = async(props: Props) => {
  await requireUnauth()
  return (
    
            <LoginForm className='w-87.5  '/>

        
    
  )
}

export default Login