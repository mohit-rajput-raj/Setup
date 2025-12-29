import { useQueryStates } from 'nuqs'
import React from 'react'
import { workflowParams } from '../params'



export const UseWorkFlowParams = () => {
    return useQueryStates(workflowParams)
  
}

