"use server"
import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const requireauth = async()=>{
    const sessions  =await  auth.api.getSession({
        headers:await headers()
    })
    if(!sessions){
        redirect("/login")
    }
    return sessions
}
export const requireUnauth = async()=>{
    const sessions  =await  auth.api.getSession({
        headers:await headers()
    })
    
    if ( sessions) redirect("/")

    
}