"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ContentCard from "./content-card";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useContentStore } from "@/lib/content-store";

interface ContentGridProps {
  type?: string;
  filter?: "favorites" | "watchLater" | "history" | "rated";
}

export default function ContentGrid({ type, filter }: ContentGridProps) {
  const [search, setSearch] = useState("");
  const { items } = useContentStore();

  const filteredItems = items
    .filter((item) => !type || item.type === type)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.genre.some((g) => g.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((item) => {
      if (!filter) return true;
      switch (filter) {
        case "favorites":
          return item.rating === 5;
        case "watchLater":
          return !item.watched;
        case "history":
          return item.watched;
        case "rated":
          return item.rating !== null;
        default:
          return true;
      }
    });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    // Update items order in store if needed
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search by title or genre..."
          className="pl-10 bg-white text-gray-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="content">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ContentCard
                        content={
                          item as {
                            id: string;
                            title: string;
                            type: string;
                            platform:
                              | "netflix"
                              | "prime"
                              | "apple"
                              | "hbo"
                              | "disney"
                              | "theaters";
                            genre: string[];
                            releaseDate: string;
                            watched: boolean;
                            rating: number | null;
                            image: string;
                          }
                        }
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
