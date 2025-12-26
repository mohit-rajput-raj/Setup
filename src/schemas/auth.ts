import z from "zod";

export const loginScshema = z.object({
    
    email: z.email({ message: 'Incorrect email format' }),
    
    password: z
      .string()
      .min(8, { message: 'Your password must be atleast 8 characters long' })
      .max(64, {
        message: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
    
  })
  
  
export type LoginFormData = z.infer<typeof loginScshema>;


export const signupschema = z.object({
    
    email: z.email({ message: 'Incorrect email format' }),
    
    password: z
      .string()
      .min(8, { message: 'Your password must be atleast 8 characters long' })
      .max(64, {
        message: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
      confirmPassword: z.string().min(8, { message: 'Your password must be atleast 8 characters long' }),
    
  }).refine((schema) => schema.password === schema.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })
  
  
export type Signupschema = z.infer<typeof signupschema>;