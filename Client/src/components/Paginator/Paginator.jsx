import { Button, HStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Paginator = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const generatePageButtons = () => {
    const buttons = [];

    buttons.push(
      <Button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        colorScheme="teal"
        leftIcon={<ChevronLeftIcon />}
      />
    );

    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          colorScheme={currentPage === page ? 'teal' : 'gray'}
        >
          {page}
        </Button>
      );
    }

    buttons.push(
      <Button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        colorScheme="teal"
        rightIcon={<ChevronRightIcon />}
      />
    );

    return buttons;
  };

  return (
    <HStack spacing={2} mt={4} p={50} w="full" alignItems="center" justifyContent="center">
      {generatePageButtons()}
    </HStack>
  );
};

export default Paginator;
