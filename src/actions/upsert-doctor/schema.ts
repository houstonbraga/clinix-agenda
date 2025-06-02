import {z} from 'zod';

export const upsertDoctorSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: "O nome é obrigatório!" }),
  specialty: z.string().min(1, { message: "A especialidade é obrigatório!" }),
  appointmentPriceInCents: z.number().min(1, { message: "O valor da consulta é obrigatório!" }),
  availableFromWeekDay: z.number().min(0).max(6),
  availableToWeekDay: z.number().min(0).max(6),
  availableFromTime: z.string().min(1, { message: "O horário de inicio é obrigatório!" }),
  availableToTime: z.string().min(1, { message: "O horário de fim é obrigatório!" }),
}).refine(
  (data) => {
    return data.availableFromTime < data.availableToTime;
  },
  {
    message:
      "O horário de inicio não pode ser maior que o horário de término!",
    path: ["availableToTime"],
  },
);

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>


