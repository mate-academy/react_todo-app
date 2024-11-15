import { FC } from 'react';
import { getTodoErrorsMessage } from '../../utils/todos/getTodoErrorsMessage';
import cn from 'classnames';
import { TodoErrors } from '../../utils/enums/TodoErrors';

interface ErrorNotificationProps {
  error: TodoErrors | null;
}

export const ErrorNotification: FC<ErrorNotificationProps> = ({ error }) => (
  <div
    data-cy="ErrorNotification"
    className={cn('notification is-danger is-light has-text-weight-normal', {
      hidden: !error,
    })}
  >
    <button data-cy="HideErrorButton" type="button" className="delete" />
    {error && getTodoErrorsMessage(error)}
  </div>
);
