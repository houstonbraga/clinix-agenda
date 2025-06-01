import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
//elaborado com a estrutura de composition pattern

const DoctorsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>Gerencie seus médicos cadastrados</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>
            <PlusIcon className="h-4 w-4" />
            Adicionar Médico
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <h1>medicos</h1>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
