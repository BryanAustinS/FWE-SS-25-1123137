import { useListState } from '@mantine/hooks'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Table, ActionIcon, Container, Stack, Text, Group } from '@mantine/core'
import { IconGripVertical, IconPencil } from '@tabler/icons-react'
import { Destination } from '@/service'

interface DestinationListCardProps {
    destinations: Destination[];
}

export const DestinationListCard: React.FC<DestinationListCardProps> = ({ destinations }) => {
    const [state, handlers] = useListState(destinations);

    const formatActivities = (activities: string[]) => {
        if (!activities || activities.length === 0) return '-';
        
        return (
            <Stack gap="xs" py="xs">
                {activities.map((activity, i) => (
                    <Text key={i} size="sm" lineClamp={1}>
                        {activity}
                    </Text>
                ))}
            </Stack>
        );
    };

    const items = state.map((item, index) => (
        <Draggable key={item.id} index={index} draggableId={item.id}>
            {(provided, snapshot) => (
                <Table.Tr 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    style={{
                        ...provided.draggableProps.style,
                        backgroundColor: snapshot.isDragging 
                            ? 'var(--mantine-color-gray-0)' 
                            : index % 2 === 0 ? 'var(--mantine-color-gray-0)' : undefined,
                    }}
                >
                    <Table.Td width={50}>
                        <div {...provided.dragHandleProps}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: 'var(--mantine-color-gray-6)',
                        }}
                        >
                            <IconGripVertical size={18} stroke={1.5} />
                        </div>
                    </Table.Td>
                    <Table.Td width={200}>
                        <Text fw={500}>{item.name}</Text>
                    </Table.Td>
                    <Table.Td width={80} align="center">
                        <Text>{item.nights}</Text>
                    </Table.Td>
                    <Table.Td width={350}>
                        {formatActivities(item.activities ?? [])}
                    </Table.Td>
                    <Table.Td width={70} align="center">
                        <ActionIcon radius="xl" color="cyan" variant="filled" size={36}>
                            <IconPencil size={20}/>
                        </ActionIcon>
                    </Table.Td>
                </Table.Tr>
            )}
        </Draggable>
    ));
    
    return (
        <Container my="xl" size="lg" p={0}>
            <Table.ScrollContainer minWidth={750}>
                <DragDropContext
                    onDragEnd={({destination, source}) => {
                        if (!destination) return;
                        handlers.reorder({from: source.index, to: destination.index});
                    }}
                >
                    <Table horizontalSpacing="md" verticalSpacing="sm" withTableBorder withColumnBorders={false}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w={50} />
                                <Table.Th w={200}>Destinations</Table.Th>
                                <Table.Th w={80} align="center">Nights</Table.Th>
                                <Table.Th w={350}>Activities</Table.Th>
                                <Table.Th w={70} />
                            </Table.Tr>
                        </Table.Thead>
                        <Droppable droppableId="dnd-list" direction="vertical">
                            {(provided) => (
                            <Table.Tbody {...provided.droppableProps} ref={provided.innerRef}>
                                {items}
                                {provided.placeholder}
                            </Table.Tbody>
                            )}
                        </Droppable>
                    </Table>
                </DragDropContext>
            </Table.ScrollContainer>
        </Container>  
    );
}