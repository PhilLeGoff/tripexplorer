"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, DollarSign, Heart, Plus } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

interface Attraction {
  id: string
  name: string
  description: string
  category: string
  rating: number
  reviews: number
  price: number
  duration: string
  image: string
  featured?: boolean
}

interface AttractionCardProps {
  attraction: Attraction
  viewMode: "grid" | "list"
}

export function AttractionCard({ attraction, viewMode }: AttractionCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className="flex flex-col gap-4 p-4 sm:flex-row">
          <Link href={`/attraction/${attraction.id}`} className="relative w-full overflow-hidden rounded-lg sm:w-48">
            <AspectRatio ratio={16 / 9}>
              <Image src={attraction.image || "/placeholder.svg"} alt={attraction.name} fill className="object-cover" />
            </AspectRatio>
            {attraction.featured && (
              <Badge className="absolute left-2 top-2" variant="secondary">
                Featured
              </Badge>
            )}
          </Link>
          <div className="flex flex-1 flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link href={`/attraction/${attraction.id}`}>
                    <h3 className="text-lg font-semibold leading-tight hover:text-primary">{attraction.name}</h3>
                  </Link>
                  <Badge variant="outline" className="mt-1">
                    {attraction.category}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon-sm" onClick={() => setIsFavorite(!isFavorite)} className="shrink-0">
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{attraction.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{attraction.rating}</span>
                  <span className="text-muted-foreground">({attraction.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{attraction.duration}</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <DollarSign className="h-4 w-4" />
                  <span>{attraction.price === 0 ? "Free" : `$${attraction.price}`}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" size="sm" asChild>
                <Link href={`/attraction/${attraction.id}`}>View Details</Link>
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
                Add to Trip
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/attraction/${attraction.id}`} className="relative overflow-hidden block">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={attraction.image || "/placeholder.svg"}
              alt={attraction.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          {attraction.featured && (
            <Badge className="absolute left-3 top-3" variant="secondary">
              Featured
            </Badge>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute right-3 top-3 bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/attraction/${attraction.id}`}>
              <h3 className="text-balance font-semibold leading-tight hover:text-primary">{attraction.name}</h3>
            </Link>
          </div>
          <Badge variant="outline" className="w-fit">
            {attraction.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{attraction.description}</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{attraction.rating}</span>
            <span className="text-muted-foreground">({attraction.reviews.toLocaleString()})</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{attraction.duration}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-primary">
            <DollarSign className="h-4 w-4" />
            <span>{attraction.price === 0 ? "Free" : `$${attraction.price}`}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 p-4 pt-0">
        <Button className="flex-1" size="sm" asChild>
          <Link href={`/attraction/${attraction.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" size="icon-sm">
          <Plus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
