'use client'

import { useTRPC } from "@/trpc/client";
import Logout from "./logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { on } from "events";
import { toast } from "sonner";

type Props = {};

const page = (props: Props) => {
  // await requireauth()
  const trpc = useTRPC()
  const {data , isLoading} = useQuery(trpc.getWorkflows.queryOptions())
  const queryClient = useQueryClient()
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess:()=>{
      toast.success("background working is started")
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())

    }
  }))
  

  
  return (
    <div className="w-full flex items-center justify-center gap-10 flex-col">
     this is the end
     <div>
      {isLoading && <div>loading...</div>}
      {JSON.stringify(data , null , 2)}
      <Button disabled={create.isPending} onClick={()=>create.mutate()}>create</Button>
     </div>
     <Logout/>
    </div>
  );
};

export default page;
