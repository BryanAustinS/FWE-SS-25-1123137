import { useListState } from '@mantine/hooks'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Table, ActionIcon, Container, Stack, Text, Pill, PillGroup } from '@mantine/core'
import { IconGripVertical, IconPencil } from '@tabler/icons-react'
import { Destination, DestinationService } from '@/service'
import { ActionMenu } from '../ActionMenu'
import { modals } from '@mantine/modals';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DestinationForm } from './DestinationForm'



interface DestinationListCardProps {
    destinations: Destination[];
    tripId: string;
    totalNights: number;
}

export const DestinationListCard: React.FC<DestinationListCardProps> = ({ tripId, totalNights, destinations }) => {
    const [state, handlers] = useListState(destinations);
    const [currentDestination, setCurrentDestination] = useState<Destination>();
    const [isDestinationFormOpen, setDestinationForm] = useState(false);
    const navigate = useNavigate();

    const handleOpenDestinationForm = (destination : Destination) => {
        setCurrentDestination(destination);
        setDestinationForm(true);
    }

    const handleCloseDestinationForm = () => {
        setDestinationForm(false);
    } 
    
    const handleDelete = (destinationId : string) =>
        modals.openConfirmModal({
        title: "Delete destination",
        centered: true,
        children: (
            <Text size="sm">
            Are you sure you want to delete your Destination?
            </Text>
        ),
        labels: { confirm: `Delete destination`, cancel: "Cancel" },
        confirmProps: { color: 'red' },
        onCancel: () => console.log('Cancel'),
        onConfirm: async() => {
        try {
            await DestinationService.deleteDestination(destinationId ?? '');
            console.log("Trip ID redirect: ", tripId);
            navigate(`/trip/${tripId}`);
            console.log("Destination delete successfully");
        } catch (error) {
            console.error('Failed to delete destination ', error)
        }
        },
    });

    const formatActivities = (activities: string[]) => {
        if (!activities || activities.length === 0) return '-';
        
        return (
            <PillGroup gap={4} py="xs">
                {activities.map((activity, i) => (
                    <Pill key={i}>
                        {activity}
                    </Pill>
                ))}
            </PillGroup>
        );
    };

    const currentNights = () => {
        let sum = 0;
        destinations.forEach((destination) => {
            sum += destination.nights ? destination.nights : 0;
        });
        return sum;
    }

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
                        <ActionMenu
                            id={item.id}
                            onEdit={() => handleOpenDestinationForm(item)}
                            onDelete={() => handleDelete(item.id)}
                        />                    
                    </Table.Td>
                </Table.Tr>
            )}
        </Draggable>
    ));
    
    return (
        <>
        {destinations.length != 0 && 
    
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
        }
        
        { isDestinationFormOpen && (
            <DestinationForm 
                title={currentDestination ? "Edit a destination" : "Add a destination"}
                totalNights={totalNights}
                currentNights={currentNights()}
                tripId={tripId}
                destination={currentDestination ?? null}
                onClose={handleCloseDestinationForm}
            />
        )}
        </>
        
    );
    
}