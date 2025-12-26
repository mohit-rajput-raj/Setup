"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { LoginFormData, loginScshema } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loaders/loader-simple";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const isPanding = false;
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
    //   const { toast } = useToast()
    const methods = useForm<LoginFormData>({
      resolver: zodResolver(loginScshema),
      defaultValues: {
        email: "",
        password: "",
      },
      mode: "onChange",
    });
    const onHandleSubmit = methods.handleSubmit(async(data : LoginFormData) => {
      setLoading(true);
      try {
        console.log(data);
              
              const {data:res , error:signuperror} =await authClient.signIn.email({
                
                email: data.email,
                password: data.password,
                callbackURL:"/"
              },
              {
                onSuccess: (data) => {
                  router.push('/')
                  toast.success("Login successful")
                },
                onError: (error ) => {
                  console.log(error);
                 toast.error(JSON.stringify(error))
                }
              }
            )
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    });
  
  

  return (
     <Form {...methods}>
          <form
            onSubmit={onHandleSubmit}
            className="h-full"
          >
            <div className="flex flex-col justify-between gap-3 h-full">
              <Loader loading={loading}>
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
                    <FormField
                      control={methods.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              disabled={isPanding}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Field>
                  <Field>
                    <FormField
                      control={methods.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              disabled={isPanding}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Field>
            <Field>
              <Button type="submit" disabled={isPanding}>
                Login
              </Button>
              <Button variant="outline" type="button" disabled={isPanding}>
                Login with Google
              </Button>
              <Button variant="outline" type="button" disabled={isPanding}>
                Login with github
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/sign-up">Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
    </Loader>
            </div>
          </form>
        </Form> 
  );
}
