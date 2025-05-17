import {
  useState,
  useEffect,
} from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  Group,
  TextInput,
  ActionIcon,
  Popover,
  Select,
  Flex,
} from '@mantine/core';
import {
  IconSearch,
  IconCalendarEvent,
  IconFilter,
} from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';

const SearchBar = () => {
  const [searchParams] =
    useSearchParams();
  const [opened, setOpened] =
    useState(false);
  const [searchTerm, setSearchTerm] =
    useState(
      searchParams.get('query') || ''
    );
  const [searchDate, setSearchDate] =
    useState<Date | null>(
      searchParams.get('date')
        ? new Date(
            searchParams.get(
              'date'
            ) as string
          )
        : null
    );
  const adjustDate = (date : Date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12,
      0,
      0
    );
  }

  const [searchType, setSearchType] =
    useState(
      searchParams.get('type') || 'all'
    );
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(
      searchParams.get('query') || ''
    );
    setSearchDate(
      searchParams.get('date')
        ? adjustDate(
            new Date(searchParams.get('date') as string)
          )
        : null
    );
    setSearchType(
      searchParams.get('type') || 'all'
    );
  }, [searchParams]);

  const handleSearch = () => {
    const params =
      new URLSearchParams();

    if (searchTerm.trim()) {
      params.set(
        'query',
        searchTerm.trim()
      );
    }

    if (searchDate) {
      const formattedDate = searchDate
        .toISOString()
        .split('T')[0];
      params.set('date', formattedDate);
    }

    if (searchType !== 'all') {
      params.set('type', searchType);
    }

    if (params.toString()) {
      navigate(
        `/home?${params.toString()}`
      );
    } else {
      navigate('/home');
    }

    setOpened(false);
  };

  return (
    <Group gap="xs">
      <TextInput
        radius="md"
        placeholder="Search trips..."
        leftSection={
          <IconSearch size={16} />
        }
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        rightSection={
          <ActionIcon onClick={handleSearch}>
            <IconSearch size={16} />
          </ActionIcon>
        }
        style={{ minWidth: '400px'}}
      />

      <Popover
        opened={opened}
        position="bottom-end"
        width={400}
        radius="md"
        shadow="md"
      >
        <Popover.Target>
          <ActionIcon
            variant="subtle"
            color="white"
            onClick={() =>
              setOpened((o) => !o)
            }
            aria-label="Advanced search options"
          >
            <IconFilter size={16} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <Flex
            direction="row"
            align="center"
            justify="center"
            gap="sm"
          >
            <Select
              label="Filter by category"
              data={[
                {
                  value: 'all',
                  label: 'All',
                },
                {
                  value: 'trip',
                  label: 'Trip names',
                },
                {
                  value: 'destination',
                  label:
                    'Destination names',
                },
                {
                  value: 'date',
                  label: 'Date',
                },
              ]}
              value={searchType}
              onChange={(value) =>
                setSearchType(
                  value || 'all'
                )
              }
            />

            <DateInput
              label="Filter by date"
              placeholder="Select date..."
              value={searchDate}
              onChange={setSearchDate}
              leftSection={
                <IconCalendarEvent
                  size={16}
                />
              }
              clearable
            />
          </Flex>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default SearchBar;
