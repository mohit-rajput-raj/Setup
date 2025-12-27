
import { requireUnauth } from '@/lib/auth-utils'
import dynamic from "next/dynamic";
import LoginClient from './loginClient';


type Props = {}

const Login = async (props: Props) => {
  await requireUnauth();
  return <LoginClient />;
};

export default Login;
