import { authClient } from "@/lib/auth-client";
import { requireauth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { toast } from "sonner";
import Logout from "./logout";

type Props = {};

const page = async(props: Props) => {
  await requireauth()
  const data =await caller.getUsers()
  const signout = async()=>{
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      toast.success("Logout successful")
       // redirect to login page
    },
  },
});
  }
  return (
    <div className="w-full flex items-center justify-center gap-10 flex-col">
     this is the end
     <div className="w-20">
      {JSON.stringify(data , null , 2)}
     </div>
     <Logout/>
    </div>
  );
};

export default page;
