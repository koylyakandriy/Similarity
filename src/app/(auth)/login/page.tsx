import React, { FC } from "react";
import Link from "next/link";
import { buttonVariants } from "@/ui/Button";
import Icons from "@/components/Icons";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import UserAuthForm from "@/components/UserAuthForm";

const Login: FC = () => {
  return (
    <div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center gap-6 max-w-full">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link
            className={buttonVariants({ variant: "ghost", className: "w-fit" })}
            href="/"
          >
            <Icons.ChevronLeft className="mr-2 h-4 w=4" />
            Back to home
          </Link>
          <LargeHeading>Welcome back!</LargeHeading>
          <Paragraph>Please sign in using your google account</Paragraph>

          <UserAuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
