import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, { message: "O nome é obrigatório!" }),
  cpf: z.string().trim().min(11, { message: "O CPF é obrigatório!" }).max(11),
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "O telefone é obrigatório!" }),
  sex: z.enum(["male", "female"], {
    required_error: "O sexo é obrigatório!",
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
