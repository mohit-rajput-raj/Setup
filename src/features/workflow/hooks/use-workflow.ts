"use client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UseWorkFlowParams } from "./use-workflow-params";
import { workflowParams } from "../params";
import { useQueryStates } from "nuqs";

export const useSuspenseWorkFlow = () => {
  const trpc = useTRPC();
  const [params] = UseWorkFlowParams();

  return useSuspenseQuery(trpc.workflow.getAll.queryOptions(params));
};

export const useCreateWorkFlow = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.workflow.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" created`);
        router.push(`/workflows/${data.id}`);
        queryClient.invalidateQueries(trpc.workflow.getAll.queryOptions({}));
      },
    })
  );
};
