"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddContentDialog from "./add-content-dialog";
import { useState } from "react";

export default function DashboardHeader() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">StreamTracker</h1>
        <p className="text-gray-500">
          Keep track of your streaming entertainment
        </p>
      </div>

      <Button 
        onClick={() => setShowAddDialog(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Content
      </Button>

      <AddContentDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}