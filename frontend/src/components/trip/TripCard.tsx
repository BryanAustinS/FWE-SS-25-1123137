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
      <Card.Section px="lg">
        <Flex justify="flex-end">
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots size={12} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconPencil size={10}/>}>
                Edit Trip
              </Menu.Item>
              <Menu.Item leftSection={<IconTrash size={10} color="red"/>}>
                Delete Trip
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>


        <Image
          src={imageUrl}
          h={200}
          fit="cover"
          radius="md"
        />

      </Card.Section>

      <Text size="24px" fw={700} mt="md" mb="sm">{name}</Text>

      <Text size="12px" c="dimmed" fw={700} mb="xs" >{formatDate(startDate)} - {formatDate(endDate)}</Text>

      <Text size="14px" fw={500}>{description}</Text>

      
    </Card>
  )
}
