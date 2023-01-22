import { IconButton, Tooltip } from '@chakra-ui/react';
import { HiOutlineTranslate } from "react-icons/hi";

const TranslationIcon = () => {
  return (
    <Tooltip label="Translate">
      <IconButton
        variant="outline"
        size="sm"
        fontSize="18px"
        colorScheme="blue"
        icon={<HiOutlineTranslate />}
        aria-label="Translate"
      />
    </Tooltip>
  );
}

export default TranslationIcon