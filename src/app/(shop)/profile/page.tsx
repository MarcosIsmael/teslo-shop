import { Title } from "@/components";
import React from "react";
import { auth } from "../../../../auth.config";
import { redirect } from "next/navigation";

export const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    // redirect("/auth/login?returnTo=/perfil");
    redirect("/");
  }
  return (
    <div>
      <Title title="Perfil" />

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};
