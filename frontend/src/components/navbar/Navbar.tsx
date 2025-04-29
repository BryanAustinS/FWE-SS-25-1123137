import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Text, Group, Button } from '@mantine/core';
import classes from './Navbar.module.css';

interface NavbarProps {
  onClick?: () => void
}

export function Navbar({ onClick }: NavbarProps) {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Text fw={700} size="xl" onClick={onClick}>Triplanner</Text>
        </Group>

        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search for Trip or Destination"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            visibleFrom="xs"
            style={{width: '500px'}}
            radius='md'
          />
        </Group>

        <Group visibleFrom="sm">
          <Button variant="lights" radius='md'>Create a Trip</Button>
        </Group>
      </div>
    </header>
  );
}