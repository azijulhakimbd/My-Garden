"use client";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@teispace/next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      {" "}
      <DropdownMenuTrigger
        className="relative flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white/70 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
        aria-label="Change theme"
      >
        {" "}
        <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />{" "}
        <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />{" "}
        <span className="sr-only">Change theme</span>{" "}
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent align="end" className="w-36">
        {" "}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {" "}
          <Sun className="mr-2 size-4" /> Light{" "}
        </DropdownMenuItem>{" "}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {" "}
          <Moon className="mr-2 size-4" /> Dark{" "}
        </DropdownMenuItem>{" "}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {" "}
          <Monitor className="mr-2 size-4" /> System{" "}
        </DropdownMenuItem>{" "}
      </DropdownMenuContent>{" "}
    </DropdownMenu>
  );
}
