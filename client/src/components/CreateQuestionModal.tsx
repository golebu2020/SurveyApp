import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useCreateSurveyQuestion } from '../api/hooks';
import { useForm } from 'react-hook-form';

export function CreateQuestionModal({
  surveyId,
  isOpen,
  onClose,
}: {
  surveyId: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm();
  const { mutate: createQuestion, isPending } = useCreateSurveyQuestion();

  const onSubmit = (data: any) => {
    createQuestion(
      { surveyId, question: data },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Add Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Question Label</FormLabel>
            <Input {...register('label')} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Data Type</FormLabel>
            <Select {...register('data_type')} required>
              <option value="text">Text</option>
              <option value="scale">Scale</option>
              <option value="boolean">Yes/No</option>
              <option value="multiple_choice">Multiple Choice</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Additional Info</FormLabel>
            <Textarea {...register('info')} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" isLoading={isPending} colorScheme="teal">
            Add Question
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
