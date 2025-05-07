import { Projects } from "@/types/projects";
import { cookies } from "next/headers";

export async function getProjects(): Promise<Projects[]> {
    const sessionCookie = (await cookies()).get("connect.sid");
  
    if (!sessionCookie) {
      throw new Error("Session cookie not found");
    }
  
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/getprojects`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `connect.sid=${sessionCookie.value}`,
        },
      }
    );
  
    if (!response.ok && response.status === 401) {
      throw new Error("Not authenticated");
    }
  
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
  
    const projects = await response.json();
    // console.log("Fetched Projects:", projects);
  
    return projects;
  }