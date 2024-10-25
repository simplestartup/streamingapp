"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useContentStore } from "@/lib/content-store";

interface FormData {
  title: string;
  type: string;
  platform: string;
  releaseDate: Date | undefined;
  genres: string[];
}

const initialFormData: FormData = {
  title: "",
  type: "movie",
  platform: "",
  releaseDate: undefined,
  genres: []
};

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Family", "Fantasy", "Horror", "Mystery", "Romance",
  "Science Fiction", "Thriller", "War", "Western"
];

export default function AddContentDialog({ 
  open, 
  onOpenChange 
}: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { addContent } = useContentStore();

  const handleSubmit = () => {
    if (!formData.title || !formData.platform || !formData.releaseDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    addContent({
      title: formData.title,
      type: formData.type,
      platform: formData.platform,
      genre: formData.genres,
      releaseDate: formData.releaseDate.toISOString()
    });
    
    toast.success("Content added successfully!");
    setFormData(initialFormData);
    onOpenChange(false);
  };

  const resetAndClose = () => {
    setFormData(initialFormData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700">Title</Label>
            <Input 
              id="title" 
              placeholder="Enter title" 
              className="text-gray-900"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Type</Label>
            <RadioGroup 
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="movie" id="movie" />
                <Label htmlFor="movie" className="text-gray-700">Movie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="series" id="series" />
                <Label htmlFor="series" className="text-gray-700">Series</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="documentary" id="documentary" />
                <Label htmlFor="documentary" className="text-gray-700">Documentary</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Platform</Label>
            <Select
              value={formData.platform}
              onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
            >
              <SelectTrigger className="text-gray-900">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="netflix">Netflix</SelectItem>
                <SelectItem value="prime">Prime Video</SelectItem>
                <SelectItem value="apple">Apple TV+</SelectItem>
                <SelectItem value="hbo">HBO Max</SelectItem>
                <SelectItem value="disney">Disney+</SelectItem>
                <SelectItem value="theaters">In Theaters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Release Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.releaseDate && "text-gray-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.releaseDate ? format(formData.releaseDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white">
                <Calendar
                  mode="single"
                  selected={formData.releaseDate}
                  onSelect={(date) => setFormData(prev => ({ ...prev, releaseDate: date }))}
                  initialFocus
                  className="text-gray-900"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Genres</Label>
            <Select
              value={formData.genres[0]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, genres: [value] }))}
            >
              <SelectTrigger className="text-gray-900">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre.toLowerCase()}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Content</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}