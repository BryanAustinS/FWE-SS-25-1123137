import { IconSearch } from '@tabler/icons-react';
import { TextInput, Text, Group, Button, ActionIcon } from '@mantine/core';
import classes from './Navbar.module.css';
import { useState } from 'react'
import { TripForm } from '@/components/trip/TripForm'
import { IconArrowRight } from '@tabler/icons-react'
import SearchBar from './SearchBar';

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
          <Text c="white" fw={700} size="xl" onClick={onClick}>Triplanner</Text>
        </Group>

        <div className='navbar-search'>
          <SearchBar />
        </div>

        <Group visibleFrom="sm">
          <Button radius='md' onClick={handleOpenForm}>Create a Trip</Button>
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