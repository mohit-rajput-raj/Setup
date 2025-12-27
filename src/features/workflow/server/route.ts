import prisma from "@/lib/db";
import { createTRPCRouter , protectedProcedures , premimumProcedure} from "@/trpc/init";
import { create } from "domain";
import { get } from "http";
import {generateSlug} from "random-word-slugs"
import z from "zod";
export const workFlowRouter = createTRPCRouter({
    create: premimumProcedure.mutation(({ctx})=>{
        return prisma.workflow.create({
            data:{
                name: generateSlug(3),
                userId: ctx.auth.user.id
                
                
                
            }
        })

    }),
    remove: protectedProcedures.input(z.object({id: z.string()})).mutation(({ctx,input})=>{
        return prisma.workflow.deleteMany({
            where:{
                id: input.id,
                userId:ctx.auth.user.id
            }
        })
    }),
    updateName: protectedProcedures.input(z.object({id: z.string(), name: z.string()})).mutation(({ctx,input})=>{
        return prisma.workflow.updateMany({
            where:{
                id: input.id,
                userId:ctx.auth.user.id
            },
            data:{
                name: input.name
            }
        })
    }),
    getAll: protectedProcedures.query(({ctx})=>{
        return prisma.workflow.findMany({
            where:{
                userId: ctx.auth.user.id
            }
        })
    }),
    getById: protectedProcedures.input(z.object({id: z.string()})).query(({ctx,input})=>{
        return prisma.workflow.findFirst({
            where:{
                id: input.id,
                userId: ctx.auth.user.id
            }
        })
    })
    
})