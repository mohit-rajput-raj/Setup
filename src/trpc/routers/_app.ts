import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedures } from '../init';
import prisma from '@/lib/db';
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedures
    
    .query(async({ctx}) => {
      if(!ctx){
        return []
      }
      
      const res =await  prisma.user.findMany({
        where:{
          id:ctx?.auth?.user.id 
        }
      }
      );
      
      return res;
      
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;