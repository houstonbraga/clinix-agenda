import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deletePatient } from "@/actions/delete-patient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  const deletePatientAction = useAction(deletePatient, {
    onSuccess: () => {
      toast.success("Paciente excluido com sucesso!");
    },

    onError: () => {
      toast.error("Erro ao excluir paciente!");
    },
  });

  const handleDeletePatient = () => {
    if (!patient) return;
    deletePatientAction.execute({ id: patient.id });
  };

  return (
    <Dialog open={upsertDialogIsOpen} onOpenChange={setUpsertDialogIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setUpsertDialogIsOpen(true)}>
            <EditIcon size={16} className="mr-2" />
            Editar
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <TrashIcon size={16} className="mr-2" />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                Tem certeza que deseja excluir esse paciente?{" "}
              </AlertDialogHeader>
              <AlertDialogDescription>
                Essa ação irá excluir permanentemente o paciente.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeletePatient}>Excluir</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpsertPatientForm
        patient={patient}
        isOpen={upsertDialogIsOpen}
        onSuccess={() => setUpsertDialogIsOpen(false)}
      />
    </Dialog>
  );
};

export default PatientTableActions;
