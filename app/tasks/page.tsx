
"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Droplets,
  Leaf,
  MoreHorizontal,
  Plus,
  Sprout,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type TaskStatus = "pending" | "in-progress" | "completed";
type TaskPriority = "low" | "medium" | "high";

type GardenTask = {
  id: number;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
};

const initialTasks: GardenTask[] = [
  {
    id: 1,
    title: "আম গাছে পানি দেওয়া",
    description: "সকালে আম গাছের গোড়ায় পর্যাপ্ত পানি দিতে হবে।",
    category: "পানি দেওয়া",
    dueDate: "আজ",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    title: "লেবু গাছের ডাল ছাঁটাই",
    description: "শুকনো ও অতিরিক্ত ডালগুলো ছেঁটে ফেলতে হবে।",
    category: "পরিচর্যা",
    dueDate: "আজ",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 3,
    title: "গাছে জৈব সার দেওয়া",
    description: "ফলজ গাছগুলোতে প্রয়োজন অনুযায়ী জৈব সার প্রয়োগ করতে হবে।",
    category: "সার প্রয়োগ",
    dueDate: "আগামীকাল",
    status: "pending",
    priority: "medium",
  },
  {
    id: 4,
    title: "টবের মাটি পরিবর্তন",
    description: "ফুলের টবগুলোর পুরোনো মাটি পরিবর্তন করতে হবে।",
    category: "মাটি",
    dueDate: "১২ অক্টোবর",
    status: "completed",
    priority: "low",
  },
];

const statusLabels: Record<TaskStatus, string> = {
  pending: "অপেক্ষমাণ",
  "in-progress": "চলমান",
  completed: "সম্পন্ন",
};

