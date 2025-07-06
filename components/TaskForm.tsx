'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Flag, Type, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task, TaskPriority, TaskStatus } from '@/types/task';
import { Translations } from '@/lib/i18n';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
  translations: Translations;
  rtl: boolean;
}

export function TaskForm({ task, onSubmit, onClose, translations: t, rtl }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'medium');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'pending');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = t.titleRequired;
    }
    
    if (!description.trim()) {
      newErrors.description = t.descriptionRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{task ? t.editTask : t.addNewTask}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center space-x-2 rtl:space-x-reverse">
                <Type className="h-4 w-4" />
                <span>{t.title}</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.enterTaskTitle}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center space-x-2 rtl:space-x-reverse">
                <AlignLeft className="h-4 w-4" />
                <span>{t.description}</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.enterTaskDescription}
                rows={3}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 rtl:space-x-reverse">
                <Flag className="h-4 w-4" />
                <span>{t.priority}</span>
              </Label>
              <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <span className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>{t.highPriority}</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>{t.mediumPriority}</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="low">
                    <span className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>{t.lowPriority}</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {task && (
              <div className="space-y-2">
                <Label>{t.status}</Label>
                <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">{t.pending}</SelectItem>
                    <SelectItem value="in-progress">{t.inProgress}</SelectItem>
                    <SelectItem value="completed">{t.completed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="flex items-center space-x-2 rtl:space-x-reverse">
                <Calendar className="h-4 w-4" />
                <span>{t.dueDateOptional}</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="flex space-x-2 rtl:space-x-reverse pt-4">
              <Button type="submit" className="flex-1">
                {task ? t.updateTask : t.addTask}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                {t.cancel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}