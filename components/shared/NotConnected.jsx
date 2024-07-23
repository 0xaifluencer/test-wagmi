import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertTitle } from "@/components/ui/alert";

const NotConnected = () => {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
    </Alert>
  );
};

export default NotConnected;
