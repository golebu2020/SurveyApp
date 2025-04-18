import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../api/hooks';
import { Link as RouterLink } from 'react-router-dom';

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
        isLoading={isPending}
        colorScheme="blue"
        width="full"
      >
        Login
      </Button>

      <Text mt={4} textAlign="center">
        Don't have an account?{' '}
        <Link
          as={RouterLink}
          to="/register"
          color="blue.500"
          fontWeight="semibold"
        >
          Register here
        </Link>
      </Text>
    </VStack>
  );
}
