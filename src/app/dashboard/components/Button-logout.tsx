"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const ButtonLogout = () => {
  const router = useRouter();
  return (
    <div className="w-">
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/authentication"); // redirect to login page
              },
            },
          })
        }
      >
        Logout
      </Button>
    </div>
  );
};

export default ButtonLogout;
