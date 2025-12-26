import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedures } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedures
    
    .query(async({ctx}) => {
      if(!ctx){
        return []
      }
      
      const res =await  prisma.workflow.findMany()
      
      return res;
      
    }),
  createWorkflow:protectedProcedures.mutation(async()=>{
   await inngest.send({
    name:"test/hello.world",
    data:{
      email:"rocky@gmail.com"
    }
   })
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;