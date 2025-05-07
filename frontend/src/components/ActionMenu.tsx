import React, { useState } from 'react';
import { ActionIcon, Tooltip, Group, Box } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  id: string | number;
}

export function ActionMenu({ onEdit, onDelete, id }: ActionMenuProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative' }}
    >
      <ActionIcon variant="subtle" color="gray">
        <IconDots size={18} />
      </ActionIcon>

      {isHovered && (
        <Group 
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            borderRadius: '4px',
            padding: '4px',
            zIndex: 10,
          }}
        >
          <Tooltip label="Edit">
            <ActionIcon 
              color="blue" 
              variant="light" 
              onClick={() => onEdit()}
              aria-label="Edit item"
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon 
              color="red" 
              variant="light" 
              onClick={() => onDelete()}
              aria-label="Delete item"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}
    </Box>
  );
}