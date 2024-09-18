import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useProjects, useUpdateProject } from "@/integrations/supabase";

const AllProjects = () => {
  const { data: projects, isLoading, isError } = useProjects();
  const updateProject = useUpdateProject();
  const [columns, setColumns] = useState({
    "To Do": [],
    "In Progress": [],
    "Done": [],
  });

  useEffect(() => {
    if (projects) {
      const newColumns = {
        "To Do": [],
        "In Progress": [],
        "Done": [],
      };
      projects.forEach((project) => {
        if (newColumns[project.status]) {
          newColumns[project.status].push(project);
        } else {
          newColumns["To Do"].push(project);
        }
      });
      setColumns(newColumns);
    }
  }, [projects]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const project = sourceColumn.find((p) => p.id.toString() === draggableId);

    sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, project);

    const newColumns = {
      ...columns,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    };

    setColumns(newColumns);

    // Update project status in Supabase
    updateProject.mutate({
      id: project.id,
      status: destination.droppableId,
    });
  };

  if (isLoading) return <div>Loading projects...</div>;
  if (isError) return <div>Error loading projects</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Projects</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([status, projectList]) => (
            <div key={status} className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{status}</h2>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {projectList.map((project, index) => (
                      <Draggable
                        key={project.id}
                        draggableId={project.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Link to={`/project/${project.id}`}>
                              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardHeader>
                                  <CardTitle>{project.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-500">
                                    {project.description}
                                  </p>
                                </CardContent>
                              </Card>
                            </Link>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default AllProjects;
