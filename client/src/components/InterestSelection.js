// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import styled from 'styled-components';
// import { useUserContext } from '../context/userContext';
// import { useChatContext } from '../context/chatContext';
// import { useToast } from '@chakra-ui/react';
// import axios from '../utils/axiosConfig';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   background-color: #f0f2f5;
//   padding: 20px;
// `;

// const Title = styled.h1`
//   color: #111b21;
//   margin-bottom: 2rem;
//   font-size: 2rem;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 2rem;
// `;

// const InterestButton = styled.button`
//   padding: 1rem 2rem;
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   cursor: pointer;
//   background-color: ${props => props.selected ? '#25D366' : '#ffffff'};
//   color: ${props => props.selected ? '#ffffff' : '#111b21'};
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }
// `;

// const SubmitButton = styled.button`
//   padding: 1rem 2rem;
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   cursor: pointer;
//   background-color: #25D366;
//   color: #ffffff;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }
// `;

// const InterestSelection = () => {
//   const [selectedInterest, setSelectedInterest] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [mounted, setMounted] = useState(true);
//   const history = useHistory();
//   const { currentUser, authLoading, checkAuth, updateUser } = useUserContext();
//   const { setChats, fetchUserChats } = useChatContext();
//   const toast = useToast();

//   useEffect(() => {
//     let isMounted = true;

//     const checkUserInterest = async () => {
//       // Don't do anything while auth is loading
//       if (authLoading) {
//         return;
//       }

//       // Only redirect to login if we're sure there's no user and auth is complete
//       if (!authLoading && !currentUser && isMounted) {
//         history.push('/login');
//         return;
//       }

//       // Pre-select the user's current interest if they have one
//       if (!authLoading && currentUser?.interest && isMounted) {
//         setSelectedInterest(currentUser.interest);
//       }
//     };

//     checkUserInterest();

//     return () => {
//       isMounted = false;
//     };
//   }, [history, currentUser, authLoading]);

//   useEffect(() => {
//     return () => {
//       setMounted(false);
//     };
//   }, []);

//   const handleInterestSelect = (interest) => {
//     setSelectedInterest(interest);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!mounted) return;
    
//     if (!selectedInterest) {
//       toast({
//         title: "Please select an interest",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }
    
//     try {
//       setLoading(true);
//       console.log('Setting user interest...');

//       const response = await axios.put(
//         '/api/user/set-interest',
//         { interest: selectedInterest }
//       );

//       if (!mounted) return;

//       if (response.data.success) {
//         try {
//           // Join or create Cricket Community group
//           await axios.post('/api/chat/group', {
//             name: "Cricket Community",
//             users: [], // Server will handle users
//             isSpecialGroup: true
//           });
          
//           // Fetch updated user data
//           await checkAuth();
          
//           // Fetch all chats to ensure the group appears
//           await fetchUserChats();
          
//           await updateUser({ interest: selectedInterest });
          
//           toast({
//             title: "Interest set successfully",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//             position: "bottom",
//           });
          
//           history.push('/');
//         } catch (groupError) {
//           console.error('Error with Cricket Community group:', groupError);
//           // Continue with navigation even if group creation fails
//           toast({
//             title: "Interest set, but group joining failed",
//             description: "You may need to refresh to see the community group",
//             status: "warning",
//             duration: 5000,
//             isClosable: true,
//           });
//           history.push('/');
//         }
//       }
//     } catch (error) {
//       if (!mounted) return;
//       toast({
//         title: "Failed to set interest",
//         description: error.response?.data?.message || "Please try again",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       if (mounted) {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <Container>
//       <Title>Select Your Interest</Title>
//       <ButtonGroup>
//         <InterestButton
//           selected={selectedInterest === 'Playing Cricket'}
//           onClick={() => handleInterestSelect('Playing Cricket')}
//           disabled={loading}
//         >
//           Playing Cricket
//         </InterestButton>
//         <InterestButton
//           selected={selectedInterest === 'Watching Cricket'}
//           onClick={() => handleInterestSelect('Watching Cricket')}
//           disabled={loading}
//         >
//           Watching Cricket
//         </InterestButton>
//       </ButtonGroup>
//       {selectedInterest && (
//         <SubmitButton 
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? 'Submitting...' : 'Submit'}
//         </SubmitButton>
//       )}
//     </Container>
//   );
// };

// export default InterestSelection; 



import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../context/userContext';
import { useChatContext } from '../context/chatContext';
import { useToast } from '@chakra-ui/react';
import axios from '../utils/axiosConfig';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

const Title = styled.h1`
  color: #111b21;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InterestButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${props => props.selected ? '#25D366' : '#ffffff'};
  color: ${props => props.selected ? '#ffffff' : '#111b21'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #25D366;
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const InterestSelection = () => {
  const [selectedInterest, setSelectedInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const history = useHistory();
  const { currentUser, authLoading, checkAuth, updateUser } = useUserContext();
  const { setChats, fetchUserChats } = useChatContext();
  const toast = useToast();

  useEffect(() => {
    let isMounted = true;

    const checkUserInterest = async () => {
      if (authLoading) {
        return;
      }

      if (!authLoading && !currentUser && isMounted) {
        history.push('/login');
        return;
      }

      if (!authLoading && currentUser?.interest && isMounted) {
        setSelectedInterest(currentUser.interest);
      }
    };

    checkUserInterest();

    return () => {
      isMounted = false;
    };
  }, [history, currentUser, authLoading]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  const handleInterestSelect = (interest) => {
    setSelectedInterest(interest);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mounted) return;

    if (!selectedInterest) {
      toast({
        title: "Please select an interest",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      console.log('Setting user interest...');

      const response = await axios.put(
        '/api/user/set-interest',
        { interest: selectedInterest }
      );

      if (!mounted) return;

      if (response.data.success) {
        try {
          await axios.post('/api/chat/group', {
            name: "Cricket Community",
            users: [],
            isSpecialGroup: true
          });

          await checkAuth();
          await fetchUserChats();
          await updateUser({ interest: selectedInterest });

          toast({
            title: "Interest set successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });

          history.push('/');
        } catch (groupError) {
          console.error('Error with Cricket Community group:', groupError);
          toast({
            title: "Interest set, but group joining failed",
            description: "You may need to refresh to see the community group",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          history.push('/');
        }
      }
    } catch (error) {
      if (!mounted) return;
      toast({
        title: "Failed to set interest",
        description: error.response?.data?.message || "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Title>Select Your Interest</Title>
      <ButtonGroup>
        <InterestButton
          selected={selectedInterest === 'Playing Cricket'}
          onClick={() => handleInterestSelect('Playing Cricket')}
          disabled={loading}
        >
          Playing Cricket
        </InterestButton>
        <InterestButton
          selected={selectedInterest === 'Watching Cricket'}
          onClick={() => handleInterestSelect('Watching Cricket')}
          disabled={loading}
        >
          Watching Cricket
        </InterestButton>
      </ButtonGroup>
      {selectedInterest && (
        <SubmitButton 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </SubmitButton>
      )}
    </Container>
  );
};

export default InterestSelection;
