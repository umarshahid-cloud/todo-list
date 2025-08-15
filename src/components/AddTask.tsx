import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addTask } from "../store/todoSlice";

const AddTask: React.FC = () => {
  const [newTask, setNewTask] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleAddTask = (): void => {
    if (newTask.trim()) {
      dispatch(addTask(newTask.trim()));
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
        className="flex-1 bg-dark-card border border-dark-border rounded-lg px-4 py-4 text-white text-base outline-none placeholder:text-text-gray focus:border-lime-green focus:shadow-focus-lime transition-all duration-200"
      />
      <button
        onClick={handleAddTask}
        className="w-14 h-14 bg-lime-green hover:bg-lime-dark text-black text-4xl  rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95"
      >
        +
      </button>
    </div>
  );
};

export default AddTask;
