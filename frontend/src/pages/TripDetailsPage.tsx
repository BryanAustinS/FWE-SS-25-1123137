import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trip, TripService } from '@/service';
import { Image, Container, Paper, Title, Text, Flex, Group, Divider, Button, ActionIcon} from '@mantine/core'; 
import { EmptyCard } from '@/components/trip/EmptyCard';
import { formatDate, calculateNights } from '@/utils/utils'
import { IconUser, IconCalendar, IconPencil, IconMoon } from '@tabler/icons-react'

const TripDetailsPage = () => { 
    const { id } = useParams<{ id: string }>();
    const [trip, setTrip] = useState<Trip>();

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

    let totalNights = trip?.startDate && trip?.endDate ? calculateNights(trip.startDate, trip.endDate) : 0; 


    return (
        <div>
            {!trip && <EmptyCard msg="Trip is not found" buttonMsg="Back to home" />}

            {trip && (
                <Container size="md" py="sm">
                    <Paper shadow="sm" p="md" radius="md" withBorder>
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
                                <ActionIcon size={36} radius="md">
                                    <IconPencil size={20} />
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
                    </Paper>
                </Container>
            )}
                
            
        </div>
    )
}

export default TripDetailsPage;