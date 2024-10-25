"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  PlayCircle,
  Home,
  Library,
  History,
  Clock,
  Heart,
  Film,
  Tv,
  Video,
  BarChart2,
  Settings,
  CreditCard,
  User,
  Star,
  List,
} from "lucide-react";

interface NavSectionProps {
  title: string;
  routes: {
    label: string;
    href: string;
    icon: any;
    color?: string;
  }[];
  isCollapsed: boolean;
}

interface SidebarContentProps {
  isCollapsed: boolean;
  onCollapse: () => void;
  isMobile?: boolean;
}

export const mainRoutes = [
  { label: "Dashboard", href: "/", icon: Home, color: "text-blue-500" },
  {
    label: "Library",
    href: "/library",
    icon: Library,
    color: "text-indigo-500",
  },
];

export const libraryRoutes = [
  { label: "Movies", href: "/movies", icon: Film, color: "text-violet-500" },
  { label: "TV Series", href: "/series", icon: Tv, color: "text-purple-500" },
  {
    label: "Documentaries",
    href: "/documentaries",
    icon: Video,
    color: "text-fuchsia-500",
  },
];

export const contentRoutes = [
  {
    label: "Watch History",
    href: "/history",
    icon: History,
    color: "text-pink-500",
  },
  {
    label: "Watch Later",
    href: "/watch-later",
    icon: Clock,
    color: "text-rose-500",
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: Heart,
    color: "text-red-500",
  },
  { label: "Reviews", href: "/reviews", icon: Star, color: "text-orange-500" },
  {
    label: "Playlists",
    href: "/playlists",
    icon: List,
    color: "text-amber-500",
  },
];

export const insightRoutes = [
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart2,
    color: "text-emerald-500",
  },
];

export const subscriptionRoutes = [
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    color: "text-gray-400",
  },
  {
    label: "Billing",
    href: "/billing",
    icon: CreditCard,
    color: "text-emerald-400",
  },
  { label: "Profile", href: "/profile", icon: User, color: "text-blue-400" },
];

function NavSection({ title, routes, isCollapsed }: NavSectionProps) {
  const pathname = usePathname();

  if (routes.length === 0) return null;

  return (
    <div className="mb-4">
      {!isCollapsed && (
        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-400">
          {title}
        </h2>
      )}
      <div className="space-y-1">
        {routes.map((route) => (
          <Tooltip key={route.href} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={route.href}
                className={cn(
                  "text-sm group flex w-full items-center font-medium cursor-pointer",
                  "hover:text-white hover:bg-white/10 rounded-lg transition",
                  "px-3 h-10",
                  route.href === pathname
                    ? "text-white bg-white/10"
                    : "text-zinc-400",
                  isCollapsed && "justify-center"
                )}
              >
                <div
                  className={cn(
                    "flex items-center flex-1",
                    isCollapsed && "justify-center"
                  )}
                >
                  <route.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      route.color,
                      !isCollapsed && "mr-3"
                    )}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{route.label}</span>
                  )}
                </div>
              </Link>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="text-white bg-gray-800">
                {route.label}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "sticky top-0 h-screen border-r border-gray-800",
          isCollapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </aside>
    </TooltipProvider>
  );
}

function SidebarContent({
  isCollapsed,
  onCollapse,
  isMobile,
}: SidebarContentProps) {
  return (
    <div
      className={cn(
        "relative h-full bg-gray-900 text-white transition-all duration-300 flex flex-col",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {!isMobile && (
        <Button
          onClick={onCollapse}
          variant="ghost"
          className={cn(
            "absolute -right-4 top-7 h-7 w-7 rounded-full border bg-gray-800 p-0 hover:bg-gray-700",
            isCollapsed && "rotate-180"
          )}
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </Button>
      )}

      {/* Header */}
      <div className="px-4 py-6 flex-shrink-0">
        <Link
          href="/"
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "px-2",
            "h-8"
          )}
        >
          {isCollapsed ? (
            <PlayCircle className="h-8 w-8 text-blue-500" />
          ) : (
            <div className="flex items-center">
              <PlayCircle className="h-8 w-8 text-blue-500 mr-3" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
                StreamTracker
              </h1>
            </div>
          )}
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden hover:overflow-y-auto px-3">
        <div className="space-y-4">
          <NavSection
            title="Main"
            routes={mainRoutes}
            isCollapsed={isCollapsed}
          />
          <NavSection
            title="Library"
            routes={libraryRoutes}
            isCollapsed={isCollapsed}
          />
          <NavSection
            title="Content"
            routes={contentRoutes}
            isCollapsed={isCollapsed}
          />
          <NavSection
            title="Insights"
            routes={insightRoutes}
            isCollapsed={isCollapsed}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-800 px-3 pb-4">
        <div className="space-y-1">
          {subscriptionRoutes.map((route) => (
            <Tooltip key={route.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={route.href}
                  className={cn(
                    "text-sm group flex w-full items-center font-medium cursor-pointer",
                    "hover:text-white hover:bg-white/10 rounded-lg transition",
                    "px-3 h-10",
                    route.href === usePathname()
                      ? "text-white bg-white/10"
                      : "text-zinc-400",
                    isCollapsed && "justify-center"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center flex-1",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <route.icon
                      className={cn(
                        "h-5 w-5 flex-shrink-0",
                        route.color,
                        !isCollapsed && "mr-3"
                      )}
                    />
                    {!isCollapsed && (
                      <span className="truncate">{route.label}</span>
                    )}
                  </div>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="text-white bg-gray-800">
                  {route.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>
        {!isCollapsed && (
          <div className="mt-4">
            <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
              Upgrade to Pro
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
