import {
  Destination,
  DestinationService,
  DestinationInput,
} from '@/service';
import {
  Overlay,
  Paper,
  Button,
  Flex,
  TextInput,
  NumberInput,
  TagsInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

interface DestinationFormProps {
  title: string;
  tripId: string;
  destination: Destination | null;
  currentNights: number;
  totalNights: number;
  onClose: () => void;
}

export const DestinationForm: React.FC<
  DestinationFormProps
> = ({
  title,
  tripId,
  destination,
  currentNights,
  totalNights,
  onClose,
}) => {
  const navigate = useNavigate();

  console.log(
    'TotalNights: ',
    totalNights,
    ' currentNights: ',
    currentNights,
    ' destinationNights: ',
    destination?.nights
  );

  const form = useForm({
    initialValues: {
      name: destination
        ? destination.name
        : '',
      nights: destination
        ? destination.nights
        : 0,
      activities: destination
        ? destination.activities
        : [],
    },
    validate: {
      name: (value) =>
        value.trim().length === 0
          ? 'Destination name is required'
          : null,
      nights: (value) => {
        if ((value ?? 0) < 1) {
          return 'Amount of nights should be more than 0';
        }
        const otherDestinationsNights =
          currentNights -
          (destination?.nights ?? 0);
        const availableNights =
          totalNights -
          otherDestinationsNights;

        if (
          (value ?? 0) > availableNights
        ) {
          return 'Nights longer than intended duration of stay';
        }

        return null;
      },
      activities: (value) =>
        (value?.length ?? 0) < 1
          ? 'At least one activity is required'
          : null,
    },
  });

  useEffect(() => {
    const scrollPosition =
      window.scrollY;

    document.body.style.overflow =
      'hidden';
    document.body.style.position =
      'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(
        0,
        scrollPosition
      );
    };
  }, []);

  const handleSaveClick = async () => {
    if (!form.validate().hasErrors) {
      const destinationInput: DestinationInput =
        {
          tripId: tripId,
          name: form.values.name,
          nights: form.values.nights,
          activities:
            form.values.activities,
        };

      try {
        if (destination) {
          await DestinationService.updateDestination(
            destination.id,
            destinationInput
          );
          navigate(`/trip/${tripId}`);
        } else {
          await DestinationService.createDestination(
            destinationInput
          );
          navigate(`/trip/${tripId}`);
        }
        onClose();
      } catch (error) {
        console.error(
          'Error saving a destination',
          error
        );
        navigate('/home');
      }
    }
  };

  return (
    <Overlay
      blur={2}
      fixed
      zIndex={1000}
      center
    >
      <Paper
        shadow="sm"
        py="md"
        px="xl"
        radius="md"
        w={'500px'}
        withBorder
      >
        <h2>{title}</h2>

        <form
          onSubmit={form.onSubmit(
            handleSaveClick
          )}
        >
          <Flex
            direction="column"
            gap="md"
          >
            <TextInput
              required
              label="Destination Name"
              placeholder="Where do you want to go?"
              {...form.getInputProps(
                'name'
              )}
            />

            <NumberInput
              required
              label="Amount of nights"
              placeholder="How long are you going to stay here?"
              min={0}
              {...form.getInputProps(
                'nights'
              )}
            />

            <TagsInput
              label="Enter your activities"
              description="Separate each activity with a comma (,)"
              placeholder="What are you going to do?"
              maxTags={10}
              clearable
              allowDuplicates
              {...form.getInputProps(
                'activities'
              )}
            />
          </Flex>

          <Flex
            direction="row"
            align="center"
            justify="flex-end"
            gap="lg"
            pt="xl"
          >
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </form>
      </Paper>
    </Overlay>
  );
};
