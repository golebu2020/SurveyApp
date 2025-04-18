import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Question } from '../api/types';
import { useUpdateQuestion } from '../api/hooks';
import { useQueryClient } from '@tanstack/react-query';

interface EditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  surveyId: number;
}

export function EditQuestionModal({
  isOpen,
  onClose,
  question,
  surveyId,
}: EditQuestionModalProps) {
  const toast = useToast();
  const { register, handleSubmit } = useForm<Question>({
    defaultValues: question,
  });
  const { mutate: updateQuestion, isPending } = useUpdateQuestion();
  const queryClient = useQueryClient();

  const onSubmit = (data: Question) => {
    updateQuestion(
      { surveyId, questionId: question.id, data },
      {
        onSuccess: () => {
          toast({
            title: 'Question updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          queryClient.invalidateQueries({
            queryKey: ['surveyQuestions', surveyId],
          });
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Edit Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Question Text</FormLabel>
            <Input {...register('label', { required: true })} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Response Type</FormLabel>
            <Select {...register('data_type', { required: true })}>
              <option value="text">Text</option>
              <option value="scale">Scale (1-10)</option>
              <option value="boolean">Yes/No</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Additional Info</FormLabel>
            <Textarea {...register('info')} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit" isLoading={isPending}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
