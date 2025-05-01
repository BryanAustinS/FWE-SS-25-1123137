import { Trip, TripService, TripInput } from '@/service'
import { Overlay, Paper, Button, Flex, TextInput, NumberInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface TripFormProps {
    title: string;
    trip: Trip | null;
    onClose: () => void;
}

export const TripForm: React.FC<TripFormProps> = ({title, trip, onClose}) => {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: '',
            dateRange: [new Date(), new Date()],
            participants: 0,
            description: ''
        },
        validate: {
            name: (value) => (value.trim().length === 0 ? 'Trip name is required' : null),
            dateRange: (value) => (value[0] === null || value[1] === null ? 'Date is required' : null),
            participants: (value) => (value < 1 ? 'Participants should be more than 0' : null)
        }
    })

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleSaveClick = async () => {
        if (!form.validate().hasErrors) {
            const tripInput: TripInput = {
                name: form.values.name,
                startDate: form.values.dateRange[0],
                endDate: form.values.dateRange[1],
                participants: form.values.participants,
                description: form.values.description,
            };

            try {
                if (trip) {
                    await TripService.updateTrip(trip.id, tripInput);
                    navigate(`/trip/${trip.id}`)
                } else {
                    await TripService.createTrip(tripInput);
                    navigate('/home')
                }
                onClose();
            } catch (error) {
                console.error("Error saving a trip", error);
                navigate('/home');
            }
        }
    }

    return (
        <Overlay blur={2} center>
            <Paper shadow="sm" py="md" px="xl" radius="md" w={"500px"} withBorder>
                <h2>{title}</h2>

                <form onSubmit={form.onSubmit(handleSaveClick)}>
                    <Flex direction="column" gap="md">
                        <TextInput
                            required
                            label="Trip Name"
                            placeholder="Enter the name of your trip"
                            {...form.getInputProps('name')}
                        />

                        <DatePickerInput
                            required
                            clearable
                            label="Pick date range"
                            placeholder="Enter the date range"
                            type= "range"
                            {...form.getInputProps('dateRange')}
                        />

                        <NumberInput
                            required
                            label="Amount of participants"
                            placeholder="How many people are going in this trip"
                            min={0}
                            {...form.getInputProps('participants')}

                        />

                        <Textarea
                            label="Description"
                            placeholder="Describe your trip"
                            maxLength={128}
                            minRows={4}
                            {...form.getInputProps('description')}
                        />
                    </Flex>
                    

                    <Flex direction="row" align="center" justify="flex-end" gap="lg" pt="xl">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button variant="outline" type="submit">Save</Button>
                    </Flex>
                </form>
            </Paper>
        </Overlay>

    )

}