/* Generated from interface.ts using ChatGPT */
import { z } from "zod";

const geoCoordinatesSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

const locationInfoSchema = z.object({
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  name: z.string(),
  photoRef: z.string(),
  url: z.string(),
});

const travellerSchema = z.object({
  desc: z.string(),
  icon: z.any(), // You might want to replace `z.any()` with a more specific type if known
  id: z.number(),
  people: z.string(),
  title: z.string(),
});

const tripDataSchema = z.object({
  locationInfo: locationInfoSchema,
  startDate: z.string(),
  endDate: z.string(),
  totalNoOfDays: z.number(),
  traveller: travellerSchema,
  budget: z.string(),
});

const flightSchema = z.object({
  bookingUrl: z.string(),
  details: z.string(),
  price: z.string(),
});

const hotelDetailsSchema = z.object({
  address: z.string(),
  description: z.string(),
  geoCoordinates: geoCoordinatesSchema,
  hotelName: z.string(),
  imageUrl: z.string(),
  price: z.string(),
  rating: z.string(),
});

const itineraryPlanSchema = z.object({
  geoCoordinates: geoCoordinatesSchema,
  placeDetails: z.string(),
  placeImageUrl: z.string(),
  placeName: z.string(),
  ticketPricing: z.string(),
  timeToTravel: z.string(),
});

const itinerarySchema = z.object({
  day: z.number(),
  plans: z.array(itineraryPlanSchema),
  location: z.string(),
  travelers: z.string(),
});

const travelPlanSchema = z.object({
  budget: z.string(),
  duration: z.string(),
  flight: flightSchema,
  hotels: z.array(hotelDetailsSchema),
  itinerary: z.array(itinerarySchema),
});

export const tripPlanSchema = z.object({
  travelPlan: travelPlanSchema,
});