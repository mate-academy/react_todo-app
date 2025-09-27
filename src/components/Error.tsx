// import React from 'react';
// import classNames from 'classnames';

// type Props = {
//   error: string;
//   onClose: () => void;
// };

// export const Error: React.FC<Props> = ({ error, onClose }) => {
//   return (
//     <div
//       data-cy="ErrorNotification"
//       className={classNames(
//         'notification',
//         'is-danger',
//         'is-light',
//         'has-text-weight-normal',
//         { hidden: !error },
//       )}
//     >
//       <button
//         data-cy="HideErrorButton"
//         type="button"
//         className="delete"
//         onClick={onClose}
//       />
//       <br />
//       {error}
//     </div>
//   );
// };

// import React, { useContext } from 'react';
import classNames from 'classnames';
import { useTodos } from '../context/TodosContext';

export const Error: React.FC = () => {
  const { error, setError } = useTodos();

  if (!error) {
    return null;
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      <br />
      {error}
    </div>
  );
};
