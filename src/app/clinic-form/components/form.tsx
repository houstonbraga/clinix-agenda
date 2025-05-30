"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import createClinic from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//schema do zod para criacao de clinica
const clinicCreateSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
});

const FormClinicCreate = () => {
  const form = useForm<z.infer<typeof clinicCreateSchema>>({
    resolver: zodResolver(clinicCreateSchema),
    defaultValues: {
      name: "",
    },
  }); //pegar as info do form e guardar no tabela de dados

  const handleSubmit = async (data: z.infer<typeof clinicCreateSchema>) => {
    try {
      await createClinic(data.name);
      toast.success("Clínica criada com sucesso!");
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.log(error);
      toast.error("Erro ao criar a clínica!");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome da clínica"
                    className="border border-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className="animation-spin mr-2 h-5 w-5" />
              )}{" "}
              Criar Clínica
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default FormClinicCreate;
