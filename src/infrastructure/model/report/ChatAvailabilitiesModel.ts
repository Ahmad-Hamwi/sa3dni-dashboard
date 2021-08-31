export interface ChatAvailabilitiesModel {
    days: ChatAvailabilityDayModel[]
}

export interface ChatAvailabilityDayModel {
    date: string
    /**
     * In milliseconds
     */
    availability: number
}