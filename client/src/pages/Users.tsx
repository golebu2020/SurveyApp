import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useUsers } from '../api/hooks';

export function Users() {
  const { data: users, isPending } = useUsers();

  return (
    <Box>
      <Heading mb={4}>Users</Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user: any) => (
            <Tr key={user.id}>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{/* Add actions here */}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
