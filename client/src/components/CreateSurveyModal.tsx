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
  Textarea,
} from '@chakra-ui/react';
import { useCreateSurvey } from '../api/hooks';
import { useForm } from 'react-hook-form';

export function CreateSurveyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm();
  const { mutate: createSurvey, isPending } = useCreateSurvey();

  const onSubmit = (data: any) => {
    createSurvey(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Create Survey</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input {...register('name')} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea {...register('description')} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" isLoading={isPending}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
