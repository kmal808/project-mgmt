import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState({
    id,
    name: "Sample Project",
    description: "This is a sample project description.",
    tasks: [
      { id: 1, name: "Task 1", status: "In Progress" },
      { id: 2, name: "Task 2", status: "To Do" },
    ],
    photos: [],
    tags: ["web", "design"],
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });

  const [newTask, setNewTask] = useState("");
  const [newTag, setNewTag] = useState("");

  const onDrop = (acceptedFiles) => {
    setProject((prev) => ({
      ...prev,
      photos: [...prev.photos, ...acceptedFiles.map((file) => URL.createObjectURL(file))],
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const addTask = () => {
    if (newTask.trim()) {
      setProject((prev) => ({
        ...prev,
        tasks: [...prev.tasks, { id: Date.now(), name: newTask, status: "To Do" }],
      }));
      setNewTask("");
    }
  };

  const addTag = () => {
    if (newTag.trim() && !project.tags.includes(newTag.trim())) {
      setProject((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setProject((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={project.description}
              onChange={(e) => setProject((prev) => ({ ...prev, description: e.target.value }))}
              className="mb-4"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add new tag"
              />
              <Button onClick={addTag}>Add Tag</Button>
            </div>
            <div className="flex gap-4">
              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(project.startDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={project.startDate}
                      onSelect={(date) => setProject((prev) => ({ ...prev, startDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(project.endDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={project.endDate}
                      onSelect={(date) => setProject((prev) => ({ ...prev, endDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {project.tasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center">
                  <span>{task.name}</span>
                  <Badge>{task.status}</Badge>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
              />
              <Button onClick={addTask}>Add Task</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Photo Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer">
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {project.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Project photo ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.tasks.map((task, index) => (
                <div key={task.id} className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    {index < project.tasks.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
                  </div>
                  <div>
                    <h3 className="font-semibold">{task.name}</h3>
                    <p className="text-sm text-gray-500">{task.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectPage;
