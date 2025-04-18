import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSurvey } from '../api/hooks';
import { SurveyQuestions } from '../components/SurveyQestions';
import { SurveyAssignments } from '../components/SurveyAssignments';
import { CompleteSurvey } from '../components/CompleteSurvey';
import { Loading } from '../components/Loading';

export function SurveyDetail() {
  const { id } = useParams();
  const { data: survey, isLoading } = useSurvey(Number(id));

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Heading mb={4}>{survey?.name}</Heading>
      <Box mb={4}>{survey?.description}</Box>

      <Tabs>
        <TabList>
          <Tab>Questions</Tab>
          <Tab>Assignments</Tab>
          {survey?.status === 'ASSIGNED' && <Tab>Complete Survey</Tab>}
        </TabList>

        <TabPanels>
          <TabPanel>
            <SurveyQuestions surveyId={Number(id)} />
          </TabPanel>
          <TabPanel>
            <SurveyAssignments surveyId={Number(id)} />
          </TabPanel>
          {survey?.status === 'ASSIGNED' && (
            <TabPanel>
              <CompleteSurvey surveyId={Number(id)} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
