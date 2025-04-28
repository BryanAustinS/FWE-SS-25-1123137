import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripService, Trip } from '../service'
import { TripCard } from '../components/trip/TripCard'
import { Grid, Container } from '@mantine/core'


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
        <Container size="xl" py="xl">
            <Grid gutter="xl">
                {trips.map(trip => (
                    <Grid.Col key={trip.id} span={4}>
                        <TripCard trip={trip} onClick={onClickTrip} />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}

export default HomePage;