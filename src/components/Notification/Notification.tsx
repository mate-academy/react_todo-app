import { NotificationType } from '../../types/NotificationType';
import { Error } from '../Error/Error';

type Props = {
  notification: NotificationType;
  errorText: string;
  closeNotification: () => void;
};

export const Notification: React.FC<Props> = (
  {
    notification,
    errorText,
    closeNotification,
  },
) => {
  return (
    <>
      {notification === NotificationType.error && (
        <Error
          errorText={errorText}
          closeNotification={closeNotification}
        />
      )}
    </>
  );
};
