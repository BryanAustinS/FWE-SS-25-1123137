import { useListState } from '@mantine/hooks'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Table, ActionIcon } from '@mantine/core'
import { IconGripVertical, IconPencil } from '@tabler/icons-react'

// get data from api
const data = [
    {id: "123", destination: "Germany", nights: 2, activities: ["beer tour", "frankfurt tour"]}
]

export function DestinationListCard() {
    const [state, handlers] = useListState(data);

    const items = state.map((item, index) => (
        <Draggable key={item.id} index={index} draggableId={item.id}>
            {(provided) => (
                <Table.Tr ref={provided.innerRef} {...provided.draggableProps}>
                    <Table.Td>
                        <div {...provided.dragHandleProps}>
                            <IconGripVertical size={18} stroke={1.5} />
                        </div>
                    </Table.Td>
                    <Table.Td w={120}>{item.destination}</Table.Td>
                    <Table.Td w={80}>{item.nights}</Table.Td>
                    <Table.Td w={200}>{item.activities}</Table.Td>
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
      <Table.ScrollContainer minWidth={420}>
        <DragDropContext
            onDragEnd={({destination, source}) =>
                handlers.reorder({from: source.index, to: destination?.index || 0})
            }
        >
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={40} />
                        <Table.Th w={120}>Destination</Table.Th>
                        <Table.Th w={80}>Nights</Table.Th>
                        <Table.Th w={200}>Activities</Table.Th>
                        <Table.Th w={30}></Table.Th>
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
    );
}