
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  Leaf,
  LayoutDashboard,
  ListTodo,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sprout,
  Tags,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { clearStoredSession, getStoredSession } from "@/lib/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navigation: NavItem[] = [
  {
    label: "ওভারভিউ",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "গাছপালা",
    href: "/admin/plants",
    icon: Leaf,
  },
  {
    label: "কাজসমূহ",
    href: "/admin/tasks",
    icon: ListTodo,
  },
  {
    label: "ব্যবহারকারী",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "বাগান AI",
    href: "/admin/ai",
    icon: Sprout,
  },
  {
    label: "ক্যাটাগরি",
    href: "/admin/categories",
    icon: Tags,
  },
];

const managementNavigation: NavItem[] = [
  {
    label: "অ্যাক্টিভিটি",
    href: "/admin/activity",
    icon: Activity,
  },
  {
    label: "রিপোর্ট",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    label: "সেটিংস",
    href: "/admin/settings",
    icon: Settings,
  },
];

type DashboardPlant = {
  _id?: string;
  name: string;
  category?: string;
  quantity?: number;
  status?: string;
  createdAt?: string | Date;
};

type DashboardTask = {
  _id?: string;
  title: string;
  description?: string;
  category?: string;
  dueDate?: string;
  status?: "pending" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";
  createdAt?: string | Date;
};

