import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - StreamTracker",
  description: "Manage your account settings",
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account preferences</p>
      </div>
      {/* Settings content will be added later */}
    </div>
  );
}