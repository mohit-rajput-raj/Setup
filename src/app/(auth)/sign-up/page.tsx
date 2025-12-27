import { requireUnauth } from '@/lib/auth-utils'
import dynamic from "next/dynamic";
import SignUpClient from './SignClient';



const SignUp = async() => {
  await requireUnauth()
  return (
            <SignUpClient  />

        
  )
}

export default SignUp