import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trip, TripService } from '@/service'

const TripDetailsPage = () => { 
    const { id } = useParams<{ id: string }>();
    const [trip, setTrip] = useState<Trip | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchTrip = async() => {
            try {
                const trip = await TripService.getTripById(id);
                setTrip(trip);
            } catch (error){
                console.error('Error fetching the Trip: ', error);
            }
        };

        fetchTrip();
    }, [id]);

    return (
        <div className="trip-page">
            <h1>{JSON.stringify(trip)} </h1>
        </div>
    )
}

export default TripDetailsPage;