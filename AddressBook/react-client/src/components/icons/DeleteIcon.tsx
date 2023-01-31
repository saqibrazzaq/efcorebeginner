import { IconButton, Tooltip } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";

interface IconProps {
  size?: string;
  fontSize?: string;
}

const DeleteIcon = ({size = "sm", fontSize = "18"}: IconProps) => {
  return (
    <Tooltip label="Delete">
      <IconButton
        variant="outline"
        size={size}
        fontSize={fontSize}
        colorScheme="red"
        icon={<AiFillDelete />}
        aria-label="Delete"
      />
    </Tooltip>
  );
}

export default DeleteIcon