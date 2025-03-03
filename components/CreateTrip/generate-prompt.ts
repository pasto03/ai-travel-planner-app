import { LocationInfoProps, TravellerProps, TripDataProps } from "./tripData"


export function generateTripPrompt({ locationInfo, totalNoOfDays, traveller, budget }: TripDataProps) {
    return `Generate Travel Plan for Location : ${locationInfo.name}, for ${totalNoOfDays} days and ${totalNoOfDays - 1} nights for ${traveller.title} with a ${budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for ${totalNoOfDays} days and ${totalNoOfDays} nights with each day plan with the best time to visit in JSON format. Only return JSON string.`
}