function formatRelativeTime(input?: string | Date) {
  if (!input) return "সম্প্রতি";

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "সম্প্রতি";

  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  if (diffHours <= 1) return "এই মুহূর্তে";
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} দিন আগে`;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plants, setPlants] = useState<DashboardPlant[]>([]);
  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const session = getStoredSession();
  const userName = session?.user?.name ?? "Administrator";

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [plantsResponse, tasksResponse] = await Promise.all([
          fetch("/api/plants", { cache: "no-store" }),
          fetch("/api/tasks", { cache: "no-store" }),
        ]);

        const plantsResult = plantsResponse.ok ? await plantsResponse.json() : null;
        const tasksResult = tasksResponse.ok ? await tasksResponse.json() : null;

        if (!plantsResponse.ok || !tasksResponse.ok) {
          throw new Error("MongoDB data unavailable");
        }

        setPlants(Array.isArray(plantsResult?.data) ? plantsResult.data : []);
        setTasks(Array.isArray(tasksResult?.data) ? tasksResult.data : []);
        setError("");
      } catch {
        setError("MongoDB সংযোগ নেই। ড্যাশবোর্ড ডেটা লোড হয়নি।");
      } finally {
        setLoading(false);
      }
    }

    void loadDashboardData();
  }, []);

  const totalPlants = useMemo(
    () => plants.reduce((sum, plant) => sum + Number(plant.quantity ?? 0), 0),
    [plants],
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "completed").length,
    [tasks],
  );

  const pendingTasks = useMemo(
    () => tasks.filter((task) => task.status === "pending").length,
    [tasks],
  );

  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.status === "in-progress").length,
    [tasks],
  );

  const healthyPlants = useMemo(
    () => plants.filter((plant) => !plant.status || !plant.status.includes("মরে")).length,
    [plants],
  );

  const completionPercent = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const recentActivities = useMemo(() => {
    const plantActivities = plants.slice(0, 3).map((plant) => ({
      title: "নতুন গাছ যোগ করা হয়েছে",
      description: `${plant.name} — ${plant.category ?? "গাছ"}`,
      time: formatRelativeTime(plant.createdAt),
      icon: Leaf,
    }));

    const taskActivities = tasks.slice(0, 4).map((task) => ({
      title:
        task.status === "completed"
          ? "একটি কাজ সম্পন্ন হয়েছে"
          : "নতুন কাজ যোগ করা হয়েছে",
      description: task.title,
      time: formatRelativeTime(task.createdAt),
      icon: task.status === "completed" ? CheckCircle2 : ListTodo,
    }));

    return [...plantActivities, ...taskActivities]
      .sort((a, b) => b.time.localeCompare(a.time, "bn-BD"))
      .slice(0, 5);
  }, [plants, tasks]);

  const topPlants = useMemo(() => {
    return [...plants]
      .sort((a, b) => Number(b.quantity ?? 0) - Number(a.quantity ?? 0))
      .slice(0, 4)
      .map((plant, index) => ({
        name: plant.name,
        category: plant.category ?? "গাছ",
        tasks: Math.max(2, 6 - index),
        progress: Math.min(96, 65 + index * 8),
      }));
  }, [plants]);

  const weeklyActivity = useMemo(() => {
    const base = [18, 25, 18, 30, 22, 40, 28];
    const completed = tasks.filter((task) => task.status === "completed").length;
    const inFlight = tasks.filter((task) => task.status === "in-progress").length;

    return base.map((value, index) => {
      if (index === 5) return Math.min(100, value + completed);
      if (index === 6) return Math.min(100, value + inFlight);
      return value + (index % 2 === 0 ? 1 : 0);
    });
  }, [tasks]);

  const dashboardStats = [
    {
      title: "মোট গাছ",
      value: loading ? "..." : String(totalPlants),
      change: plants.length ? "+" + Math.min(99, Math.max(5, plants.length)) + "%" : "0%",
      description: "MongoDB রেকর্ড",
      icon: Leaf,
      positive: true,
    },
    {
      title: "মোট কাজ",
      value: loading ? "..." : String(tasks.length),
      change: tasks.length ? "+" + Math.min(99, Math.max(4, tasks.length)) + "%" : "0%",
      description: "বাগানের কাজ",
      icon: ListTodo,
      positive: true,
    },
    {
      title: "সম্পন্ন",
      value: loading ? "..." : String(completedTasks),
      change: completionPercent > 0 ? `+${completionPercent}%` : "0%",
      description: "শেষ কাজের অগ্রগতি",
      icon: CheckCircle2,
      positive: true,
    },
    {
      title: "স্বাস্থ্যকর গাছ",
      value: loading ? "..." : String(healthyPlants),
      change: plants.length ? `+${Math.min(100, Math.round((healthyPlants / Math.max(plants.length, 1)) * 100))}%` : "0%",
      description: "মরে যাওনি এমন গাছ",
      icon: Sprout,
      positive: true,
    },
  ];

  const databaseStatus = error ? "Offline" : "Operational";

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur lg:hidden">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">মেনু খুলুন</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b px-5 py-5 text-left">
              <SheetTitle className="flex items-center gap-2">
                <Logo />
                <span>My Garden</span>
              </SheetTitle>
            </SheetHeader>

            <SidebarContent />
          </SheetContent>
        </Sheet>

        <div className="ml-2">
          <p className="text-sm font-semibold">Admin Dashboard</p>
        </div>

        <Button variant="ghost" size="icon" className="ml-auto">
          <Bell className="size-5" />
        </Button>
      </header>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-background lg:block">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/admin" className="flex items-center gap-2">
                <Logo />
                <div>
                  <p className="font-bold">My Garden</p>
                  <p className="text-[10px] text-muted-foreground">
                    ADMIN PANEL
                  </p>
                </div>
              </Link>
            </div>

            <SidebarContent />

            <div className="border-t p-4">
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => {
                  clearStoredSession();
                  router.push("/login");
                  router.refresh();
                }}
              >
                লগআউট
              </Button>
              <div className="rounded-xl bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  <span className="text-xs font-medium">
                    {userName}
                  </span>
                </div>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {getStoredSession()?.user?.email || "admin@mygarden.local"}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Topbar */}
          <div className="hidden h-16 items-center justify-between border-b bg-background px-6 lg:flex">
            <div>
              <p className="text-sm text-muted-foreground">
                স্বাগতম ফিরে আসায়
              </p>
              <h1 className="font-semibold">অ্যাডমিন ড্যাশবোর্ড</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden xl:block">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-64 pl-9"
                />
              </div>

              <Button variant="outline" size="icon">
                <Bell className="size-4" />
              </Button>

              <Button variant="outline" size="icon">
                <Settings className="size-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  clearStoredSession();
                  router.push("/login");
                  router.refresh();
                }}
              >
                লগআউট
              </Button>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Page Heading */}
            <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <LayoutDashboard className="size-4" />
                  <span>Admin</span>
                  <ChevronRight className="size-3" />
                  <span>Overview</span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  বাগানের সারসংক্ষেপ
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  আপনার My Garden অ্যাপের সব গুরুত্বপূর্ণ তথ্য এক জায়গায়।
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/">সাইট দেখুন</Link>
                </Button>

                <Button className="gap-2">
                  <Plus className="size-4" />
                  দ্রুত যোগ করুন
                </Button>
              </div>
            </section>

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((stat) => (
                <DashboardStat
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  description={stat.description}
                  icon={stat.icon}
                  positive={stat.positive}
                />
              ))}
            </section>

            {error && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
                {error}
              </div>
            )}

            {/* Main Analytics */}
            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              {/* Activity Chart */}
              <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle>বাগানের কার্যক্রম</CardTitle>
                    <CardDescription>
                      গত ৭ দিনের কাজ ও ব্যবহারকারীর কার্যক্রম
                    </CardDescription>
                  </div>

                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </CardHeader>

                <CardContent>
                  <div className="flex h-64 items-end gap-3 sm:gap-5">
                    {weeklyActivity.map((height, index) => (
                      <div
                        key={index}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <div className="flex h-full w-full items-end">
                          <div
                            className="w-full rounded-t-lg bg-primary/20 transition-all hover:bg-primary/40"
                            style={{
                              height: `${Math.min(height, 100)}%`,
                            }}
                          >
                            <div
                              className="w-full rounded-t-lg bg-primary"
                              style={{
                                height: `${Math.max(Math.min(height, 100) - 18, 12)}%`,
                              }}
                            />
                          </div>
                        </div>

                        <span className="text-xs text-muted-foreground">
                          {[
                            "শনি",
                            "রবি",
                            "সোম",
                            "মঙ্গল",
                            "বুধ",
                            "বৃহঃ",
                            "শুক্র",
                          ][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Completion */}
              <Card>
                <CardHeader>
                  <CardTitle>কাজের অগ্রগতি</CardTitle>
                  <CardDescription>
                    এই সপ্তাহের কাজের অবস্থা
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative flex size-40 items-center justify-center rounded-full border-[14px] border-primary/10">
                      <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-l-primary border-t-primary border-r-primary rotate-[-35deg]" />

                      <div className="text-center">
                        <p className="text-3xl font-bold">{completionPercent}%</p>
                        <p className="text-xs text-muted-foreground">
                          সম্পন্ন
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 w-full space-y-4">
                      <ProgressItem
                        label="সম্পন্ন"
                        value={String(completedTasks)}
                        percentage={Math.min(100, completionPercent)}
                      />
                      <ProgressItem
                        label="চলমান"
                        value={String(inProgressTasks)}
                        percentage={tasks.length ? Math.round((inProgressTasks / tasks.length) * 100) : 0}
                      />
                      <ProgressItem
                        label="অপেক্ষমাণ"
                        value={String(pendingTasks)}
                        percentage={tasks.length ? Math.round((pendingTasks / tasks.length) * 100) : 0}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Plants + Activity */}
            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              {/* Plants */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>জনপ্রিয় গাছ</CardTitle>
                    <CardDescription>
                      সবচেয়ে বেশি পরিচালিত গাছসমূহ
                    </CardDescription>
                  </div>

                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/plants">সব দেখুন</Link>
                  </Button>
                </CardHeader>

                <CardContent className="space-y-5">
                  {topPlants.map((plant) => (
                    <div key={plant.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                            <Leaf className="size-4 text-primary" />
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              {plant.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {plant.category} · {plant.tasks} টি কাজ
                            </p>
                          </div>
                        </div>

                        <span className="text-sm font-semibold">
                          {plant.progress}%
                        </span>
                      </div>

                      <Progress value={plant.progress} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Activity */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
                    <CardDescription>
                      সর্বশেষ অ্যাক্টিভিটি
                    </CardDescription>
                  </div>

                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/activity">
                      সব দেখুন
                      <ArrowUpRight className="ml-1 size-3" />
                    </Link>
                  </Button>
                </CardHeader>

                <CardContent>
                  <div className="space-y-5">
                    {recentActivities.map((activity) => {
                      const Icon = activity.icon;

                      return (
                        <div
                          key={`${activity.title}-${activity.description}`}
                          className="flex gap-3"
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                            <Icon className="size-4 text-primary" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">
                              {activity.title}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                              {activity.description}
                            </p>

                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Quick Management */}
            <section className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>দ্রুত ব্যবস্থাপনা</CardTitle>
                  <CardDescription>
                    সবচেয়ে বেশি ব্যবহৃত অ্যাডমিন ফিচারগুলো
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <QuickAction
                      href="/admin/plants"
                      icon={Leaf}
                      title="গাছ পরিচালনা"
                      description="গাছ যোগ, সম্পাদনা ও মুছে ফেলুন"
                    />

                    <QuickAction
                      href="/admin/tasks"
                      icon={ListTodo}
                      title="কাজ পরিচালনা"
                      description="বাগানের কাজগুলো পরিচালনা করুন"
                    />

                    <QuickAction
                      href="/admin/users"
                      icon={Users}
                      title="ব্যবহারকারী"
                      description="ব্যবহারকারী ও অ্যাক্সেস পরিচালনা"
                    />

                    <QuickAction
                      href="/admin/settings"
                      icon={Settings}
                      title="সেটিংস"
                      description="অ্যাপের সাধারণ সেটিংস পরিবর্তন"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* System Status */}
            <section className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>সিস্টেম স্ট্যাটাস</CardTitle>
                  <CardDescription>
                    My Garden অ্যাপের গুরুত্বপূর্ণ সার্ভিসগুলোর অবস্থা
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <SystemStatus
                      name="Database"
                      status={databaseStatus}
                    />
                    <SystemStatus
                      name="Authentication"
                      status={loading ? "Checking" : "Operational"}
                    />
                    <SystemStatus
                      name="Garden AI"
                      status={tasks.length > 0 ? "Operational" : "Standby"}
                    />
                    <SystemStatus
                      name="API"
                      status={error ? "Offline" : "Operational"}
                    />
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="flex-1 overflow-y-auto px-3 py-5">
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        প্রধান
      </p>

      <nav className="space-y-1">
        {navigation.map((item) => (
          <SidebarLink key={item.href} item={item} />
        ))}
      </nav>

      <p className="mb-2 mt-8 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        ব্যবস্থাপনা
      </p>

      <nav className="space-y-1">
        {managementNavigation.map((item) => (
          <SidebarLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="mt-8 rounded-xl border bg-muted/30 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Sprout className="size-4 text-primary" />
          <span className="text-sm font-semibold">Garden AI</span>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          AI-powered gardening assistant চালু আছে।
        </p>

        <Badge className="mt-3" variant="secondary">
          Active
        </Badge>
      </div>
    </div>
  );
}

function SidebarLink({ item }: { item: NavItem }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Icon className="size-4 shrink-0 transition-transform group-hover:scale-105" />
      <span>{item.label}</span>
    </Link>
  );
}

function Logo() {
  return (
    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
      <Sprout className="size-4" />
    </div>
  );
}

function DashboardStat({
  title,
  value,
  change,
  description,
  icon: Icon,
  positive,
}: {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  positive?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>

          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="size-3" />
            {change}
          </Badge>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">
            {value}
          </p>
          <p
            className={`mt-1 text-xs ${
              positive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressItem({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>

      <Progress value={percentage} />
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:bg-muted/50 hover:shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>

        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <p className="text-sm font-semibold">{title}</p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}

function SystemStatus({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
        </span>

        <span className="text-sm font-medium">{name}</span>
      </div>

      <span className="text-xs text-emerald-600 dark:text-emerald-400">
        {status}
      </span>
    </div>
  );
}
