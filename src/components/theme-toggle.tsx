"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  const themes = [
    {
      name: "Light",
      value: "light",
      icon: Sun,
      description: "Light mode for bright environments"
    },
    {
      name: "Dark",
      value: "dark",
      icon: Moon,
      description: "Dark mode for low-light environments"
    },
    {
      name: "System",
      value: "system",
      icon: Monitor,
      description: "Follow system preference"
    }
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[2];
  const CurrentIcon = currentTheme.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 px-0 hover-glow transition-all duration-300 hover:bg-accent/50"
              >
                <CurrentIcon className="h-4 w-4 transition-all duration-300 hover:scale-110" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent align="end" className="glass animate-scale-in">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = theme === themeOption.value;
              
              return (
                <DropdownMenuItem
                  key={themeOption.value}
                  onClick={() => setTheme(themeOption.value)}
                  className={`cursor-pointer transition-all duration-200 hover:bg-accent/50 ${
                    isActive ? \'bg-accent/30 text-accent-foreground\' : \'\'
                  }`}
                >
                  <Icon className={`mr-2 h-4 w-4 transition-all duration-200 ${
                    isActive ? \'text-primary\' : \'\'
                  }`} />
                  <div className="flex flex-col">
                    <span className="font-medium">{themeOption.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {themeOption.description}
                    </span>
                  </div>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>Change theme ({currentTheme.name})</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}