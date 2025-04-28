import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Text, Group, Button } from '@mantine/core';
import classes from './Navbar.module.css';

export function Navbar() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Text fw={700} size="xl">Triplanner</Text>
        </Group>

        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search for Trip or Destination"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            visibleFrom="xs"
            style={{width: '500px'}}
          />
        </Group>

        <Group visibleFrom="sm">
          <Button variant="default">Create a Trip</Button>
        </Group>
      </div>
    </header>
  );
}