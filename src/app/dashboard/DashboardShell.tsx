// 'use client'

// import { useSearchParams } from 'next/navigation'
// import { ReactNode } from 'react'

// import { AppSidebar } from '@/components/app-sidebar'
// import {
//   SidebarInset,
//   SidebarTrigger,
// } from '@/components/ui/sidebar'
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb'
// import { Separator } from '@/components/ui/separator'

// export default function DashboardShell({ children }: { children: ReactNode }) {
//   const searchParams = useSearchParams()
//   const hideSidebar = searchParams?.get('sidebar') === 'false'

//   return (
//     <>
//       {!hideSidebar && <AppSidebar />}
//       <SidebarInset>
//         <header className="flex h-16 items-center gap-2 px-4">
//           {!hideSidebar && (
//             <>
//               <SidebarTrigger className="-ml-1" />
//               <Separator orientation="vertical" className="h-4 mx-2" />
//             </>
//           )}
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbPage>Overview</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </header>

//         <div className="flex flex-1 flex-col gap-6 p-4 pt-0">{children}</div>
//       </SidebarInset>
//     </>
//   )
// }
