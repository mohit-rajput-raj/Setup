"use client";
import React from "react";
import { useCreateWorkFlow, useSuspenseWorkFlow } from "../hooks/use-workflow";
import {EntityContainer, EntityHeader} from "@/components/entity-component";
import {useUpgradeModal} from "@/hooks/use-upgrade-model";
import { UpgradeModel } from "@/components/alert-dialouge";
import { toast } from "sonner";
// import useUpgradeModel from "@/hooks/use-upgrade-model";
// import useUpgradeModel from "@/hooks/use-upgrade-model";

type Props = {};

export const WorkFlowList = (props: Props) => {
  const workflow = useSuspenseWorkFlow();
  

  return <div className="flex flex-1 justify-center items-center">{JSON.stringify(workflow.data)}</div>;
};

export const WorkFlowsHeader = ({disabled}:{disabled?:boolean}) => {
  const createNewWorkFlow = useCreateWorkFlow();
  const {handleError, modal}  = useUpgradeModal();

  const handelCreate = ()=>{
    // toast.success("Create new workflow")
    createNewWorkFlow.mutate(undefined, {
      onError: (error) => {
        handleError(error); // single source of truth
      }
    });
  }
  return (
    <>
      <EntityHeader title="Workflows" description="Manage your workflows"
      onNew={handelCreate} 
      newButtonLable="new WorkFlow"
      isCreating={createNewWorkFlow.isPending}
      disable={disabled}/>
     {modal}
    </>
  );
};
export const WorkFlowContainer = ({children }:{children:React.ReactNode }) => {
  return <EntityContainer
  header={<WorkFlowsHeader/>}
  search={<></>}
  pagination={<></>}
  >
    {children}
  </EntityContainer>
}
