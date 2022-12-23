import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface AlertMessageProps {
  title?: string;
  description?: string;
  status?: string;
}

const AlertBox: React.FC<AlertMessageProps> = (props) => {
  return (
    <Alert status={props.status == "success" ? "success" : "error"}>
      <AlertIcon />
      <AlertTitle>{props.title ?? "Title"}</AlertTitle>
      <AlertDescription>
        {props.description ?? "Description"}
      </AlertDescription>
    </Alert>
  );
};

export { AlertBox };