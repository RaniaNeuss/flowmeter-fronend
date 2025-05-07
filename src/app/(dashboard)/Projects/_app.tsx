// "use client"; // Mark this as a Client Component
// import { usePathname } from "next/navigation";
// import ProjectLayout from "@/app/(dashboard)/Projects/Logout";
// import ViewLayout from "@/app/(dashboard)/Projects/[ProjectId]/edit/[viewId]/layout";

// export default function MyApp({ Component, pageProps }) {
//   const pathname = usePathname();

//   // Log the current pathname
//   console.log("Current pathname:", pathname);

//   // Check if the route is under /project/[projectId]/edit
//   const isViewRoute = pathname?.startsWith("/project/") && pathname?.includes("/edit");

//   // Use ViewLayout for /project/[projectId]/edit, otherwise use ProjectLayout
//   const Layout = isViewRoute ? ViewLayout : ProjectLayout;

//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }