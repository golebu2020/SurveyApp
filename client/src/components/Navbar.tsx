import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';

export function Navbar({ user, logout }: { user: any; logout: () => void }) {
  return (
    <Flex align="center" gap={4}>
      {user?.role === 'admin' && (
        <Button as={Link} to="/users" variant="ghost">
          Users
        </Button>
      )}
      <Menu>
        <MenuButton as={Button} rightIcon={<FiChevronDown />}>
          <Flex align="center" gap={2}>
            <FiUser />
            {user?.email}
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiLogOut />} onClick={logout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
