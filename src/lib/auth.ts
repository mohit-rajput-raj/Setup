import { betterAuth } from "better-auth";
import {prismaAdapter  } from "better-auth/adapters/prisma";
import prisma from "./db";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { polarClient } from "./polar";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword: { 
        enabled: true, 
        autoSignIn: true,
        
    }, 
     plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "f21b64c9-ad9d-42a2-a737-675996c2fdf6",
                            slug: "pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/setup-pro
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal(),
            ],
        })
    ]
    
    
  
});