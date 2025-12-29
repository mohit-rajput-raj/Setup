"use client";
import { PlusIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";

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
          <Link
            href={newButtonHref}
            className={disable ? "pointer-events-none opacity-50" : ""}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            {newButtonLable || "New"}
          </Link>
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
      <div className="mx-auto  w-full flex flex-col gap-y-8 h-full">
        {header}

        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
          {pagination}
      </div>
    </div>
  );
};
interface EntitySearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}
export const EntitySearch = ({
  placeholder,
  value,
  onChange,
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full md:w-64 bg-background shadow-none border-border"
      />
    </div>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const EntityPagination = ({
  onPageChange,
  page,
  totalPages,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 item-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          size="sm"
          disabled={page === 1|| disabled}
          variant="outline"
          onClick={()=>onPageChange(Math.max(1,page-1))}
        >
          Previous
        </Button>
        <Button
        size="sm"
          disabled={page === totalPages || totalPages === 0 || disabled}
          variant="outline"
          onClick={()=>onPageChange(Math.min(totalPages,page+1))}
        >Next</Button>
      </div>
    </div>
  );
};
