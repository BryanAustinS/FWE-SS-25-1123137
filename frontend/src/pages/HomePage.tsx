import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TripService, Trip } from '../service'
import { TripCard } from '../components/trip/TripCard'
import { Grid, Container, Center, Flex, Loader, Text } from '@mantine/core'
import { EmptyCard } from '@/components/trip/EmptyCard';


const HomePage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setLoading] = useState(false);

    const fetchTrips = async() => {
        setLoading(true);

        try{
            const trips = await TripService.getAllTrips();
            setTrips(trips);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, [location.key])

    const onClickTrip = (id: string) => {
        navigate(`/trip/${id}`);
    }

    if (isLoading) {
            return (
                <Center style={{ height: '100vh' }}>
                    <Flex direction="column" align="center" gap="md">
                        <Loader size="lg" />
                        <Text>Loading trip details...</Text>
                    </Flex>
                </Center>
            );
        }

    return (
        <>
            {trips.length === 0 && <EmptyCard msg="Looks like you don't have any trip..." buttonMsg="Create your first trip" />}
            <Container size="xl">
                <Grid gutter="xl">
                    {trips.map(trip => (
                        <Grid.Col key={trip.id} span={4}>
                            <TripCard trip={trip} onClick={onClickTrip} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default HomePage;