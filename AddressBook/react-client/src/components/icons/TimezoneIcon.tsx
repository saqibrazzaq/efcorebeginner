import { IconButton, Tooltip } from '@chakra-ui/react';
import { BiWorld } from "react-icons/bi";

const TimezoneIcon = () => {
  return (
    <Tooltip label="Time Zone">
      <IconButton
        variant="outline"
        size="sm"
        fontSize="18px"
        colorScheme="blue"
        icon={<BiWorld />}
        aria-label="Time Zone"
      />
    </Tooltip>
  );
}

export default TimezoneIcon