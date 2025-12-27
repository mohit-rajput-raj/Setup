import type { inferInput } from "@trpc/tanstack-react-query";
import { trpc , prefetch } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflow.getAll>;


export const prefetchWorkflows = async (params: Input) => {
    return prefetch(trpc.workflow.getAll.queryOptions(params));
}