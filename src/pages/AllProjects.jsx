import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AllProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    { id: 1, name: "Project A", status: "To Do" },
    { id: 2, name: "Project B", status: "In Progress" },
    { id: 3, name: "Project C", status: "Done" },
    { id: 4, name: "Project D", status: "To Do" },
    { id: 5, name: "Project E", status: "In Progress" },
  ]);

  const statuses = ["To Do", "In Progress", "Done"];

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div key={status} className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{status}</h2>
            <div className="space-y-4">
              {projects
                .filter((project) => project.status === status)
                .map((project) => (
                  <Card
                    key={project.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <CardHeader>
                      <CardTitle>{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Click to view details</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
