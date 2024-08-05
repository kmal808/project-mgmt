import { Home, FolderPlus, LayoutGrid } from "lucide-react";
import Index from "./pages/Index.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "All Projects",
    to: "/projects",
    icon: <LayoutGrid className="h-4 w-4" />,
    page: <AllProjects />,
  },
  {
    title: "Create Project",
    to: "/create-project",
    icon: <FolderPlus className="h-4 w-4" />,
    page: <CreateProject />,
  },
];

export const additionalRoutes = [
  {
    to: "/project/:id",
    page: <ProjectPage />,
  },
];
