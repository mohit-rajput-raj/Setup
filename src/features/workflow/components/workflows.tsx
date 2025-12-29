"use client";
import React from "react";
import { useCreateWorkFlow, useSuspenseWorkFlow } from "../hooks/use-workflow";
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from "@/components/entity-component";
import { useUpgradeModal } from "@/hooks/use-upgrade-model";

import { UseWorkFlowParams } from "../hooks/use-workflow-params";
import {

  useDummy,
  UseEntitySearch,
} from "@/hooks/use-entity-search";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

type Props = {};

export const WorkFlowSearch = () => {
  const [params, setParams] = UseWorkFlowParams();
  const { searchValue, onSearchChange, handelSHow } = UseEntitySearch({
    params,
    setParams,
  });
  // useEffect(()=>{
  //   toast.success(searchValue)
  // },[searchValue])
  const handelSHowc = (e: string) => {
    console.log("ram ram");

    handelSHow(e);
    // setLocalSearch(e)
  };
  return (
    <>
      {searchValue}
      <EntitySearch
        value={searchValue}
        onChange={handelSHowc}
        placeholder="Search Workflows"
      />
    </>
  );
};

export const WorkFlowList = (props: Props) => {
  // const workflow = useSuspenseWorkFlow();
  const trpc = useTRPC();
  const [params] = UseWorkFlowParams();

  const workflow = useSuspenseQuery(trpc.workflow.getAll.queryOptions(params));

  return (
    <div className="flex flex-1 justify-center items-center">
      {JSON.stringify(workflow?.data, null, 2)}
      esrsers
      {JSON.stringify(params)}
    </div>
  );
};

export const WorkFlowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createNewWorkFlow = useCreateWorkFlow();
  const { handleError, modal } = useUpgradeModal();

  const handelCreate = () => {
    // toast.success("Create new workflow")
    createNewWorkFlow.mutate(undefined, {
      onError: (error) => {
        handleError(error); // single source of truth
      },
    });
  };
  return (
    <>
      <EntityHeader
        title="Workflows"
        description="Manage your workflows"
        onNew={handelCreate}
        newButtonLable="new WorkFlow"
        isCreating={createNewWorkFlow.isPending}
        disable={disabled}
      />
      {modal}
    </>
  );
};

export const WorkFlowPagination = () => {
  const trpc = useTRPC();
  const [params , setParams] = UseWorkFlowParams();

  const workFlow = useSuspenseQuery(trpc.workflow.getAll.queryOptions(params));
  return (
    <EntityPagination
      disabled={workFlow.isFetching}
      totalPages={workFlow.data.totalPages}
      page={workFlow.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const WorkFlowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkFlowsHeader />}
      search={
        // <></>
        <WorkFlowSearch/>
      }
      pagination={
      <></>
      // <WorkFlowPagination />
    }
    >
      {children}
    </EntityContainer>
  );
};
