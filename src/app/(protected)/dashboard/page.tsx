import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import ButtonLogout from "./_components/Button-logout";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication"); //autenticacao de usuario e redirecionamento
  }

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });
  if(clinics.length === 0){
    redirect("/clinic-form"); //autenticacao de usuario com existencia de alguma clinica para poder ir para o dashboard
  }

  return (
    <div className="flex flex-col">
      <h1>Dashboard</h1>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <ButtonLogout />
    </div>
  );
};

export default DashboardPage;
