"use client"

import { use } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import {
  Star,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  Users,
  Heart,
  Share2,
  Phone,
  Mail,
  ExternalLink,
  Check,
  Accessibility,
} from "lucide-react"

// Mock attraction data
const attractionData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Statue of Liberty",
    description: "Iconic symbol of freedom and democracy, offering stunning views of NYC",
    longDescription:
      "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor. Designed by French sculptor Frédéric Auguste Bartholdi and built by Gustave Eiffel, the statue was a gift from France to the United States. It has become one of the most recognizable symbols of freedom and democracy in the world.",
    category: "Landmarks",
    rating: 4.8,
    reviews: 12453,
    price: 25,
    duration: "3-4 hours",
    image: "/statue-of-liberty.png",
    address: "Liberty Island, New York, NY 10004",
    phone: "+1 (212) 363-3200",
    email: "info@statueofliberty.org",
    website: "https://www.nps.gov/stli",
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "9:00 AM - 5:00 PM",
    },
    features: ["Wheelchair accessible", "Audio guide available", "Gift shop", "Guided tours", "Photography allowed"],
    highlights: [
      "Crown access with advance reservation",
      "Pedestal observation deck",
      "Museum exhibits on immigration history",
      "Ferry ride with harbor views",
    ],
    tips: [
      "Book tickets in advance, especially for crown access",
      "Arrive early to avoid long security lines",
      "Wear comfortable shoes for climbing stairs",
      "Check weather conditions before visiting",
    ],
    gallery: [
      "/statue-of-liberty.png",
      "/placeholder.svg?key=wzh1q",
      "/placeholder.svg?key=kdm0j",
      "/placeholder.svg?key=tsiru",
    ],
  },
  "2": {
    id: "2",
    name: "Central Park",
    description: "Urban oasis with walking paths, lakes, and recreational activities",
    longDescription:
      "Central Park is an urban park in Manhattan, New York City. It is the fifth-largest park in the city, covering 843 acres. The park is a popular destination for both tourists and locals, offering a wide range of recreational activities and natural beauty in the heart of the city.",
    category: "Parks & Nature",
    rating: 4.9,
    reviews: 8932,
    price: 0,
    duration: "2-6 hours",
    image: "/central-park-autumn.png",
    address: "Central Park, New York, NY",
    phone: "+1 (212) 310-6600",
    email: "info@centralparknyc.org",
    website: "https://www.centralparknyc.org",
    hours: {
      monday: "6:00 AM - 1:00 AM",
      tuesday: "6:00 AM - 1:00 AM",
      wednesday: "6:00 AM - 1:00 AM",
      thursday: "6:00 AM - 1:00 AM",
      friday: "6:00 AM - 1:00 AM",
      saturday: "6:00 AM - 1:00 AM",
      sunday: "6:00 AM - 1:00 AM",
    },
    features: ["Free admission", "Pet friendly", "Bike rentals", "Playgrounds", "Picnic areas"],
    highlights: [
      "Bethesda Terrace and Fountain",
      "Bow Bridge",
      "The Mall and Literary Walk",
      "Belvedere Castle",
      "Strawberry Fields",
    ],
    tips: [
      "Rent a bike to cover more ground",
      "Visit during fall for stunning foliage",
      "Bring a picnic blanket and snacks",
      "Download a park map or use a guided tour app",
    ],
    gallery: [
      "/central-park-autumn.png",
      "/placeholder.svg?key=d6s8y",
      "/placeholder.svg?key=zumyh",
      "/placeholder.svg?key=db68h",
    ],
  },
}

export default function AttractionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const attraction = attractionData[id] || attractionData["1"]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={attraction.image || "/placeholder.svg"}
          alt={attraction.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Badge variant="secondary" className="mb-3">
              {attraction.category}
            </Badge>
            <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">{attraction.name}</h1>
            <p className="text-pretty text-lg text-white/90 mt-2">{attraction.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                      <div className="font-semibold">
                        {attraction.rating} ({attraction.reviews.toLocaleString()})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-secondary/10 p-3">
                      <Clock className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-semibold">{attraction.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-accent/10 p-3">
                      <DollarSign className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="font-semibold">{attraction.price === 0 ? "Free" : `$${attraction.price}`}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Visitors</div>
                      <div className="font-semibold">Very Popular</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-pretty leading-relaxed text-muted-foreground">{attraction.longDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Features & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {attraction.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hours of Operation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(attraction.hours).map(([day, hours]) => (
                        <div key={day} className="flex items-center justify-between text-sm">
                          <span className="font-medium capitalize">{day}</span>
                          <span className="text-muted-foreground">{hours as string}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="highlights" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Must-See Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attraction.highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                            {index + 1}
                          </div>
                          <p className="text-pretty leading-relaxed">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visitor Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attraction.tips.map((tip: string, index: number) => (
                        <div key={index} className="flex gap-3">
                          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                          <p className="text-pretty leading-relaxed text-muted-foreground">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {attraction.gallery.map((image: string, index: number) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <AspectRatio ratio={4 / 3}>
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${attraction.name} - Image ${index + 1}`}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking & Info */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {attraction.price === 0 ? "Free" : `$${attraction.price}`}
                  </span>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold">{attraction.rating}</span>
                  <span className="text-sm text-muted-foreground">({attraction.reviews.toLocaleString()} reviews)</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Add to Trip
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Location & Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">{attraction.address}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">{attraction.phone}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">{attraction.email}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Website</div>
                    <a
                      href={attraction.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Visit website
                    </a>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
              </CardContent>
            </Card>

            {/* Accessibility Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Accessibility className="h-5 w-5" />
                  Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This attraction is wheelchair accessible and offers accommodations for visitors with disabilities.
                  Contact directly for specific accessibility needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
