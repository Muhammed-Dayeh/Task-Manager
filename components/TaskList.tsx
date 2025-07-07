"use client";

import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";
import { Translations } from "@/lib/i18n";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  translations: Translations;
  rtl: boolean;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  translations: t,
  rtl,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {t.noTasksFound}
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          {t.createFirstTask}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          translations={t}
          rtl={rtl}
        />
      ))}
    </div>
  );
}
