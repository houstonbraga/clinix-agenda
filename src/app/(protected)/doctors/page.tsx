import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
import { auth } from "@/lib/auth";
//elaborado com a estrutura de composition pattern

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  if(!session?.user?.clinic) {
    redirect("/clinic-form");
  }
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
