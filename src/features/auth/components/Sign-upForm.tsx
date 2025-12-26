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
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {  useForm } from "react-hook-form";
import { signupschema, Signupschema } from "@/schemas/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@/components/loaders/loader-simple";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const isPanding = false;

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  //   const { toast } = useToast()
  const methods = useForm<Signupschema>({
    resolver: zodResolver(signupschema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const onHandleSubmit = methods.handleSubmit(async(data : Signupschema) => {
    setLoading(true);
    try {
      console.log(data);
      
      const {data:res , error:signuperror} =await authClient.signUp.email({
        name:data.email,
        email: data.email,
        password: data.password,
        callbackURL:"/"
      },
      {
        onSuccess: (data) => {
          router.push('/')
          toast.success("Register successful")
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
      setLoading(false)
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
            <Card className={cn(className)}>
              <CardHeader>
                <CardTitle>Sign-up to your account</CardTitle>
                <CardDescription>
                  Enter your email below to Sign-up to your account
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
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your email?
                      </a>
                    </div>
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
                    <FormField
                      control={methods.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="Confirm your password"
                              disabled={isPanding}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center">
                      <FieldLabel htmlFor="confirmPassword">
                        confirmPassword
                      </FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isPanding}>
                      Sign Up
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isPanding}
                    >
                      Sign Up with Google
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isPanding}
                    >
                      Sign Up with github
                    </Button>
                    <FieldDescription className="text-center">
                      already have an account? <a href="/login">sign in</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </Loader>
        </div>
      </form>
    </Form>
  );
}
