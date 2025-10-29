"use client"

import { use } from "react"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"

// ... existing code with tripData ...

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const trip = tripData[id] || tripData["1"]

  // ... existing state and functions ...

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden">{/* ... existing hero content ... */}</div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">{/* ... existing content ... */}</main>

      <Footer />
    </div>
  )
}
