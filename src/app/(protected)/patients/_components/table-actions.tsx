import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface UpsertPatientFormProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientTableActions = ({ patient }: UpsertPatientFormProps) => {
  const [upsertDialogIsOpen, setUpsertDialogIsOpen] = useState(false);
  return (
    <Dialog open={upsertDialogIsOpen} onOpenChange={setUpsertDialogIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setUpsertDialogIsOpen(true)}>
            <EditIcon size={16} className="mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon size={16} className="mr-2" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpsertPatientForm patient={patient} isOpen={upsertDialogIsOpen} onSuccess={() => setUpsertDialogIsOpen(false)}/>
    </Dialog>
  );
};

export default PatientTableActions;
