import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // useRouter from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório" }).max(20),
  email: z
    .string()
    .trim()
    .min(1, { message: "O email é obrigatório" })
    .email({ message: "O email é inválido" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "A senha tem que ter no mínimo 8 caracteres" }),
});

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof registerSchema>) {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },

        onError: (ctx) => {
          if (ctx.error.code === "USER_ALREADY_EXISTS") { //verifica se existe tal email na parte de cadastro
            toast.error("Email ja cadastrado!");
            return;
          }
          toast.error("Falha ao tentar criar conta!");
        },
      }, 
    );
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <CardHeader className="flex items-center gap-4">
            <Image
              src="/logomarca.svg"
              width={40}
              height={40}
              alt="logomarca"
            />
            <div>
              <CardTitle>Cadastre-se</CardTitle>
              <CardDescription>
                Faça um cadastro para continuar.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome"
                      {...field}
                      className="border border-slate-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="border border-slate-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Senha"
                      type="password"
                      className="border border-slate-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="text-secondary mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Criar conta"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignUpForm;
