import { Spinner, Center } from '@chakra-ui/react';

export function Loading() {
  return (
    <Center h="200px">
      <Spinner size="xl" />
    </Center>
  );
}
