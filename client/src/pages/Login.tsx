import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../api/hooks';

interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
      </FormControl>

      <Button
        type="submit"
        isLoading={isPending} // Changed to isPending
        colorScheme="blue"
        width="full"
      >
        Login
      </Button>
    </VStack>
  );
}
