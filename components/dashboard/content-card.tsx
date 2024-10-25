"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Star, Clock, Check, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useContentStore } from "@/lib/content-store";
import { toast } from "sonner";

const platformColors = {
  netflix: "bg-red-500",
  prime: "bg-blue-500",
  apple: "bg-gray-500",
  hbo: "bg-purple-500",
  disney: "bg-blue-600",
  theaters: "bg-amber-500",
};

interface ContentCardProps {
  content: {
    id: string;
    title: string;
    type: string;
    platform: keyof typeof platformColors;
    genre: string[];
    releaseDate: string;
    watched: boolean;
    rating: number | null;
    image: string;
  };
}

export default function ContentCard({ content }: ContentCardProps) {
  const { updateContent, removeContent } = useContentStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleWatchedToggle = () => {
    updateContent(content.id, { watched: !content.watched });
  };

  const handleRating = (value: number) => {
    updateContent(content.id, {
      rating: content.rating === value ? null : value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    removeContent(content.id);
    setIsDeleting(false);
    toast.success("Content removed successfully");
  };

  const handleSave = () => {
    updateContent(content.id, editedContent);
    setIsEditing(false);
    toast.success("Changes saved successfully");
  };

  return (
    <>
      <Card className="overflow-hidden group bg-white">
        <div className="relative aspect-auto">
          <img
            src={content.image}
            alt={content.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleWatchedToggle}>
              {content.watched ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Clock className="mr-2 h-4 w-4" />
              )}
              {content.watched ? "Watched" : "Watch Later"}
            </Button>
            <Button variant="secondary" size="sm" onClick={handleEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold line-clamp-1 text-gray-900">
              {content.title}
            </h3>
            <Badge
              variant="secondary"
              className={cn("text-white", platformColors[content.platform])}
            >
              {content.platform}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {content.genre.map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="text-xs text-gray-700"
              >
                {genre}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-gray-600">
            {format(new Date(content.releaseDate), "MMM d, yyyy")}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    "h-4 w-4",
                    content.rating && star <= content.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  )}
                />
              </button>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedContent.title}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, title: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Platform</Label>
              <Select
                value={editedContent.platform}
                onValueChange={(value: any) =>
                  setEditedContent({ ...editedContent, platform: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="netflix">Netflix</SelectItem>
                  <SelectItem value="prime">Prime Video</SelectItem>
                  <SelectItem value="apple">Apple TV+</SelectItem>
                  <SelectItem value="hbo">HBO Max</SelectItem>
                  <SelectItem value="disney">Disney+</SelectItem>
                  <SelectItem value="theaters">In Theaters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Content</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-500">
              Are you sure you want to remove "{content.title}"? This action
              cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
