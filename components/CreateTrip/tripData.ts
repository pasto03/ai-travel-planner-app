export interface LocationInfoProps {
    coordinates: {
        lat: number,
        lng: number,
    },
    name: string,
    photoRef: string,
    url: string
}

export interface TravellerProps {
    desc: string,
    icon: any,
    id: number,
    people: string,
    title: string
}

export interface TripDataProps {
    locationInfo: LocationInfoProps,
    startDate: string,
    endDate: string,
    totalNoOfDays: number,
    traveller: TravellerProps,
    budget: string
}