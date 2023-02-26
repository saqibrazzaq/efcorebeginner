import { IconButton, Tooltip } from '@chakra-ui/react';
import { BiWorld } from "react-icons/bi";

interface IconProps {
  size?: string;
  fontSize?: string;
}

const TimezoneIcon = ({size = "sm", fontSize = "18"}: IconProps) => {
  return (
    <Tooltip label="Time Zone">
      <IconButton
        variant="outline"
        size={size}
        fontSize={fontSize}
        colorScheme="blue"
        icon={<BiWorld />}
        aria-label="Time Zone"
      />
    </Tooltip>
  );
}

export default TimezoneIcon