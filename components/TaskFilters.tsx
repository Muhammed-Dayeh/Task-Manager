"use client";

import { Search, Filter, Flag, CheckCircle, Circle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { TaskPriority } from "@/types/task";
import { Translations } from "@/lib/i18n";

interface TaskFiltersProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  priorityFilter: TaskPriority | "all";
  setPriorityFilter: (priority: TaskPriority | "all") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  translations: Translations;
  rtl: boolean;
}

export function TaskFilters({
  filter,
  setFilter,
  priorityFilter,
  setPriorityFilter,
  searchTerm,
  setSearchTerm,
  translations: t,
  rtl,
}: TaskFiltersProps) {
  const filterButtons = [
    { key: "all", label: t.allTasks, icon: Filter },
    { key: "active", label: t.active, icon: Circle },
    { key: "completed", label: t.completed, icon: CheckCircle },
  ] as const;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${
                  rtl ? "right-3" : "left-3"
                }`}
              />
              <Input
                placeholder={t.searchTasks}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={rtl ? "pr-10" : "pl-10"}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterButtons.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                onClick={() => setFilter(key)}
                className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            ))}
          </div>

          <div className="min-w-[140px]">
            <Select
              value={priorityFilter}
              onValueChange={(value: TaskPriority | "all") =>
                setPriorityFilter(value)
              }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Flag className="h-3 w-3" />
                    <span>{t.allPriorities}</span>
                  </span>
                </SelectItem>
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
        </div>
      </CardContent>
    </Card>
  );
}
