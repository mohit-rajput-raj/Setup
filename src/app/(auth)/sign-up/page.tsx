import { SignUpForm } from '@/features/auth/components/Sign-upForm'
import { requireUnauth } from '@/lib/auth-utils'

type Props = {}

const SignUp = async(props: Props) => {
  await requireUnauth()
  return (
    <div className='flex h-screen w-full justify-center items-center'>
            <SignUpForm   className='w-87.5   '/>

        
    </div>
  )
}

export default SignUp