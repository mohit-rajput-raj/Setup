
import { workFlowRouter } from "@/features/workflow/server/route";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  workflow: workFlowRouter,

  
});
// export type definition of API
export type AppRouter = typeof appRouter;
