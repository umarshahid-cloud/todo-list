import React from "react";
import { useTodosActions } from "@hooks/todo/useTodosActions";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@ui/components/TextInput";
import Button from "@ui/components/Button";

type FormValues = { task: string };

const schema = yup.object({
  task: yup
    .string()
    .trim()
    .required("Please enter a task")
    .min(4, "Task must have 4 letters"),
});

const AddTask: React.FC = () => {
  const { addTask } = useTodosActions();

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
        <TextInput
          placeholder="Write your next task"
          registration={register("task", { required: "Task is required" })}
          error={errors.task}
        />
        {errors.task && (
          <p className="mt-1 text-sm text-red-400">{errors.task.message}</p>
        )}
      </div>
      <Button
        type="submit"
        label="+"
        ariaLabel="Add task"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default AddTask;
