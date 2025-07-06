'use client';

import { useState } from 'react';
import { Edit2, Trash2, Calendar, Clock, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Task, TaskPriority } from '@/types/task';
import { format, isToday, isPast } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    return format(date, 'MMM d, yyyy');
  };

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'completed';

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${
        task.status === 'completed' ? 'opacity-75' : ''
      } ${isOverdue ? 'border-red-200 dark:border-red-800' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`mt-1 transition-colors duration-200 ${
              task.status === 'completed' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
            }`}
          >
            {task.status === 'completed' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-semibold ${
                task.status === 'completed' 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {task.title}
              </h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge variant="secondary" className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
            </div>

            <p className={`text-sm mb-3 ${
              task.status === 'completed' 
                ? 'line-through text-gray-400 dark:text-gray-500' 
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {task.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                {task.dueDate && (
                  <div className={`flex items-center ${
                    isOverdue ? 'text-red-600 dark:text-red-400' : ''
                  }`}>
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(task.dueDate)}
                    {isOverdue && <span className="ml-1 font-semibold">(Overdue)</span>}
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {format(new Date(task.createdAt), 'MMM d')}
                </div>
              </div>

              <div className={`flex items-center space-x-1 transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => confirm("Are you sure?") && onDelete(task.id)}

                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}