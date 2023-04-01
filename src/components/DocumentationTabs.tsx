import React, { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/ui/Tabs";

const DocumentationTabs: FC = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value={""}>Nodes</TabsTrigger>
        <TabsTrigger value={""}>Python</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default DocumentationTabs;
