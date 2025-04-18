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
import { useSurveyQuestions } from '../api/hooks';
import { CreateQuestionModal } from './CreateQuestionModal';

export function SurveyQuestions({ surveyId }: { surveyId: number }) {
  const { data: questions, isPending } = useSurveyQuestions(surveyId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mt={8}>
      <Heading size="md" mb={4}>
        Questions
      </Heading>
      <Button onClick={onOpen} mb={4} colorScheme="teal">
        Add Question
      </Button>

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
