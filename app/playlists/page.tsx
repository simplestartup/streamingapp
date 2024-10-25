import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playlists - StreamTracker",
  description: "Your custom playlists",
};

export default function PlaylistsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Playlists</h1>
        <p className="text-gray-500">Your custom collections</p>
      </div>
    </div>
  );
}