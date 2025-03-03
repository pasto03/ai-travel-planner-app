/* Only run this in node.js to test if API is working */
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";


const openai = new OpenAI();

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

const tripPlanSchema = z.object({
  travelPlan: travelPlanSchema,
});

const PROMPT = "Generate Travel Plan for Location : Penang, Malaysia, for 6 days and 5 nights for Friends with a Luxury budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 6 days and 6 nights with each day plan with the best time to visit in JSON format. Only return JSON string."

const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-mini",
  messages: [
    { role: "user", content: PROMPT },
  ],
  response_format: zodResponseFormat(tripPlanSchema, "userTrip"),
});

const userTrip = completion.choices[0].message.parsed;
console.log(userTrip);
