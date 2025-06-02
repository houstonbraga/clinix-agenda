import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

import AddDoctorButton from "./_components/add-doctor-button";
//elaborado com a estrutura de composition pattern

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session?.user?.clinic) {
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
          <AddDoctorButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <h1>medicos</h1>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
