import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { useTodos } from "../hooks/useTodos";

const AddTask: React.FC = () => {
  const [newTask, setNewTask] = useState<string>("");
  const { addTask } = useTodos();

  const handleAddTask = (): void => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(e.target.value);
  };

  return (
    <div className="flex gap-3 animate-fade-in">
      <input
        type="text"
        placeholder="Write your next task"
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="flex-1 bg-add-task rounded-lg px-4 py-4 text-white text-base outline-none placeholder:text-text-gray"
      />
      <button
        onClick={handleAddTask}
        className="w-14 h-14 bg-lime-green text-black text-4xl  rounded-lg flex items-center justify-center cursor-pointer"
      >
        +
      </button>
    </div>
  );
};

export default AddTask;
