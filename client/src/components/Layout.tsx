import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { Navbar } from './Navbar';

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <Box>
      <Flex p={4} bg="gray.100" align="center">
        <Heading size="md">Survey App</Heading>
        <Spacer />
        <Navbar user={user} logout={logout} />
      </Flex>
      <Box p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}
