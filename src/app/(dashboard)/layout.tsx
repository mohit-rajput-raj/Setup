
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './AppSidebar'
import { cookies } from 'next/headers'
import { SiteHeader } from './sitebar-header'

type Props = {}

const Layout =async ({children}:{children:React.ReactNode}) => {
   const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen} >
      <AppSidebar/>
        <SidebarInset>
<SiteHeader />
        {children}
        </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout