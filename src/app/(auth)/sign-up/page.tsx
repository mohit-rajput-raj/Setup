import { SignUpForm } from '@/features/auth/components/Sign-upForm'
import { requireUnauth } from '@/lib/auth-utils'

type Props = {}

const SignUp = async(props: Props) => {
  await requireUnauth()
  return (
            <SignUpForm   className='w-87.5   '/>

        
  )
}

export default SignUp