import { email, z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedures } from "../init";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async () => {
    try {
    const {ids}=await inngest.send({
              name: "axecute/hello.ai",
              
            });
            return ids
    
  } catch (err) {
    console.error("AI error:", err);
    throw err;
  }
  }),
  getWorkflows: protectedProcedures.query(async ({ ctx }) => {
    if (!ctx) {
      return [];
    }

    const res = await prisma.workflow.findMany();

    return res;
  }),
  createWorkflow: protectedProcedures.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "rocky@gmail.com",
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
