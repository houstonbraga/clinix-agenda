"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

type Patience = typeof patientsTable.$inferSelect;

export const patienceColumnsTable: ColumnDef<Patience>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "cpf",
    accessorKey: "cpf",
    header: "Cpf",
    cell: ({ row }) => {
      const cpf = row.original.cpf || "";
      const cleaned = cpf.replace(/\D/g, "");
      if (cleaned.length === 11) {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(
          6,
          9,
        )}-${cleaned.slice(9)}`;
      }
      return cpf;
    },
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Número de telefone",
    cell: ({ row }) => {
      const phone = row.original.phoneNumber || "";
      const cleaned = phone.replace(/\D/g, "");
      if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
      }
      return phone;
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => {
      const patient = params.row.original;
      return patient.sex === "male" ? "Masculino" : "Feminino";
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Remover</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
