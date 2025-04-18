import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { useAssignSurvey } from '../api/hooks';
import { useForm } from 'react-hook-form';

export function AssignSurveyModal({
  surveyId,
  users,
  isOpen,
  onClose,
}: {
  surveyId: number;
  users: any[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm();
  const { mutate: assignSurvey, isPending } = useAssignSurvey();

  const onSubmit = (data: any) => {
    assignSurvey(
      { surveyId, assignedTo: data.userId },
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
        <ModalHeader>Assign Survey</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Assign to User</FormLabel>
            <Select {...register('userId')} required>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" isLoading={isPending} colorScheme="blue">
            Assign
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
