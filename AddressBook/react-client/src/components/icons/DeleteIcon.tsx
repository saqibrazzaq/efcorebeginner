import { IconButton, Tooltip } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";

const DeleteIcon = () => {
  return (
    <Tooltip label="Delete">
      <IconButton
        variant="outline"
        size="sm"
        fontSize="18px"
        colorScheme="red"
        icon={<AiFillDelete />}
        aria-label="Delete"
      />
    </Tooltip>
  );
}

export default DeleteIcon