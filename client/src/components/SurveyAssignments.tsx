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
  useDisclosure,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useAssignSurvey, useUsers, useSurveyAssignments } from '../api/hooks';
import { AssignSurveyModal } from './AssignSurveyModal';
import { FiMoreVertical } from 'react-icons/fi';

export function SurveyAssignments({ surveyId }: { surveyId: number }) {
  const { data: users } = useUsers();
  const { data: assignments } = useSurveyAssignments(surveyId);
  const { mutate: assignSurvey } = useAssignSurvey();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUnassign = (assignmentId: number) => {};

  return (
    <Box mt={8}>
      <Heading size="md" mb={4}>
        Assignments
      </Heading>
      <Button onClick={onOpen} mb={4} colorScheme="blue">
        Assign Survey
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Assigned To</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {assignments?.map((assignment) => {
            const user = users?.find((u) => u.id === assignment.assigned_to);
            return (
              <Tr key={assignment.id}>
                <Td>{user?.email || 'Unknown User'}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      assignment.status === 'COMPLETED'
                        ? 'green'
                        : assignment.status === 'ASSIGNED'
                        ? 'blue'
                        : 'gray'
                    }
                  >
                    {assignment.status}
                  </Badge>
                </Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Actions"
                      icon={<FiMoreVertical />}
                      variant="ghost"
                    />
                    <MenuList>
                      <MenuItem onClick={() => handleUnassign(assignment.id)}>
                        Unassign
                      </MenuItem>
                      {assignment.status === 'COMPLETED' && (
                        <MenuItem>View Responses</MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          })}
          {assignments?.length === 0 && (
            <Tr>
              <Td colSpan={3} textAlign="center">
                No assignments yet
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <AssignSurveyModal
        surveyId={surveyId}
        users={users?.filter((u) => u.role === 'user') || []}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}
