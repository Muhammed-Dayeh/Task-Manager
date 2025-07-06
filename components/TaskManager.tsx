'use client';

import { useState, useEffect } from 'react';
import { Plus, Moon, Sun, Filter } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { TaskFilters } from './TaskFilters';
import { Task, TaskPriority, TaskStatus } from '@/types/task';

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, setTheme } = useTheme();

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setShowTaskForm(false);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: task.status === 'completed' ? 'pending' : 'completed',
            updatedAt: new Date().toISOString()
          }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatusFilter = filter === 'all' || 
      (filter === 'active' && task.status !== 'completed') ||
      (filter === 'completed' && task.status === 'completed');
    
    const matchesPriorityFilter = priorityFilter === 'all' || task.priority === priorityFilter;
    
    const matchesSearchTerm = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatusFilter && matchesPriorityFilter && matchesSearchTerm;
  });

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => task.status !== 'completed').length,
    completed: tasks.filter(task => task.status === 'completed').length,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Task Manager
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Organize your tasks efficiently
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => setShowTaskForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Total Tasks
                  </p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {taskCounts.all}
                  </p>
                </div>
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                    Active Tasks
                  </p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                    {taskCounts.active}
                  </p>
                </div>
                <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-orange-500 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {taskCounts.completed}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <TaskFilters
          filter={filter}
          setFilter={setFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tasks</span>
            <Badge variant="secondary">{filteredTasks.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskComplete}
            onEdit={setEditingTask}
            onDelete={deleteTask}
          />
        </CardContent>
      </Card>

      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? 
            (updates) => updateTask(editingTask.id, updates) : 
            addTask
          }
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}