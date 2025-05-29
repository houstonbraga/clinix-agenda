"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

const AuthenticationPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-300">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="bg-emerald-200 grid w-full grid-cols-2">
          <TabsTrigger value="login" className="cursor-pointer">Login</TabsTrigger>
          <TabsTrigger value="register" className="cursor-pointer">Cadastre-se</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
