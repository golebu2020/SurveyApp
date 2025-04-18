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
import { CreateSurveyModal } from '../components/CreateSurveyModal';

export function Surveys() {
  const { data: surveys, isPending } = useSurveys();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Heading mb={4}>Surveys</Heading>
      <Button onClick={onOpen} mb={4}>
        Create Survey
      </Button>

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
