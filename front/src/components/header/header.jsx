import { Link } from 'react-router-dom';
import { Box, Flex, Spacer, Button } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box bg="gray.100" px={4} py={2}>
      <Flex alignItems="center">
        {/* <Box>
          <Link to="/">Task Manager</Link>
        </Box>
        <Spacer /> */}
        <Box>
          <Link to="/board">
            <Link colorScheme="blue" mr={4}>Board</Link>
          </Link>
          <Link to="/tasks">
            <Button colorScheme="blue">Tasks</Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
