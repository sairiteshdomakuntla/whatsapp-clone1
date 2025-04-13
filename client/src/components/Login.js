// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useUserContext } from '../context/userContext';
// import useMounted from '../hooks/useMounted';
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputRightElement,
//   VStack,
//   Button,
//   useToast,
// } from '@chakra-ui/react';
// import { FiEye, FiEyeOff } from 'react-icons/fi';

// const initialCredential = {
//   email: '',
//   password: '',
// };

// function Login() {
//   const { login } = useUserContext();
//   const history = useHistory();

//   const [credentials, setCredentials] = useState(initialCredential);
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);
//   const toast = useToast();
//   const mounted = useMounted();

//   const handleShow = () => setShow((prev) => !prev);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = credentials.email.trim();
//     const password = credentials.password.trim();

//     if (!email || !password) {
//       return toast({
//         position: 'top',
//         title: 'Invalid Input',
//         description: 'Provide all the credentials',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }

//     setLoading(true);
//     try {
//       const user = await login(email, password, history.push.bind(history));
//       if (!user) {
//         throw new Error('Invalid email or password');
//       }
//     } catch (err) {
//       toast({
//         position: 'top',
//         title: 'Login Failed',
//         description: err.message || 'Unable to login. Please try again.',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       if (mounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <VStack spacing='4' as='form' onSubmit={handleSubmit}>
//       <FormControl isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//           autoFocus
//           type='email'
//           name='email'
//           variant='filled'
//           focusBorderColor='green.500'
//           placeholder='Enter your email'
//           value={credentials.email}
//           onChange={handleChange}
//         />
//       </FormControl>
//       <FormControl isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup size='md'>
//           <Input
//             name='password'
//             pr='4.5rem'
//             variant='filled'
//             focusBorderColor='green.500'
//             type={show ? 'text' : 'password'}
//             placeholder='Enter password'
//             value={credentials.password}
//             onChange={handleChange}
//           />
//           <InputRightElement width='3rem'>
//             <Button h='1.75rem' size='sm' variant='ghost' onClick={handleShow}>
//               {show ? <FiEyeOff /> : <FiEye />}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <Button
//         type='submit'
//         isFullWidth
//         isLoading={loading}
//         isDisabled={loading}
//         colorScheme='whatsapp'
//       >
//         Login
//       </Button>
//     </VStack>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import useMounted from '../hooks/useMounted';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const initialCredential = {
  email: '',
  password: '',
};

function Login() {
  const { login } = useUserContext();
  const history = useHistory();

  const [credentials, setCredentials] = useState(initialCredential);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const mounted = useMounted();

  const handleShow = () => setShow((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = credentials.email.trim();
    const password = credentials.password.trim();

    if (!email || !password) {
      return toast({
        position: 'top',
        title: 'Invalid Input',
        description: 'Provide all the credentials',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(true);
    try {
      const user = await login(email, password, history.push.bind(history));
      if (!user) {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      toast({
        position: 'top',
        title: 'Login Failed',
        description: err.message || 'Unable to login. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <VStack spacing='4' as='form' onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          autoFocus
          type='email'
          name='email'
          variant='filled'
          focusBorderColor='green.500'
          placeholder='Enter your email'
          value={credentials.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            name='password'
            pr='4.5rem'
            variant='filled'
            focusBorderColor='green.500'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            value={credentials.password}
            onChange={handleChange}
          />
          <InputRightElement width='3rem'>
            <Button h='1.75rem' size='sm' variant='ghost' onClick={handleShow}>
              {show ? <FiEyeOff /> : <FiEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        type='submit'
        isFullWidth
        isLoading={loading}
        isDisabled={loading}
        colorScheme='whatsapp'
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
