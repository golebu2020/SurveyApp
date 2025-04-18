import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useCompleteSurvey, useSurveyQuestions } from '../api/hooks';
import { useForm } from 'react-hook-form';

export function CompleteSurvey({ surveyId }: { surveyId: number }) {
  const { data: questions } = useSurveyQuestions(surveyId);
  const { register, handleSubmit } = useForm();
  const { mutate: completeSurvey, isPending } = useCompleteSurvey();

  const onSubmit = (data: any) => {
    const responses = questions?.map((question: any) => ({
      question_id: question.id,
      answer: data[`question_${question.id}`],
    }));

    completeSurvey({ surveyId, responses });
  };

  const renderInput = (question: any) => {
    switch (question.data_type) {
      case 'text':
        return <Textarea {...register(`question_${question.id}`)} />;
      case 'scale':
        return (
          <RadioGroup>
            <Stack direction="row">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <Radio
                  key={num}
                  value={num.toString()}
                  {...register(`question_${question.id}`)}
                >
                  {num}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        );
      case 'boolean':
        return (
          <RadioGroup>
            <Stack direction="row">
              <Radio value="true" {...register(`question_${question.id}`)}>
                Yes
              </Radio>
              <Radio value="false" {...register(`question_${question.id}`)}>
                No
              </Radio>
            </Stack>
          </RadioGroup>
        );
      default:
        return <Input {...register(`question_${question.id}`)} />;
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading size="md" mb={6}>
        Complete Survey
      </Heading>
      <VStack spacing={6} align="stretch">
        {questions?.map((question: any) => (
          <FormControl key={question.id}>
            <FormLabel>{question.label}</FormLabel>
            {question.info && (
              <Box fontSize="sm" color="gray.500" mb={2}>
                {question.info}
              </Box>
            )}
            {renderInput(question)}
          </FormControl>
        ))}
        <Button type="submit" isLoading={isPending} colorScheme="blue" mt={4}>
          Submit Survey
        </Button>
      </VStack>
    </Box>
  );
}
