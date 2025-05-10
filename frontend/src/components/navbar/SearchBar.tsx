import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Group, TextInput, ActionIcon, Popover, Select } from '@mantine/core';
import { IconSearch, IconCalendarEvent, IconFilter, IconX } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates'

const SearchBar = () => {
    const [searchParams] = useSearchParams();
    const [opened, setOpened] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
    const [searchDate, setSearchDate] = useState<Date | null>(
        searchParams.get('date') ? new Date(searchParams.get('date') as string) : null
    );
    const [searchType, setSearchType] = useState(searchParams.get('type') || 'all');
    const navigate = useNavigate();

    // Update the search term when the URL parameters change
    useEffect(() => {
        setSearchTerm(searchParams.get('query') || '');
        setSearchDate(searchParams.get('date') ? new Date(searchParams.get('date') as string) : null);
        setSearchType(searchParams.get('type') || 'all');
    }, [searchParams]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        
        if (searchTerm.trim()) {
            params.set('query', searchTerm.trim());
        }
        
        if (searchDate) {
            // Format date as YYYY-MM-DD
            const formattedDate = searchDate.toISOString().split('T')[0];
            params.set('date', formattedDate);
        }
        
        if (searchType !== 'all') {
            params.set('type', searchType);
        }
        
        // Check if we have any search parameters
        if (params.toString()) {
            navigate(`/home?${params.toString()}`);
        } else {
            navigate('/home');
        }
        
        setOpened(false);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchDate(null);
        setSearchType('all');
        navigate('/home');
    };

    return (
        <Group gap="xs">
            <TextInput
                placeholder="Search trips..."
                leftSection={<IconSearch size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                rightSection={
                    searchTerm ? (
                        <ActionIcon onClick={clearSearch}>
                            <IconX size={16} />
                        </ActionIcon>
                    ) : null
                }
                style={{ minWidth: '250px' }}
            />
            
            <Popover
                opened={opened}
                onChange={setOpened}
                position="bottom-end"
                width={300}
            >
                <Popover.Target>
                    <ActionIcon 
                        variant="subtle" 
                        color="gray" 
                        onClick={() => setOpened((o) => !o)}
                        aria-label="Advanced search options"
                    >
                        <IconFilter size={16} />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                    <Group grow>
                        <Select
                            label="Search in"
                            data={[
                                { value: 'all', label: 'All' },
                                { value: 'trip', label: 'Trip names' },
                                { value: 'destination', label: 'Destination names' },
                                { value: 'date', label: 'Dates only' }
                            ]}
                            value={searchType}
                            onChange={(value) => setSearchType(value || 'all')}
                        />
                        
                        <DateInput
                            label="Filter by date"
                            placeholder="Select date..."
                            value={searchDate}
                            onChange={setSearchDate}
                            leftSection={<IconCalendarEvent size={16} />}
                            clearable
                        />
                        
                        <Group p="right" mt="md">
                            <ActionIcon variant="filled" color="blue" onClick={handleSearch}>
                                <IconSearch size={16} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Popover.Dropdown>
            </Popover>
        </Group>
    );
};

export default SearchBar;