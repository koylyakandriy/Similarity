import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ApiDashboard from "@/components/ApiDashboard";
import RequestApiKey from "@/components/RequestApiKey";

export const metadata: Metadata = {
  title: "Similarity API | Dashboard",
  description: "Free & open-source API",
};
const Dashboard = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return notFound();
  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  });

  return (
    <div className="container max-w-7xl mx-auto mt-12">
      {apiKey ? (
        // @ts-expect-error Server Component
        <ApiDashboard />
      ) : (
        <RequestApiKey />
      )}
    </div>
  );
};

export default Dashboard;
