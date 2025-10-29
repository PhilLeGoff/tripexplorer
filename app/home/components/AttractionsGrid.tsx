"use client"

import { useState } from "react"
import { AttractionCard } from "./AttractionCard"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3x3, List } from "lucide-react"

// Mock data for attractions
const mockAttractions = [
  {
    id: "1",
    name: "Statue of Liberty",
    description: "Iconic symbol of freedom and democracy, offering stunning views of NYC",
    category: "Landmarks",
    rating: 4.8,
    reviews: 12453,
    price: 25,
    duration: "3-4 hours",
    image: "/statue-of-liberty.png",
    featured: true,
  },
  {
    id: "2",
    name: "Central Park",
    description: "Urban oasis with walking paths, lakes, and recreational activities",
    category: "Parks & Nature",
    rating: 4.9,
    reviews: 8932,
    price: 0,
    duration: "2-6 hours",
    image: "/central-park-autumn.png",
    featured: true,
  },
  {
    id: "3",
    name: "Metropolitan Museum of Art",
    description: "World-renowned art museum with extensive collections spanning 5,000 years",
    category: "Museums & Galleries",
    rating: 4.7,
    reviews: 15678,
    price: 30,
    duration: "3-5 hours",
    image: "/metropolitan-museum-art.jpg",
    featured: false,
  },
  {
    id: "4",
    name: "Times Square",
    description: "Vibrant commercial intersection known for bright lights and Broadway theaters",
    category: "Entertainment",
    rating: 4.5,
    reviews: 9821,
    price: 0,
    duration: "1-2 hours",
    image: "/times-square-night.png",
    featured: true,
  },
  {
    id: "5",
    name: "Brooklyn Bridge",
    description: "Historic suspension bridge connecting Manhattan and Brooklyn",
    category: "Landmarks",
    rating: 4.8,
    reviews: 11234,
    price: 0,
    duration: "1-2 hours",
    image: "/brooklyn-bridge-cityscape.png",
    featured: false,
  },
  {
    id: "6",
    name: "Empire State Building",
    description: "Iconic Art Deco skyscraper with observation decks offering panoramic views",
    category: "Landmarks",
    rating: 4.6,
    reviews: 13567,
    price: 44,
    duration: "2-3 hours",
    image: "/empire-state-building.png",
    featured: true,
  },
  {
    id: "7",
    name: "9/11 Memorial & Museum",
    description: "Tribute to victims of September 11 attacks with reflecting pools and museum",
    category: "Museums & Galleries",
    rating: 4.9,
    reviews: 14892,
    price: 33,
    duration: "2-3 hours",
    image: "/911-memorial-museum.jpg",
    featured: false,
  },
  {
    id: "8",
    name: "Broadway Show",
    description: "World-class theater performances in the heart of Manhattan",
    category: "Entertainment",
    rating: 4.9,
    reviews: 7654,
    price: 120,
    duration: "2-3 hours",
    image: "/broadway-theater.png",
    featured: true,
  },
]

interface AttractionsGridProps {
  profile: string
  country: string
}

export function AttractionsGrid({ profile, country }: AttractionsGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")

  const featuredAttractions = mockAttractions.filter((a) => a.featured)
  const allAttractions = mockAttractions

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Showing {allAttractions.length} attractions</span>
        </div>
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden items-center gap-1 rounded-lg border p-1 sm:flex">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded p-1.5 transition-colors ${viewMode === "grid" ? "bg-muted" : "hover:bg-muted/50"}`}
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded p-1.5 transition-colors ${viewMode === "list" ? "bg-muted" : "hover:bg-muted/50"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs for Featured/All */}
      <Tabs defaultValue="featured" className="w-full">
        <TabsList>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="all">All Attractions</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="mt-6">
          <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4"}>
            {featuredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} viewMode={viewMode} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4"}>
            {allAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} viewMode={viewMode} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
