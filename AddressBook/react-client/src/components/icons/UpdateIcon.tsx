import { IconButton, Tooltip } from '@chakra-ui/react'
import { AiFillEdit } from "react-icons/ai";

interface IconProps {
  size?: string;
  fontSize?: string;
}

const UpdateIcon = ({size = "sm", fontSize = "18"}: IconProps) => {
  return (
    <Tooltip label="Edit">
    <IconButton
      variant="outline"
      size={size}
      fontSize={fontSize}
      colorScheme="blue"
      icon={<AiFillEdit />}
      aria-label="Edit"
    />
    </Tooltip>
  )
}

export default UpdateIcon