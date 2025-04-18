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
import { useSurveys } from '../api/hooks';
import { useAuth } from '../context/auth';
import { CreateSurveyModal } from '../components/CreateSurveyModal';
import { Loading } from '../components/Loading';

export function Surveys() {
  const { user } = useAuth();
  const { data: surveys, isPending } = useSurveys();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isPending) return <Loading />;

  return (
    <Box>
      <Heading mb={4}>Surveys</Heading>
      {user?.role === 'admin' && (
        <Button onClick={onOpen} mb={4}>
          Create Survey
        </Button>
      )}

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {surveys?.map((survey: any) => (
            <Tr key={survey.id}>
              <Td>{survey.name}</Td>
              <Td>{survey.description}</Td>
              <Td>{survey.status}</Td>
              <Td>{/* To add action buttons here */}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CreateSurveyModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
