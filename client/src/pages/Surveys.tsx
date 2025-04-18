import {
  Badge,
  Box,
  Button,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useSurveys } from '../api/hooks';
import { useAuth } from '../context/auth';
import { CreateSurveyModal } from '../components/CreateSurveyModal';
import { Loading } from '../components/Loading';
import { FiEdit2, FiEye, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDeleteSurvey } from '../api/hooks';
import { useQueryClient } from '@tanstack/react-query';

export function Surveys() {
  const { user } = useAuth();
  const { data: surveys, isPending } = useSurveys();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteSurvey } = useDeleteSurvey();

  const handleDelete = (surveyId: number) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      deleteSurvey(surveyId, {
        onSuccess: () => {
          toast({
            title: 'Survey deleted successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          queryClient.invalidateQueries({ queryKey: ['surveys'] });
        },
        onError: () => {
          toast({
            title: 'Failed to delete survey',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
      });
    }
  };

  if (isPending) return <Loading />;

  return (
    <Box>
      <Heading mb={4}>Surveys</Heading>
      {user?.role === 'admin' && (
        <Button onClick={onOpen} mb={4}>
          Create Survey
        </Button>
      )}

      <Tbody>
        {surveys?.map((survey) => (
          <Tr key={survey.id}>
            <Td>{survey.name}</Td>
            <Td>{survey.description}</Td>
            <Td>
              <Badge
                colorScheme={
                  survey.status === 'COMPLETED'
                    ? 'green'
                    : survey.status === 'ASSIGNED'
                    ? 'blue'
                    : 'gray'
                }
              >
                {survey.status}
              </Badge>
            </Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Actions"
                  icon={<FiMoreVertical />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem
                    icon={<FiEye />}
                    onClick={() => navigate(`/surveys/${survey.id}`)}
                  >
                    View Details
                  </MenuItem>
                  {user?.role === 'admin' && (
                    <>
                      <MenuItem
                        icon={<FiEdit2 />}
                        onClick={() => navigate(`/surveys/${survey.id}/edit`)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        icon={<FiTrash2 />}
                        color="red.500"
                        onClick={() => handleDelete(survey.id)}
                      >
                        Delete
                      </MenuItem>
                    </>
                  )}
                  {user?.role === 'manager' && survey.status === 'NEW' && (
                    <MenuItem
                      icon={<FiEdit2 />}
                      onClick={() => navigate(`/surveys/${survey.id}/edit`)}
                    >
                      Edit
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>

      <CreateSurveyModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
