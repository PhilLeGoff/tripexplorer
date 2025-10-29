"use client"

import { useState, useEffect } from "react"
import { AttractionCard } from "@/app/home/components/AttractionCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Grid3x3, List, MapPin } from "lucide-react"

// Mock data - same as home page
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

interface SearchResultsProps {
  query: string
  category: string
  minRating: string
  maxPrice: string
}

export function SearchResults({ query, category, minRating, maxPrice }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [isLoading, setIsLoading] = useState(false)

  // Simulate filtering based on search params
  const filteredAttractions = mockAttractions.filter((attraction) => {
    // Filter by search query
    if (
      query &&
      !attraction.name.toLowerCase().includes(query.toLowerCase()) &&
      !attraction.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return false
    }

    // Filter by category
    if (category) {
      const categories = category.split(",")
      const categoryMap: Record<string, string> = {
        museums: "Museums & Galleries",
        landmarks: "Landmarks",
        parks: "Parks & Nature",
        entertainment: "Entertainment",
        food: "Food & Dining",
        shopping: "Shopping",
        nightlife: "Nightlife",
        tours: "Tours & Activities",
      }
      const matchesCategory = categories.some((cat) => categoryMap[cat] === attraction.category)
      if (!matchesCategory) return false
    }

    // Filter by rating
    if (minRating && attraction.rating < Number.parseFloat(minRating)) {
      return false
    }

    // Filter by price
    if (maxPrice && attraction.price > Number.parseInt(maxPrice)) {
      return false
    }

    return true
  })

  // Sort attractions
  const sortedAttractions = [...filteredAttractions].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [query, category, minRating, maxPrice])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-9 w-48" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {sortedAttractions.length} {sortedAttractions.length === 1 ? "Result" : "Results"}
          </h2>
          {query && <p className="text-sm text-muted-foreground mt-1">Showing attractions matching "{query}"</p>}
        </div>
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviewed</SelectItem>
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

      {/* Results Grid/List */}
      {sortedAttractions.length > 0 ? (
        <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4"}>
          {sortedAttractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <MapPin className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No attractions found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            We couldn't find any attractions matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <Button variant="outline" onClick={() => (window.location.href = "/search")}>
            Clear all filters
          </Button>
        </div>
      )}

      {/* Map View Toggle */}
      {sortedAttractions.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" size="lg">
            <MapPin className="mr-2 h-4 w-4" />
            View on Map
          </Button>
        </div>
      )}
    </div>
  )
}
