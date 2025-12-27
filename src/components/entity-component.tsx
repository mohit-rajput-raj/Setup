import { PlusIcon } from "lucide-react";
import { title } from "process";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type EntityHeaderProps = {
  title: string;
  description: string;
  newButtonLable?: string;
  disable?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
  description,
  title,
  newButtonLable,
  disable,
  isCreating,
  newButtonHref,
  onNew,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && <p className="text-sm text-gray-600">{description}</p>}
        
      </div>
      {onNew && !newButtonHref && (
          <Button disabled={disable || isCreating} onClick={onNew} size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            {newButtonLable || "New"}
          </Button>
        )}
        {!onNew && newButtonHref && (
          <Button size="sm" asChild>
            <Link href={newButtonHref} className={disable ? "pointer-events-none opacity-50" : ""}>
            <PlusIcon className="mr-2 h-4 w-4" />
            {newButtonLable || "New"}</Link>
          </Button>
        )}
    </div>
  );
};
export const EntityContainer = ({
  header,
  search,
  pagination,
  children,
}: {
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="p-4 md:px-10 md:py-9 h-full b bg-zinc-50">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full">

      {header}
      
      <div className="flex flex-col gap-y-4 h-full">
        {search}
        {children}
      </div>
      </div>
    </div>
  );
}

