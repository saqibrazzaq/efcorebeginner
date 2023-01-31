import { IconButton, Tooltip } from '@chakra-ui/react'
import { AiOutlinePlus } from "react-icons/ai";

interface IconProps {
  size?: string;
  fontSize?: string;
}

const AddIcon = ({size = "sm", fontSize = "18"}: IconProps) => {
  return (
    <Tooltip label="Add">
    <IconButton
      variant="outline"
      size={size}
      fontSize={fontSize}
      colorScheme="blue"
      icon={<AiOutlinePlus />}
      aria-label="Add"
    />
    </Tooltip>
  )
}

export default AddIcon