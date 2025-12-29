'use client'
import { PAGINATION } from "@/config/constants";
import { log } from "console";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { set } from "zod";
interface UseEntitySearchProps<T extends { search: string; page: number }> {
  params: T;
  setParams: (params: T) => void;
  debounceMs?: number;
}

import  { createContext, useContext, useState } from "react";

type DummyContextType = {
  val: string;
  handelShow: (e: string) => void;
};

const DummyContext = createContext<DummyContextType | null>(null);

export const DummyProvider = ({ children }: { children: React.ReactNode }) => {
  const [val, setVal] = useState("");

  const handelShow = (e: string) => {
    
    setVal(e);
    toast.success("showbb  vbbb " + val);
  };

  return (
    <DummyContext.Provider value={{ val, handelShow }}>
      {children}
    </DummyContext.Provider>
  );
};

export const useDummy = () => {
  const ctx = useContext(DummyContext);
  if (!ctx) {
    throw new Error("useDummy must be used inside DummyProvider");
  }
  return ctx;
};

export function UseEntitySearch<T extends { search: string; page: number }>({
  params,
  setParams,
  debounceMs = 500,
}: UseEntitySearchProps<T>) {
  const [localSearch, setLocalSearch] = React.useState<string>(params.search);
  const [val , setval] = React.useState<string>("")
  const handelSHow = (e:string)=>{
    toast.success("showbb  " + e)
        setval(e)
    setLocalSearch((c)=> {
        console.log("i am inside haha");
        return e
    });
    console.log(val +" haha");
    
  }




//   useEffect(() => {
//     if (localSearch === "" && params.search !== "") {
//       setParams({ ...params, search: "", page: PAGINATION.DEFAULT_PAGE });
//       return;
//     }
//     const timer = setTimeout(() => {
//       if (localSearch !== params.search) {
//         setParams({
//           ...params,
//           search: localSearch,
//           page: PAGINATION.DEFAULT_PAGE,
//         });
//       }
//     }, debounceMs);
//     return () => clearTimeout(timer);
//   }, [localSearch, debounceMs, params, setParams]);
//   useEffect(() => {
//     setLocalSearch(params.search);
//   }, [params.search]);
  return {
     searchValue: localSearch, 
    onSearchChange: setLocalSearch ,
    handelSHow};
}
