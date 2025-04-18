import {
  Box,
  Button,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useSurveyQuestions } from '../api/hooks';
import { CreateQuestionModal } from './CreateQuestionModal';
import { useAuth } from '../context/auth';

export function SurveyQuestions({ surveyId }: { surveyId: number }) {
  const { data: questions, isPending } = useSurveyQuestions(surveyId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  if (isPending)
    return (
      <Box mt={8}>
        <Skeleton height="30px" width="150px" mb={4} />{' '}
        <Skeleton height="40px" mb={4} />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} height="20px" mb={3} />
        ))}
      </Box>
    );

  return (
    <Box mt={8}>
      <Heading size="md" mb={4}>
        Questions
      </Heading>
      {user?.role !== 'user' && (
        <Button onClick={onOpen} mb={4} colorScheme="teal">
          Add Question
        </Button>
      )}

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Label</Th>
            <Th>Data Type</Th>
            <Th>Info</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {questions?.map((question: any) => (
            <Tr key={question.id}>
              <Td>{question.label}</Td>
              <Td>{question.data_type}</Td>
              <Td>{question.info}</Td>
              <Td>{/* To Add edit/delete actions here */}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CreateQuestionModal
        surveyId={surveyId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}
