import {
  Button,
  Stack,
  Text,
  Center,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface EmptyCardProps {
  msg: string;
  buttonMsg: string;
  onButtonClick?: () => void;
}

export const EmptyCard: React.FC<
  EmptyCardProps
> = ({
  msg,
  buttonMsg,
  onButtonClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate('/create');
    }
  };

  return (
    <Center
      style={{ minHeight: '60vh' }}
    >
      <Stack align="center">
        <Text>{msg}</Text>
        <Button onClick={handleClick}>
          {buttonMsg}
        </Button>
      </Stack>
    </Center>
  );
};
