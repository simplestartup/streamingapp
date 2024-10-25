import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing - StreamTracker",
  description: "Manage your subscription and billing",
};

export default function BillingPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Billing</h1>
        <p className="text-gray-500">Manage your subscription and payments</p>
      </div>
      {/* Billing content will be added later */}
    </div>
  );
}