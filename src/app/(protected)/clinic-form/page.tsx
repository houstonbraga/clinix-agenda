import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import FormClinicCreate from "./_components/form";

const ClinicForm = async () => {
  return (
    <div>
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar clinica</DialogTitle>
            <DialogDescription>
              Adicione uma clinica para continuar.
            </DialogDescription>
          </DialogHeader>
          <FormClinicCreate />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClinicForm;
