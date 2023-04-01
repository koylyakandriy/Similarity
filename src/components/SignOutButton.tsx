"use client";
import React, { FC, useState } from "react";
import Button from "@/ui/Button";
import { signOut } from "next-auth/react";
import { toast } from "@/ui/Toast";

interface SingOutButtonProps {}

const SingOutButton: FC<SingOutButtonProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signOutUser = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      toast({
        title: "Error signing out",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signOutUser} isLoading={isLoading}>
      Sing in
    </Button>
  );
};

export default SingOutButton;
