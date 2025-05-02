import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Trip, TripService, Destination, DestinationService } from '@/service';
import { Image, Container, Paper, Title, Text, Flex, Group, Divider, Button, ActionIcon, Center, Loader} from '@mantine/core'; 
import { EmptyCard } from '@/components/trip/EmptyCard';
import { formatDate, calculateNights } from '@/utils/utils'
import { IconUser, IconCalendar, IconPencil, IconMoon, IconArrowLeft, IconTrash } from '@tabler/icons-react'
import { DestinationListCard } from '@/components/destination/DestinationListCard';
import { modals } from '@mantine/modals';
import { TripForm } from '@/components/trip/TripForm'


const TripDetailsPage = () => { 
    const { id } = useParams<{ id: string }>();
    const [trip, setTrip] = useState<Trip>();
    const [destinations, setDestinations] = useState<Destination[]>();
    const navigate = useNavigate();
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    
    const handleOpenForm = () => {
        setFormOpen(true);
    }

    const handleCloseForm = () => {
        setFormOpen(false);
    } 

    const handleDelete = () =>
        modals.openConfirmModal({
        title: "Delete Trip",
        centered: true,
        children: (
            <Text size="sm">
            Are you sure you want to delete your Trip?
            </Text>
        ),
        labels: { confirm: `Delete Trip`, cancel: "Cancel" },
        confirmProps: { color: 'red' },
        onCancel: () => console.log('Cancel'),
        onConfirm: async() => {
        try {
            await TripService.deleteTrip(id ?? '');
            navigate('/home');
            console.log("Trip delete successfully");
        } catch (error) {
            console.error('Failed to delete trip ', error)
        }
        },
        });

        useEffect(() => {
            if (!id) return;
        
            let isMounted = true;
            setLoading(true);
            
            const fetchData = async () => {
                try {
                    const [tripData, destinationsData] = await Promise.all([
                        TripService.getTripById(id),
                        DestinationService.getDestinationByTripId(id)
                    ]);
                    
                    if (isMounted) {
                        setTrip(tripData);
                        setDestinations(destinationsData);
                        setLoading(false);
                    } 
                } catch (error) {
                    console.error('Error fetching data:', error);
                    if (isMounted) {
                        setTrip(undefined);
                        setLoading(false);
                    }
                }
            };
        
            fetchData();
        
            return () => {
                isMounted = false;
            };
        }, [id]);

    let totalNights = trip?.startDate && trip?.endDate ? calculateNights(trip.startDate, trip.endDate) : 0; 
    
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
        <div>
            {!trip && <EmptyCard msg="Trip is not found" buttonMsg="Back to home" />}

            {trip && (
                <>
                <Flex justify={'flex-start'} direction={'row'}>
                    <Button radius="md" onClick={() => navigate('/home')} >
                        <IconArrowLeft size={20}/>
                        Back
                    </Button>

                    <Container size="md">
                        <Paper shadow="sm" p="md" radius="md" w={"800px"} withBorder>
                            <Image
                                src={trip.imageUrl}
                                width="100%"
                                height={400}
                                fit="cover"
                                radius="md"
                            />

                            <Flex justify="space-between" align="center">
                                <Title pt="lg" pb="sm" fw={1000}>{trip.name}</Title>
                                <Group pt="lg">
                                    <Button radius="md">Add a destination</Button>
                                    <ActionIcon size={36} radius="md" onClick={handleOpenForm}>
                                        <IconPencil size={20} />
                                    </ActionIcon>
                                    <ActionIcon radius="md" size={36} onClick={handleDelete}>
                                        <IconTrash size={20}/>
                                    </ActionIcon>
                                </Group>
                            </Flex>

                            <Flex 
                                direction={{base: 'column', sm: 'row'}} 
                                align={{base: 'flex-start', sm: 'center'}}
                                gap="sm" 
                                >
                                <Group  align="center">
                                    <IconCalendar size={16} color="gray" />
                                    <Text size="sm" c="dimmed">
                                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                                    </Text>
                                </Group>
                                
                                <Divider orientation="vertical" display={{base: 'none', sm: 'block'}} />

                                <Group align="center">
                                    <IconMoon size={16} color="gray"/>
                                    <Text size="sm" c="dimmed">
                                        {totalNights || 0} {totalNights <= 1 ? 'night' : 'nights'}
                                    </Text>
                                </Group>


                                <Divider orientation="vertical" display={{base: 'none', sm: 'block'}} />
                                
                                <Group  align="center">
                                    <IconUser size={16} color="gray" />
                                    <Text size="sm" c="dimmed">
                                    {trip.participants || 0} {trip.participants === 1 ? 'Participant' : 'Participants'}
                                    </Text>
                                </Group>
                            </Flex>

                            <DestinationListCard destinations={destinations || []}></DestinationListCard>
                        </Paper>
                    </Container>
                </Flex>

                { isFormOpen && (
                    <TripForm 
                        title="Update your Trip"
                        trip={trip}
                        onClose={handleCloseForm}
                    />
                )}

                </>
            )}
                
            
        </div>
    )
}

export default TripDetailsPage;