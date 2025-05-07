import {
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Projects } from "@/types/projects";
import AddProject from "../../../app/components/projects/AddProject";
import { GetProject } from "../../../app/components/projects/GetProject";
type NavMainPrpos = {
  projects :Projects[]
};
export function NavMain({projects} :NavMainPrpos) {


  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <AddProject   />

      <SidebarMenu>
        <GetProject projects={projects} />
      </SidebarMenu>
    </SidebarGroup>
  );
}
