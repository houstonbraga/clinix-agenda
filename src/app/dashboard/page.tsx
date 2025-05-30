import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import ButtonLogout from "./components/Button-logout";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
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
