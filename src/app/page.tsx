'use client'

import { useTRPC } from "@/trpc/client";
import Logout from "./logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { on } from "events";
import { toast } from "sonner";
import { useState } from "react";

type Props = {};

const page = (props: Props) => {
  // await requireauth()
  const [dats , setData] = useState<any>(null)
  const trpc = useTRPC()
  const {data , isLoading} = useQuery(trpc.getWorkflows.queryOptions())
  const queryClient = useQueryClient()
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess:()=>{
      toast.success("background working is started")
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())

    }
  }))
  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess:(data)=>{
      setData(data)
      toast.success("ai fetched some data")
    }
  }))
  

  
  return (
    <div className="w-full flex items-center justify-center gap-10 flex-col">
     this is the end
     <div>
      {isLoading && <div>loading...</div>}
      {dats && <div>{JSON.stringify(dats , null , 2)}</div>}
      {JSON.stringify(data , null , 2)}
      <Button disabled={create.isPending} onClick={()=>create.mutate()}>create</Button>
     </div>
      <Button disabled={testAi.isPending} onClick={()=>testAi.mutate()}>aiii</Button>

     <Logout/>
    </div>
  );
};

export default page;
