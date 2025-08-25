import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import Header from "@src/ui/Header";
import StatusCard from "@src/ui/SummaryCard";
import AddTask from "@src/ui/AddTask";
import TaskList from "@src/ui/TaskList";
import { useTodosActions } from "@src/hooks/todo/useTodosActions";
import AppToastContainer from "@src/ui/components/AppToastContainer";

const App: React.FC = () => {
  const { fetchTodos } = useTodosActions();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-dark-bg text-white p-6">
      <div className="w-full max-w-md mx-auto">
        <Header />
        <div className="space-y-6">
          <StatusCard />
          <AddTask />
          <TaskList />
        </div>
      </div>

      <AppToastContainer />
    </div>
  );
};

export default App;
