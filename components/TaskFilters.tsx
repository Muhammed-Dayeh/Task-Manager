'use client';

import { Search, Filter, Flag, CheckCircle, Circle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { TaskPriority } from '@/types/task';

interface TaskFiltersProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  priorityFilter: TaskPriority | 'all';
  setPriorityFilter: (priority: TaskPriority | 'all') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function TaskFilters({
  filter,
  setFilter,
  priorityFilter,
  setPriorityFilter,
  searchTerm,
  setSearchTerm,
}: TaskFiltersProps) {
  const filterButtons = [
    { key: 'all', label: 'All Tasks', icon: Filter },
    { key: 'active', label: 'Active', icon: Circle },
    { key: 'completed', label: 'Completed', icon: CheckCircle },
  ] as const;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterButtons.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={filter === key ? 'default' : 'outline'}
                onClick={() => setFilter(key)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            ))}
          </div>

          <div className="min-w-[140px]">
            <Select
              value={priorityFilter}
              onValueChange={(value: TaskPriority | 'all') => setPriorityFilter(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span className="flex items-center">
                    <Flag className="h-3 w-3 mr-2" />
                    All Priorities
                  </span>
                </SelectItem>
                <SelectItem value="high">
                  <span className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    High Priority
                  </span>
                </SelectItem>
                <SelectItem value="medium">
                  <span className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                    Medium Priority
                  </span>
                </SelectItem>
                <SelectItem value="low">
                  <span className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                    Low Priority
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}