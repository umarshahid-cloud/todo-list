import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { useTodosActions } from "@hooks/todo/useTodosActions";
import { ITask } from "@types";
import EditIcon from "@assets/editIcon";
import TrashIcon from "@assets/trashIcon";

interface TaskItemProps {
  task: ITask;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.text);

  const { toggleTask, deleteTask, editTask } = useTodosActions();

  const handleToggle = (): void => {
    toggleTask(task._id);
  };

  const handleDelete = (): void => {
    deleteTask(task._id);
  };

  const handleEdit = (): void => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = (): void => {
    if (editText.trim()) {
      editTask(task._id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = (): void => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditText(e.target.value);
  };

  return (
    <div className="bg-dark-card border border-dark-border p-4 flex justify-between items-center animate-fade-in">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={handleToggle}
          className={`w-8 h-8 border-2 border-lime-green rounded-full flex items-center justify-center transition-all cursor-pointer ${
            task.isComplete ? "bg-lime-green" : "bg-transparent"
          }`}
        ></button>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            autoFocus
            className="flex-1 max-w-xs bg-transparent border border-lime-green rounded px-3 py-2 text-white text-base outline-none focus:shadow-focus-lime transition-all"
          />
        ) : (
          <span
            className={`text-lg ${
              task.isComplete ? "line-through text-white" : "text-white"
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="m-3 w-8 h-8 border border-lime-green text-lime-green rounded-md flex items-center justify-center text-sm hover:bg-lime-green hover:bg-opacity-10 transition-colors cursor-pointer"
            >
              ✓
            </button>
            <button
              onClick={handleCancel}
              className="my-3 w-8 h-8 border border-red-light text-red-light rounded-md flex items-center justify-center text-sm hover:bg-red-light hover:bg-opacity-10 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>
              <EditIcon size={32} color="#C2B39A" />
            </button>

            <button onClick={handleDelete}>
              <TrashIcon size={32} color="#C2B39A" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
