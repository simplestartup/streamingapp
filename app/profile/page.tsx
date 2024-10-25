import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - StreamTracker",
  description: "Manage your profile settings",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
        <p className="text-gray-500">Manage your personal information</p>
      </div>
      {/* Profile content will be added later */}
    </div>
  );
}