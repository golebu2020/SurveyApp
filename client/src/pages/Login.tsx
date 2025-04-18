import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
  Heading,
  useColorModeValue,
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

  const cardBg = useColorModeValue('white', 'gray.700');
  const cardShadow = useColorModeValue('sm', 'dark-lg');

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={20}
      p={8}
      bg={cardBg}
      boxShadow={cardShadow}
      borderRadius="lg"
    >
      <Heading size="xl" mb={8} textAlign="center">
        Welcome Back
      </Heading>

      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={6}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel fontSize="sm" fontWeight="medium">
            Email
          </FormLabel>
          <Input
            type="email"
            size="md"
            {...register('email', { required: 'Email is required' })}
            focusBorderColor="blue.400"
          />
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel fontSize="sm" fontWeight="medium">
            Password
          </FormLabel>
          <Input
            type="password"
            size="md"
            {...register('password', { required: 'Password is required' })}
            focusBorderColor="blue.400"
          />
        </FormControl>

        <Button
          type="submit"
          isLoading={isPending}
          colorScheme="blue"
          width="full"
          size="md"
          mt={4}
        >
          Sign In
        </Button>

        <Text mt={6} textAlign="center" fontSize="sm" color="gray.500">
          Don't have an account?{' '}
          <Link
            as={RouterLink}
            to="/register"
            color="blue.500"
            fontWeight="medium"
          >
            Create account
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
