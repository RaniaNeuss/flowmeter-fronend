import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Projects } from "@/types/projects";
// import { cookies } from "next/headers";
// async function getProjectById(id: string): Promise<Projects> {
//     const sessionCookie = (await cookies()).get("connect.sid");
  
//     if (!sessionCookie) {
//       throw new Error("Session cookie not found");
//     }
  
//     const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `connect.sid=${sessionCookie.value}`,
//       },
//     });
  
//     if (!response.ok) {
//       throw new Error("Failed to fetch project");
//     }
  
//     const projectData: Projects = await response.json();
//     return projectData;
//   }
export function NavProjects({ projects }: { projects: Projects[] }) {
 

  const projectList = Array.isArray(projects) ? projects : [];



  return (
    <div>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="font-bold text-md">
          Views for Projects
          </SidebarGroupLabel>

        <SidebarMenu>
          {projectList.length > 0 ? (
            projectList.map((projects) => (
              <SidebarMenuItem key={projects.id}>
             
                <span
                  className="text-md font-semibold cursor-pointer"
                >
                </span>
                <div className="hidden">
                </div>{" "}
              </SidebarMenuItem>
            ))
          ) : (
            <SidebarMenuItem>No projects available</SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
