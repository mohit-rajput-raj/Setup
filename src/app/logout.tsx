"use client"
import { Loader } from '@/components/loaders/loader-simple'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'

type Props = {}

const Logout = (props: Props) => {
      const [isPanding] = useTransition()
     const route = useRouter();
    const handelLogout = ()=>{
        try {
            
        authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                    route.replace('/login')
                }
            }
        }) 
      
            
        } catch (error) {
            
        }finally{
      

        }


    }
  return (
    <Button onClick={handelLogout}  disabled={isPanding}>
        <Loader loading={isPanding}>
            logout
        </Loader>
    </Button>
  )
}

export default Logout