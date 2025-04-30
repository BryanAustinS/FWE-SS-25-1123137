import { useListState } from '@mantine/hooks'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Table, ActionIcon, Container } from '@mantine/core'
import { IconGripVertical, IconPencil } from '@tabler/icons-react'
import { Destination } from '@/service'

interface DestinationListCardProps {
    destinations: Destination[];
}

export const DestinationListCard: React.FC<DestinationListCardProps> = ({ destinations }) => {
    const [state, handlers] = useListState(destinations);

    const items = state.map((item, index) => (
        <Draggable key={item.id} index={index} draggableId={item.id}>
            {(provided) => (
                <Table.Tr ref={provided.innerRef} {...provided.draggableProps}>
                    <Table.Td>
                        <div {...provided.dragHandleProps}
                        style={{
                            width: '40px',
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
                    <Table.Td w={80}>{item.name}</Table.Td>
                    <Table.Td w={80}>{item.nights}</Table.Td>
                    <Table.Td w={80}>{item.activities}</Table.Td>
                    <Table.Td w={30}>
                        <ActionIcon radius="xl" size={36}>
                            <IconPencil size={20}/>
                        </ActionIcon>
                    </Table.Td>
                </Table.Tr>
            )}
        </Draggable>
    ));
    
    return (
    <Container my="xl">
      <Table.ScrollContainer  minWidth={420}>
        <DragDropContext
            onDragEnd={({destination, source}) =>
                handlers.reorder({from: source.index, to: destination?.index || 0})
            }
        >
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={40} />
                        <Table.Th w={80}>Destinations</Table.Th>
                        <Table.Th w={80}>Nights</Table.Th>
                        <Table.Th w={80}>Activities</Table.Th>
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