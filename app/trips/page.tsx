"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import { Plus, Calendar, MapPin, DollarSign, Share2, Download } from "lucide-react"

// Mock trip data
const mockTrips = [
  {
    id: "1",
    name: "NYC Weekend Adventure",
    description: "A perfect weekend exploring the best of New York City",
    startDate: "2025-03-15",
    endDate: "2025-03-17",
    budget: 500,
    status: "upcoming",
    image: "/times-square-night.png",
    attractions: [
      {
        id: "1",
        name: "Statue of Liberty",
        price: 25,
        duration: "3-4 hours",
        date: "2025-03-15",
        time: "9:00 AM",
      },
      {
        id: "4",
        name: "Times Square",
        price: 0,
        duration: "1-2 hours",
        date: "2025-03-15",
        time: "6:00 PM",
      },
      {
        id: "2",
        name: "Central Park",
        price: 0,
        duration: "2-3 hours",
        date: "2025-03-16",
        time: "10:00 AM",
      },
    ],
  },
  {
    id: "2",
    name: "Cultural NYC Experience",
    description: "Museums, galleries, and cultural landmarks",
    startDate: "2025-04-10",
    endDate: "2025-04-12",
    budget: 350,
    status: "upcoming",
    image: "/metropolitan-museum-art.jpg",
    attractions: [
      {
        id: "3",
        name: "Metropolitan Museum of Art",
        price: 30,
        duration: "3-5 hours",
        date: "2025-04-10",
        time: "10:00 AM",
      },
      {
        id: "7",
        name: "9/11 Memorial & Museum",
        price: 33,
        duration: "2-3 hours",
        date: "2025-04-11",
        time: "2:00 PM",
      },
    ],
  },
]

export default function TripsPage() {
  const [trips, setTrips] = useState(mockTrips)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTripName, setNewTripName] = useState("")
  const [newTripDescription, setNewTripDescription] = useState("")

  const calculateTripTotal = (trip: (typeof mockTrips)[0]) => {
    return trip.attractions.reduce((sum, attraction) => sum + attraction.price, 0)
  }

  const calculateTripDuration = (trip: (typeof mockTrips)[0]) => {
    const start = new Date(trip.startDate)
    const end = new Date(trip.endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return days
  }

  const handleCreateTrip = () => {
    if (newTripName.trim()) {
      const newTrip = {
        id: String(trips.length + 1),
        name: newTripName,
        description: newTripDescription,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
        budget: 0,
        status: "upcoming" as const,
        image: "/placeholder.svg?height=400&width=600",
        attractions: [],
      }
      setTrips([...trips, newTrip])
      setNewTripName("")
      setNewTripDescription("")
      setIsCreateDialogOpen(false)
    }
  }

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips.filter((trip) => trip.id !== tripId))
  }

  const upcomingTrips = trips.filter((trip) => trip.status === "upcoming")
  const pastTrips = trips.filter((trip) => trip.status === "past")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-balance text-3xl font-bold md:text-4xl">My Trips</h1>
            <p className="text-pretty text-muted-foreground mt-2">Plan and manage your travel adventures</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Create New Trip
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Trip</DialogTitle>
                <DialogDescription>Start planning your next adventure by creating a new trip.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="trip-name">Trip Name</Label>
                  <Input
                    id="trip-name"
                    placeholder="e.g., Summer Vacation 2025"
                    value={newTripName}
                    onChange={(e) => setNewTripName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trip-description">Description (Optional)</Label>
                  <Input
                    id="trip-description"
                    placeholder="Brief description of your trip"
                    value={newTripDescription}
                    onChange={(e) => setNewTripDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTrip}>Create Trip</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcomingTrips.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastTrips.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingTrips.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingTrips.map((trip) => (
                  <Card key={trip.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={trip.image || "/placeholder.svg"}
                            alt={trip.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </AspectRatio>
                        <Badge className="absolute left-3 top-3" variant="secondary">
                          {calculateTripDuration(trip)} days
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4">
                      <div>
                        <CardTitle className="text-balance leading-tight">{trip.name}</CardTitle>
                        <CardDescription className="text-pretty mt-1">{trip.description}</CardDescription>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(trip.startDate).toLocaleDateString()} -{" "}
                            {new Date(trip.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{trip.attractions.length} attractions</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            ${calculateTripTotal(trip)} / ${trip.budget} budget
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {trip.attractions.slice(0, 3).map((attraction) => (
                          <Badge key={attraction.id} variant="outline" className="text-xs">
                            {attraction.name}
                          </Badge>
                        ))}
                        {trip.attractions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{trip.attractions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2 p-4 pt-0">
                      <Button className="flex-1" asChild>
                        <Link href={`/trips/${trip.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No upcoming trips</h3>
                <p className="text-muted-foreground mb-6">Start planning your next adventure by creating a new trip.</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Trip
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastTrips.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastTrips.map((trip) => (
                  <Card
                    key={trip.id}
                    className="group overflow-hidden opacity-75 transition-all hover:opacity-100 hover:shadow-lg"
                  >
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={trip.image || "/placeholder.svg"}
                            alt={trip.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </AspectRatio>
                        <Badge className="absolute left-3 top-3" variant="secondary">
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4">
                      <div>
                        <CardTitle className="text-balance leading-tight">{trip.name}</CardTitle>
                        <CardDescription className="text-pretty mt-1">{trip.description}</CardDescription>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(trip.startDate).toLocaleDateString()} -{" "}
                            {new Date(trip.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{trip.attractions.length} attractions visited</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2 p-4 pt-0">
                      <Button variant="outline" className="flex-1 bg-transparent" asChild>
                        <Link href={`/trips/${trip.id}`}>View Memories</Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No past trips</h3>
                <p className="text-muted-foreground">Your completed trips will appear here.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
