import { Configuration, DefaultApi } from '../api-client';
import { Trip, TripInput, TripUpdate, Destination, DestinationInput, DestinationUpdate } from '../api-client/models';

const configuration = new Configuration({
    basePath: 'http://localhost:3000',
});

const API_BASE_URL = 'http://localhost:3000';

const apiClient = new DefaultApi(configuration);

export const TripService = {
    getAllTrips: async (): Promise<Trip[]> => {
        try {
            return await apiClient.getAllTrips();
        } catch (error) {
            console.error('Error fetching all trips: ', error);
            throw error;
        }
    },

    getTripById: async (id: string): Promise<Trip> => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/trip/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (Array.isArray(data)) {
                if (data.length === 0) {
                    throw new Error('Trip not found');
                }
                return data[0];
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching trip by ID: ', error);
            throw error;
        }
    },

    getTripByName: async (name: string): Promise<Trip[]> => {
        try {
            return await apiClient.getTripByName({name});
        } catch (error) {
            console.error('Error fetching trips by name: ', error);
            throw error;
        }
    },

    getTripByNameContains: async (name: string) : Promise<Trip[]> => {
        try {
            return await apiClient.getTripByNameContains({namecontains: name});
        } catch (error) {
            console.error('Error fetching trips by name: ', error);
            throw error;  
        }
    },

    createTrip: async (tripData: TripInput): Promise<Trip> => {
        try {
            return await apiClient.createTrip({ tripInput: tripData });
        } catch (error) {
            console.error('Error creating trip: ', error);
            throw error;       
        }
    },

    updateTrip: async (id: string, tripData: TripUpdate): Promise<Trip> => {
        try {
            return await apiClient.updateTrip({ id, tripUpdate: tripData });
        } catch (error) {
            console.error('Error updating trip: ', error);
            throw error;         
        }
    },

    deleteTrip: async (id: string): Promise<Trip> => {
        try {
            return await apiClient.deleteTrip({id});
        } catch (error) {
            console.error('Error updating trip: ', error);
            throw error;         
        }
    }
}

export const DestinationService = {
    getAllDestinations: async (): Promise<Destination[]> => {
        try {
            return await apiClient.getAllDestinations();
        } catch (error) {
            console.error('Error fetching all trips: ', error);
            throw error;
        }
    },

    getDestinationById: async (id: string): Promise<Destination> => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/destination/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (Array.isArray(data)) {
                if (data.length === 0) {
                    throw new Error('Destination not found');
                }
                return data[0];
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching destination by ID: ', error);
            throw error;
        }
    },

    getDestinationByTripId: async (tripId: string) : Promise<Destination[]> => {
        try {
            return await apiClient.getDestinationByTripId({tripId});
        } catch (error) {
            console.error('Error fetching destinations by name: ', error);
            throw error;
        }
    },

    getDestinationByName: async (name: string): Promise<Destination[]> => {
        try {
            return await apiClient.getDestinationByName({name});
        } catch (error) {
            console.error('Error fetching destinations by name: ', error);
            throw error;
        }
    },

    getDestinationByNameContains: async (name: string): Promise<Destination[]> => {
        try {
            return await apiClient.getDestinationByNameContains({namecontains: name});
        } catch (error) {
            console.error('Error fetching destinations by name contains: ', error);
            throw error;
        }
    },

    createDestination: async (destinationData: DestinationInput): Promise<Destination> => {
        try {
            return await apiClient.createDestination({ destinationInput: destinationData });
        } catch (error) {
            console.error('Error creating Destination: ', error);
            throw error;       
        }
    },

    updateDestination: async (id: string, destinationData: DestinationUpdate): Promise<Destination> => {
        try {
            return await apiClient.updateDestination({ id, destinationUpdate: destinationData });
        } catch (error) {
            console.error('Error updating Destination: ', error);
            throw error;         
        }
    },

    deleteDestination: async (id: string): Promise<Destination> => {
        try {
            return await apiClient.deleteDestination({id});
        } catch (error) {
            console.error('Error updating Destination: ', error);
            throw error;         
        }
    }
}

export type { Trip, TripInput, TripUpdate };
export type { Destination, DestinationInput, DestinationUpdate }




