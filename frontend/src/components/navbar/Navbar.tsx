import { IconSearch } from '@tabler/icons-react';
import { TextInput, Text, Group, Button, ActionIcon } from '@mantine/core';
import classes from './Navbar.module.css';
import { useState } from 'react'
import { TripForm } from '@/components/trip/TripForm'
import { IconArrowRight } from '@tabler/icons-react'
interface NavbarProps {
  onClick?: () => void
}

export function Navbar({ onClick }: NavbarProps) {
  const [isFormOpen, setFormOpen] = useState(false);

  const handleOpenForm = () => {
    setFormOpen(true);
  }

  const handleCloseForm = () => {
    setFormOpen(false);
  }

  return (
    <>
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Text fw={700} size="xl" onClick={onClick}>Triplanner</Text>
        </Group>

        <Group>
          <TextInput
            className={classes.search}
            placeholder="Search for Trip or Destination"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            rightSection={
              <ActionIcon size={24} radius="md" variant="outline">
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
            visibleFrom="xs"
            style={{width: '500px'}}
            radius='md'
          />
        </Group>

        <Group visibleFrom="sm">
          <Button variant="lights" radius='md' onClick={handleOpenForm}>Create a Trip</Button>
        </Group>
      </div>
    </header>

    { isFormOpen && (
      <TripForm
        title="Create your new Trip"
        trip={null}
        onClose={handleCloseForm}
        />
    )}
    </>
  );
}