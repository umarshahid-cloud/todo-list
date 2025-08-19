import React from "react";
import { useTodos } from "../hooks/useTodos";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = { task: string };

const schema = yup.object({
  task: yup
    .string()
    .trim()
    .required("Please enter a task")
    .min(1, "Task must not be empty"),
});

const AddTask: React.FC = () => {
  const { addTask } = useTodos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { task: "" },
  });

  const onSubmit = (values: FormValues) => {
    addTask(values.task.trim());
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-3 animate-fade-in"
    >
      <div className="flex-1">
        <input
          type="text"
          placeholder="Write your next task"
          {...register("task")}
          className={`w-full bg-add-task rounded-lg px-4 py-4 text-white text-base outline-none placeholder:text-text-gray
            ${
              errors.task
                ? "border border-red-500"
                : "border border-transparent"
            }`}
          // Hitting Enter will submit the form automatically
        />
        {errors.task && (
          <p className="mt-1 text-sm text-red-400">{errors.task.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-14 h-14 bg-lime-green text-black text-4xl rounded-lg flex items-center justify-center cursor-pointer disabled:opacity-70"
        aria-label="Add task"
      >
        +
      </button>
    </form>
  );
};

export default AddTask;
