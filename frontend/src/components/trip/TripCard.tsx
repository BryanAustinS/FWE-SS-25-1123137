import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trip } from '@/service';
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  ActionIcon,
  Flex,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { formatDate } from '@/utils/utils';
import { modals } from '@mantine/modals';
import { TripService } from '@/service';

interface TripCardProps {
  trip: Trip;
  onClick?: (id: string) => void;
}

export const TripCard: React.FC<
  TripCardProps
> = ({ trip, onClick }) => {
  const {
    name,
    description,
    imageUrl,
    startDate,
    endDate,
  } = trip;

  const navigate = useNavigate();

  const handleDelete = () =>
    modals.openConfirmModal({
      title: 'Delete Trip',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to
          delete your Trip?
        </Text>
      ),
      labels: {
        confirm: `Delete Trip`,
        cancel: 'Cancel',
      },
      confirmProps: { color: 'red' },
      onCancel: () =>
        console.log('Cancel'),
      onConfirm: async () => {
        try {
          await TripService.deleteTrip(
            trip.id
          );
          navigate('/home');
          console.log(
            'Trip delete successfully'
          );
        } catch (error) {
          console.error(
            'Failed to delete trip ',
            error
          );
        }
      },
    });

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section p="md">
        <Image
          src={imageUrl}
          h={200}
          fit="cover"
          radius="md"
        />
      </Card.Section>

      <Text
        size="24px"
        fw={700}
        mb="sm"
      >
        {name}
      </Text>
      <Text
        size="12px"
        c="dimmed"
        mb="xs"
      >
        {formatDate(startDate)} -{' '}
        {formatDate(endDate)}
      </Text>
      <Flex
        wrap={'wrap'}
        style={{ maxWidth: '100%' }}
      >
        <Text
          lineClamp={1}
          style={{
            width: '100%',
            overflowWrap: 'break-word',
          }}
        >
          {description || '\u00A0'}
        </Text>
      </Flex>

      <Group mt="xs">
        <Button
          radius="md"
          style={{ flex: 1 }}
          onClick={() =>
            onClick?.(trip.id)
          }
        >
          Show details
        </Button>
        <ActionIcon
          variant="light"
          radius="md"
          size={36}
          onClick={handleDelete}
        >
          <IconTrash size={20} />
        </ActionIcon>
      </Group>
    </Card>
  );
};
