import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, post, del, put } from './client';
import { useAuth } from '../context/auth';
import { ApiError, Question, Survey, SurveyAssignment, User } from './types';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export function useLogin() {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation<
    { user: User; token: string },
    ApiError,
    { email: string; password: string }
  >({
    mutationFn: (credentials) => post('/users/sign_in', { auth: credentials }),
    onSuccess: (response) => {
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      navigate('/survey');
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Login failed',
        description: error.response?.data?.message || 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => get('/api/v1/users'),
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation<
    { user: User; token: string },
    ApiError,
    { email: string; password: string; role: string }
  >({
    mutationFn: (userData) => post('/users', { user: userData }),
    onSuccess: (response) => {
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      navigate('/login');
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
}

// Survey hooks
export function useSurveys() {
  return useQuery<Survey[]>({
    queryKey: ['surveys'],
    queryFn: () => get('/api/v1/surveys'),
  });
}

export function useCreateSurvey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (survey: { name: string; description: string }) =>
      post('/api/v1/surveys', { survey }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
    },
  });
}

export function useSurveyQuestions(surveyId: number) {
  return useQuery<Question[]>({
    queryKey: ['surveyQuestions', surveyId],
    queryFn: () => get(`/api/v1/surveys/${surveyId}/questions`),
  });
}

export function useCreateSurveyQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ surveyId, question }: { surveyId: number; question: any }) =>
      post(`/api/v1/surveys/${surveyId}/questions`, { question }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveyQuestions'] });
    },
  });
}

export function useAssignSurvey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      surveyId,
      assignedTo,
    }: {
      surveyId: number;
      assignedTo: number;
    }) =>
      post('/api/v1/survey_assignments', {
        survey_assignment: { survey_id: surveyId, assigned_to: assignedTo },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
    },
  });
}

export function useSurvey(surveyId: number) {
  return useQuery<Survey>({
    queryKey: ['survey', surveyId],
    queryFn: () => get(`/api/v1/surveys/${surveyId}`),
  });
}

export function useCompleteSurvey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      surveyId,
      responses,
    }: {
      surveyId: number;
      responses: any;
    }) => post(`/api/v1/surveys/${surveyId}/complete`, { responses }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
    },
  });
}

export function useSurveyAssignments(surveyId: number) {
  return useQuery<SurveyAssignment[]>({
    queryKey: ['surveyAssignments', surveyId],
    queryFn: () => get(`/api/v1/surveys/${surveyId}/assignments`),
    refetchInterval: 5000,
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      surveyId,
      questionId,
    }: {
      surveyId: number;
      questionId: number;
    }) => del(`/api/v1/surveys/${surveyId}/questions/${questionId}`),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['surveyQuestions', variables.surveyId],
      });
    },
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      surveyId,
      questionId,
      data,
    }: {
      surveyId: number;
      questionId: number;
      data: Partial<Question>;
    }) =>
      put(`/api/v1/surveys/${surveyId}/questions/${questionId}`, {
        question: data,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['surveyQuestions', variables.surveyId],
      });
    },
  });
}

export function useDeleteSurvey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (surveyId: number) => del(`/api/v1/surveys/${surveyId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
    },
  });
}
