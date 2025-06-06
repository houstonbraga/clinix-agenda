"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PhoneIcon, User, VenusAndMars } from "lucide-react";

import { patientsTable } from "@/db/schema";

import PatientTableActions from "./table-actions";

type Patience = typeof patientsTable.$inferSelect;

export const patienceColumnsTable: ColumnDef<Patience>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: () => {
      return <span className="text-primary">Nome</span>;
    },
  },
  {
    id: "cpf",
    accessorKey: "cpf",
    header: () => {
      return (
        <div className="text-primary flex items-center gap-2">
          <User size={16} />
          <span>CPF</span>
        </div>
      );
    },
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
    header: () => {
      return (
        <div className="text-primary flex items-center gap-2">
          <PhoneIcon size={16} />
          <span>Número de telefone</span>
        </div>
      );
    },
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
    header: () => {
      return (
        <div className="text-primary flex items-center gap-2">
          <VenusAndMars size={16} />
          <span>Sexo</span>
        </div>
      );
    },
    cell: (params) => {
      const patient = params.row.original;
      return patient.sex === "male" ? "Masculino" : "Feminino";
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const patient = params.row.original;

      return <PatientTableActions patient={patient} />;
    },
  },
];
