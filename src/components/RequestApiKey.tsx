"use client";
import React, { FormEvent, useState } from "react";
import { toast } from "@/ui/Toast";
import { createApiKey } from "@/helpers/createApiKey";
import { Key } from "lucide-react";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import CopyButton from "@/components/CopyButton";
import Input from "@/ui/Input";
import Button from "@/ui/Button";

const RequestApiKey = () => {
  const [isCreating, setIsCreate] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreate(true);

    try {
      const generateApiKey = await createApiKey();
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          message: err.message,
          type: "error",
        });

        return;
      }

      toast({
        title: "Error",
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setIsCreate(false);
    }
  };

  return (
    <div className="container mx-auto md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 text-gray-400" />
        <LargeHeading className="text-center">
          Request your API key
        </LargeHeading>
        <Paragraph>You haven&apos;t requested an API key yet</Paragraph>
      </div>

      <form
        action="#"
        onSubmit={createNewApiKey}
        className="mt-6 sm:flex sm:items-center"
      >
        <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              valueToCopy={apiKey}
              type="button"
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here!"
          />
        </div>
        <div className="mt-6 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
