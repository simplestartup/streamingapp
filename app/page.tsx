import { Metadata } from "next";
import dynamic from 'next/dynamic';
import DashboardHeader from "@/components/dashboard/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentGrid = dynamic(() => import("@/components/dashboard/content-grid"), {
  ssr: false
});

const Analytics = dynamic(() => import("@/components/dashboard/analytics"), {
  ssr: false
});

export const metadata: Metadata = {
  title: "StreamTracker - Your Personal Streaming Dashboard",
  description: "Track and manage your streaming content across all platforms",
};

export default function HomePage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <DashboardHeader />
      
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full max-w-[600px] grid-cols-4 mx-auto bg-gray-100">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="series">TV Series</TabsTrigger>
          <TabsTrigger value="docs">Documentaries</TabsTrigger>
        </TabsList>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <TabsContent value="all" className="mt-0">
            <ContentGrid />
          </TabsContent>
          <TabsContent value="movies" className="mt-0">
            <ContentGrid type="movie" />
          </TabsContent>
          <TabsContent value="series" className="mt-0">
            <ContentGrid type="series" />
          </TabsContent>
          <TabsContent value="docs" className="mt-0">
            <ContentGrid type="documentary" />
          </TabsContent>

          <div className="space-y-6">
            <Analytics />
          </div>
        </div>
      </Tabs>
    </div>
  );
}