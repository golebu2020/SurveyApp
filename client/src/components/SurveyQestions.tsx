import {
  // ... existing imports
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Td,
  Tr,
  Tbody,
  useDisclosure,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { useDeleteQuestion, useSurveyQuestions, useUsers } from '../api/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/auth';
import { useState } from 'react';
import { Question } from '../api/types';

export function SurveyQuestions({ surveyId }: { surveyId: number }) {
  const toast = useToast();
  const { mutate: deleteQuestion } = useDeleteQuestion();
  const queryClient = useQueryClient();
  const { data: questions, isPending } = useSurveyQuestions(surveyId);
  const { user } = useAuth();

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const handleEditClick = (question: Question) => {
    setEditingQuestion(question);
    onEditOpen();
  };

  const handleDelete = (questionId: number) => {
    deleteQuestion(
      { surveyId, questionId },
      {
        onSuccess: () => {
          toast({
            title: 'Question deleted',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          queryClient.invalidateQueries({
            queryKey: ['surveyQuestions', surveyId],
          });
        },
        onError: () => {
          toast({
            title: 'Error deleting question',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
      },
    );
  };

  return (
    <Tbody>
      {questions?.map((question) => (
        <Tr key={question.id}>
          <Td>{question.label}</Td>
          <Td>{question.data_type}</Td>
          <Td>{question.info}</Td>
          <Td>
            {user?.role !== 'user' && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Question actions"
                  icon={<FiMoreVertical />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem
                    icon={<FiEdit2 />}
                    onClick={() => handleEditClick(question)}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    icon={<FiTrash2 />}
                    color="red.500"
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
}
