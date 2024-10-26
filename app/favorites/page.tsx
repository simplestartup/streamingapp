import { Metadata } from "next";
import dynamic from 'next/dynamic';

const ContentGrid = dynamic(() => import("@/components/dashboard/content-grid"), {
  ssr: false
});

export const metadata: Metadata = {
  title: "Favorites - StreamTracker",
  description: "View your favorite movies and shows",
};

export default function FavoritesPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Favorites</h1>
        <p className="text-gray-500">Your most loved movies and shows</p>
      </div>
      <ContentGrid filter="favorites" />
    </div>
  );
}