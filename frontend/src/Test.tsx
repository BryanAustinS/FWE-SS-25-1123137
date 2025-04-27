import { TripService } from './service';

const testTripService = async () => {
  console.log('Testing TripService...');
  
  try {
    console.log('Getting all trips...');
    const allTrips = await TripService.getAllTrips();
    console.log('All trips:', allTrips);
    
    if (allTrips.length > 0) {
      const firstTrip = allTrips[0];
      console.log('Getting trip by ID:', firstTrip.id);
      const trip = await TripService.getTripById(firstTrip.id);
      console.log('Trip by ID:', trip);
      
      console.log('Getting trips by name:', firstTrip.name);
      const tripsByName = await TripService.getTripByName(firstTrip.name);
      console.log('Trips by name:', tripsByName);
    }
    
    console.log('TripService tests completed successfully!');
  } catch (error) {
    console.error('Error testing TripService:', error);
  }
};

export { testTripService };