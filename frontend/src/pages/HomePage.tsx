import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripService, Trip } from '../service'
import { TripCard } from '../components/trip/TripCard'


const HomePage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrips = async() => {
            try{
                const trips = await TripService.getAllTrips();
                setTrips(trips);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTrips();
    }, [])

    const onClickTrip = (id: string) => {
        navigate(`/trip/${id}`);
    }

    

    return (
        <div className="grid grid-cols-3">
            <div className="p-3 gap-6">
                {trips.map(trip => (
                    <TripCard key={trip.id} trip={trip} onClick={onClickTrip} />
                ))}
            </div>
        </div>
    )
}

export default HomePage;