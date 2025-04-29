import React from 'react'
import { Trip } from '@/service'
import { Card, Image, Text, Badge, Button, Group, ActionIcon, Menu, Flex } from '@mantine/core';
import { IconDots, IconTrash, IconPencil } from '@tabler/icons-react'
import { formatDate } from '@/utils/utils'

interface TripCardProps {
  trip: Trip;
  onClick?: (id: string) => void
}

export const TripCard: React.FC<TripCardProps> = ({trip, onClick}) => {
  const { name, description, imageUrl, startDate, endDate } = trip;

  return (

    <Card shadow="sm" padding="lg" radius="md" withBorder> 
      <Card.Section p="md">
        <Image
          src={imageUrl}
          h={200}
          fit="cover"
          radius="md"
        />
      </Card.Section>
    
      <Text size="24px" fw={700} mb="sm">{name}</Text>
      <Text size="12px" c="dimmed" fw={700} mb="xs" >{formatDate(startDate)} - {formatDate(endDate)}</Text>
      <Text size="14px" fw={300}>{description}</Text>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} onClick={() => onClick?.(trip.id)}>
          Show details
        </Button>
        <ActionIcon variant="light" radius="md" size={36}>
          <IconPencil size={20}/>
        </ActionIcon>
        <ActionIcon variant="light" radius="md" size={36}>
          <IconTrash size={20}/>
        </ActionIcon>
      </Group>
    </Card>
  )
}
