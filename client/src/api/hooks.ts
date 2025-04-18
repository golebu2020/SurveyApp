import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, post } from './client';
import { useAuth } from '../context/auth';
import { Survey } from './types';

// Auth hooks
export function useLogin() {
  const { login } = useAuth();
  return useMutation<void, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => login(email, password),
  });
}

export function useRegister() {
  const { register } = useAuth();
  return useMutation<
    void,
    Error,
    { email: string; password: string; role: string }
  >({
    mutationFn: ({ email, password, role }) => register(email, password, role),
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
  return useQuery({
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
