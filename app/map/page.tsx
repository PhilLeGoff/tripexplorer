"use client"

import { useState } from "react"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import { MapView } from "./components/MapView"
import { MapFilters } from "./components/MapFilters"
import { AttractionsList } from "./components/AttractionsList"
import { Button } from "@/components/ui/button"
import { Map, List } from "lucide-react"

export default function MapPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [maxPrice, setMaxPrice] = useState(200)
  const [viewMode, setViewMode] = useState<"map" | "split">("map")
  const [selectedAttractionId, setSelectedAttractionId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Page Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-balance text-3xl font-bold">Interactive Map</h1>
                <p className="text-pretty text-muted-foreground mt-1">Explore attractions on an interactive map</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4 mr-2" />
                  Map Only
                </Button>
                <Button
                  variant={viewMode === "split" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("split")}
                >
                  <List className="h-4 w-4 mr-2" />
                  Split View
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Filters */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Filters Sidebar */}
          <MapFilters
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
          />

          {/* Map View */}
          <div className={`flex-1 ${viewMode === "split" ? "lg:w-1/2" : "w-full"}`}>
            <MapView
              selectedCategories={selectedCategories}
              minRating={minRating}
              maxPrice={maxPrice}
              selectedAttractionId={selectedAttractionId}
              onAttractionSelect={setSelectedAttractionId}
            />
          </div>

          {/* List View (Split Mode) */}
          {viewMode === "split" && (
            <div className="lg:w-1/2 border-l">
              <AttractionsList
                selectedCategories={selectedCategories}
                minRating={minRating}
                maxPrice={maxPrice}
                selectedAttractionId={selectedAttractionId}
                onAttractionSelect={setSelectedAttractionId}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
