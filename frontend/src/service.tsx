import { Configuration, DefaultApi } from '../api-client';
import { Trip, TripInput, TripUpdate } from '../api-client/models';

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

export type { Trip, TripInput, TripUpdate };




