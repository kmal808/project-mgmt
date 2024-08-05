import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Project Manager</h1>
        <p className="text-xl text-gray-600 mb-8">Manage your projects and tasks efficiently</p>
        <div className="space-x-4">
          <Link to="/projects">
            <Button variant="outline">View All Projects</Button>
          </Link>
          <Link to="/create-project">
            <Button>Create New Project</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
