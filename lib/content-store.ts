import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Content = {
  id: string;
  title: string;
  type: string;
  platform: string;
  genre: string[];
  releaseDate: string;
  watched: boolean;
  rating: number | null;
  image: string;
};

type ContentStore = {
  items: Content[];
  addContent: (content: Omit<Content, 'id' | 'watched' | 'rating' | 'image'>) => void;
  updateContent: (id: string, updates: Partial<Content>) => void;
  removeContent: (id: string) => void;
  getContentImage: (title: string, type: string) => string;
};

// Content posters mapping with normalized titles as keys
const contentPosters: Record<string, string> = {
  // Recent & Upcoming Movies
  "dune part two": "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  "poor things": "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
  "oppenheimer": "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  "barbie": "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
  "killers of the flower moon": "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
  "napoleon": "https://image.tmdb.org/t/p/w500/jE5o7y9K6pZtWNNMEw3IdpHuncR.jpg",
  "the batman": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  "everything everywhere all at once": "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",

  // Classic Movies
  "the matrix": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  "inception": "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
  "interstellar": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "pulp fiction": "https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg",
  "the godfather": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  "fight club": "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "goodfellas": "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
  "the shawshank redemption": "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  "forrest gump": "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  "the dark knight": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "jurassic park": "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
  "back to the future": "https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
  
  // Recent TV Series
  "true detective night country": "https://image.tmdb.org/t/p/w500/pB6rZt885qxdw00eXHj5bXhOSw6.jpg",
  "the last of us": "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
  "succession": "https://image.tmdb.org/t/p/w500/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg",
  "house of the dragon": "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
  "the bear": "https://image.tmdb.org/t/p/w500/r0yS0VyVYwYaGO3W9P3L9w3tIxU.jpg",
  "the white lotus": "https://image.tmdb.org/t/p/w500/cBxKZ9t2qhcXEWLe4Cn9Uqp7rR2.jpg",
  "wednesday": "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
  "andor": "https://image.tmdb.org/t/p/w500/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg",

  // Classic TV Series
  "breaking bad": "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  "game of thrones": "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
  "the wire": "https://image.tmdb.org/t/p/w500/4cMrKpqyGJFyZGpH6R3oRjjw3hi.jpg",
  "the sopranos": "https://image.tmdb.org/t/p/w500/6nqpp9JxMwXZ2aSwUvTkYElYi3m.jpg",
  "mad men": "https://image.tmdb.org/t/p/w500/7v6dX3BC9l47pJrWtrp2bbwquXa.jpg",
  "stranger things": "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
  "chernobyl": "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
  "band of brothers": "https://image.tmdb.org/t/p/w500/zReOJYste13Qq3T3B5OyXPWjv1O.jpg",
  
  // Documentaries
  "planet earth iii": "https://image.tmdb.org/t/p/w500/dJPNduFKQyoqJDxX6TbMPyxUeqB.jpg",
  "blue planet ii": "https://image.tmdb.org/t/p/w500/39nrZkLGgw3gKBtXNVtYRZX6OLj.jpg",
  "our planet": "https://image.tmdb.org/t/p/w500/wRSnArnQBmeUYb5GWDU595tGFD9.jpg",
  "the last dance": "https://image.tmdb.org/t/p/w500/oVf4xGGbCtwVHkKyx988J3GwPXs.jpg",
  "free solo": "https://image.tmdb.org/t/p/w500/7T2DhQaNFfEt6rKDqqBGt6wNDyH.jpg",
  "blackfish": "https://image.tmdb.org/t/p/w500/AdxgqXJ5rKvN6oNIgkJP3Q8uNCT.jpg",
  "march of the penguins": "https://image.tmdb.org/t/p/w500/ksxZQp0j3DrL4UPP2iQkRd1UvY1.jpg",
  "my octopus teacher": "https://image.tmdb.org/t/p/w500/uJhxgr1gZEXADwUSUM5znqQLyJy.jpg",
  "david attenborough a life on our planet": "https://image.tmdb.org/t/p/w500/zRIjRw12HgNuNB8T6mpS4gqj8kQ.jpg",
  "wont you be my neighbor": "https://image.tmdb.org/t/p/w500/fvX8S8aLBkqxVqPBsKVpV9qKo2E.jpg"
};

const fallbackImages = {
  movie: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1920&h=1080&fit=crop",
  series: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1920&h=1080&fit=crop",
  documentary: "https://images.unsplash.com/photo-1552800631-5fba77be42c8?q=80&w=1920&h=1080&fit=crop"
};

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[:\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s*\([^)]*\)/g, '');
}

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addContent: (content) => {
        const normalizedTitle = normalizeTitle(content.title);
        const image = get().getContentImage(normalizedTitle, content.type);
        
        set((state) => ({
          items: [...state.items, {
            ...content,
            id: uuidv4(),
            watched: false,
            rating: null,
            image
          }]
        }));
      },
      
      updateContent: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          )
        }));
      },
      
      removeContent: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
      },
      
      getContentImage: (title: string, type: string) => {
        const normalizedTitle = normalizeTitle(title);
        
        // Try exact match
        if (contentPosters[normalizedTitle]) {
          return contentPosters[normalizedTitle];
        }
        
        // Try partial matches
        const partialMatch = Object.entries(contentPosters).find(([key]) => 
          normalizedTitle.includes(key) || key.includes(normalizedTitle)
        );
        
        if (partialMatch) {
          return partialMatch[1];
        }
        
        // Fallback to type-based image
        return fallbackImages[type as keyof typeof fallbackImages] || fallbackImages.movie;
      }
    }),
    {
      name: 'content-store'
    }
  )
);