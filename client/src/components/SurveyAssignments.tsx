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
} from '@chakra-ui/react';
import { useAssignSurvey, useUsers } from '../api/hooks';
import { AssignSurveyModal } from './AssignSurveyModal';

export function SurveyAssignments({ surveyId }: { surveyId: number }) {
  const { data: users } = useUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Tbody>{/* Render assignments here */}</Tbody>
      </Table>

      <AssignSurveyModal
        surveyId={surveyId}
        users={users?.filter((u: any) => u.role === 'user') || []}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}
