"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog,  DialogTrigger } from "@/components/ui/dialog";

import UpsertDoctorForm from "./upsert-doctor-form";

const addDoctorButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Adicionar Médico
        </Button>
      </DialogTrigger>
      <UpsertDoctorForm />
    </Dialog>
  );
};

export default addDoctorButton;
