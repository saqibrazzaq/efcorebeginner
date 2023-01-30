import { IconButton, Tooltip } from '@chakra-ui/react'
import { AiOutlinePlus } from "react-icons/ai";

const AddIcon = () => {
  return (
    <Tooltip label="Add">
    <IconButton
      variant="outline"
      size="sm"
      fontSize="18px"
      colorScheme="blue"
      icon={<AiOutlinePlus />}
      aria-label="Add"
    />
    </Tooltip>
  )
}

export default AddIcon