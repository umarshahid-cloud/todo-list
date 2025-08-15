import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./components/Header";
import StatusCard from "./components/StatusCard";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-dark-bg text-white p-6">
        <div className="w-full max-w-md mx-auto">
          <Header />
          <div className="space-y-6">
            <StatusCard />
            <AddTask />
            <TaskList />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