const priorityLabels: Record<TaskPriority, string> = {
  low: "কম",
  medium: "মাঝারি",
  high: "জরুরি",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<GardenTask[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");
  const [open, setOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "পরিচর্যা",
    dueDate: "আজ",
    priority: "medium" as TaskPriority,
  });

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;

    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "pending").length,
    progress: tasks.filter((task) => task.status === "in-progress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "completed" ? "pending" : "completed",
            }
          : task,
      ),
    );
  }

  function deleteTask(id: number) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function addTask() {
    if (!newTask.title.trim()) return;

    const task: GardenTask = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      dueDate: newTask.dueDate,
      status: "pending",
      priority: newTask.priority,
    };

    setTasks((current) => [task, ...current]);

    setNewTask({
      title: "",
      description: "",
      category: "পরিচর্যা",
      dueDate: "আজ",
      priority: "medium",
    });

    setOpen(false);
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Sprout className="size-4 text-green-600" />
                <span>আমার বাগান</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                বাগানের কাজ
              </h1>

              <p className="mt-2 text-muted-foreground">
                আপনার বাগানের দৈনন্দিন কাজগুলো সহজে পরিচালনা করুন।
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="size-4" />
                  নতুন কাজ
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>নতুন কাজ যোগ করুন</DialogTitle>
                  <DialogDescription>
                    আপনার বাগানের জন্য একটি নতুন কাজ তৈরি করুন।
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">কাজের নাম</Label>
                    <Input
                      id="title"
                      placeholder="যেমন: আম গাছে পানি দেওয়া"
                      value={newTask.title}
                      onChange={(event) =>
                        setNewTask({
                          ...newTask,
                          title: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">বিবরণ</Label>
                    <Textarea
                      id="description"
                      placeholder="কাজটি সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                      value={newTask.description}
                      onChange={(event) =>
                        setNewTask({
                          ...newTask,
                          description: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>ক্যাটাগরি</Label>
                      <Select
                        value={newTask.category}
                        onValueChange={(value) =>
                          setNewTask({
                            ...newTask,
                            category: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="পানি দেওয়া">
                            পানি দেওয়া
                          </SelectItem>
                          <SelectItem value="পরিচর্যা">
                            পরিচর্যা
                          </SelectItem>
                          <SelectItem value="সার প্রয়োগ">
                            সার প্রয়োগ
                          </SelectItem>
                          <SelectItem value="মাটি">মাটি</SelectItem>
                          <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>অগ্রাধিকার</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value: TaskPriority) =>
                          setNewTask({
                            ...newTask,
                            priority: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">কম</SelectItem>
                          <SelectItem value="medium">মাঝারি</SelectItem>
                          <SelectItem value="high">জরুরি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>সময়</Label>
                    <Select
                      value={newTask.dueDate}
                      onValueChange={(value) =>
                        setNewTask({
                          ...newTask,
                          dueDate: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="আজ">আজ</SelectItem>
                        <SelectItem value="আগামীকাল">আগামীকাল</SelectItem>
                        <SelectItem value="এই সপ্তাহে">
                          এই সপ্তাহে
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    বাতিল
                  </Button>
                  <Button onClick={addTask}>কাজ যোগ করুন</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="মোট কাজ"
            value={stats.total}
            icon={<Leaf className="size-5" />}
            description="সকল কাজ"
          />

          <StatCard
            title="অপেক্ষমাণ"
            value={stats.pending}
            icon={<Clock3 className="size-5" />}
            description="শুরু করা হয়নি"
          />

          <StatCard
            title="চলমান"
            value={stats.progress}
            icon={<Droplets className="size-5" />}
            description="এখন চলছে"
          />

          <StatCard
            title="সম্পন্ন"
            value={stats.completed}
            icon={<CheckCircle2 className="size-5" />}
            description="শেষ হয়েছে"
          />
        </section>

        {/* Filters */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              সব কাজ
            </FilterButton>

            <FilterButton
              active={filter === "pending"}
              onClick={() => setFilter("pending")}
            >
              অপেক্ষমাণ
            </FilterButton>

            <FilterButton
              active={filter === "in-progress"}
              onClick={() => setFilter("in-progress")}
            >
              চলমান
            </FilterButton>

            <FilterButton
              active={filter === "completed"}
              onClick={() => setFilter("completed")}
            >
              সম্পন্ন
            </FilterButton>
          </div>
        </section>

        {/* Tasks */}
        <section>
          {filteredTasks.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <CheckCircle2 className="size-8 text-muted-foreground" />
                </div>

                <h3 className="text-lg font-semibold">
                  কোনো কাজ পাওয়া যায়নি
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  এই ক্যাটাগরিতে বর্তমানে কোনো কাজ নেই।
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value}</p>
            <span className="text-xs text-muted-foreground">
              {description}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function TaskCard({
  task,
  onToggle,
  onDelete,
}: {
  task: GardenTask;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const priorityVariant =
    task.priority === "high"
      ? "destructive"
      : task.priority === "medium"
        ? "secondary"
        : "outline";

  return (
    <Card
      className={`transition-all ${
        task.status === "completed" ? "opacity-70" : ""
      }`}
    >
      <CardContent className="p-5">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onToggle}
            className="mt-1 shrink-0 text-muted-foreground transition-colors hover:text-primary"
            aria-label={
              task.status === "completed"
                ? "কাজটি অসম্পন্ন করুন"
                : "কাজটি সম্পন্ন করুন"
            }
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="size-6 text-green-600" />
            ) : (
              <Circle className="size-6" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3
                  className={`font-semibold ${
                    task.status === "completed"
                      ? "text-muted-foreground line-through"
                      : ""
                  }`}
                >
                  {task.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {task.description}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="hidden shrink-0 sm:flex"
                onClick={onDelete}
                aria-label="কাজ মুছে ফেলুন"
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{task.category}</Badge>

              <Badge variant={priorityVariant}>
                {priorityLabels[task.priority]}
              </Badge>

              <Badge
                variant={
                  task.status === "completed" ? "default" : "secondary"
                }
              >
                {statusLabels[task.status]}
              </Badge>

              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" />
                {task.dueDate}
              </span>

              <Button
                variant="ghost"
                size="sm"
                className="ml-auto gap-1 sm:hidden"
                onClick={onDelete}
              >
                <Trash2 className="size-3.5 text-destructive" />
                মুছুন
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
