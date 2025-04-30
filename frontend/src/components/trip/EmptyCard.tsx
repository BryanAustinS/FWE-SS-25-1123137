import { Button, Container, Title, Center, Box } from '@mantine/core';

interface EmptyCardProps {
  msg: string;
  buttonMsg: string;
}

export function EmptyCard({ msg, buttonMsg }: EmptyCardProps) {
  return (
    <Container size="md" py={100} style={{ height: '70vh' }}>
      <Center style={{ height: '100%' }}>
        <Box ta="center">
          <Title fw={900} mb="lg">{msg}</Title>
          <Button variant="outline" size="md">
            {buttonMsg}
          </Button>
        </Box>
      </Center>
    </Container>
  );
}