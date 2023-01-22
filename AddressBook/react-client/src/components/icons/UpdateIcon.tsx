import { IconButton, Tooltip } from '@chakra-ui/react'
import { AiFillEdit } from "react-icons/ai";

const UpdateIcon = () => {
  return (
    <Tooltip label="Edit">
    <IconButton
      variant="outline"
      size="sm"
      fontSize="18px"
      colorScheme="blue"
      icon={<AiFillEdit />}
      aria-label="Edit"
    />
    </Tooltip>
  )
}

export default UpdateIcon