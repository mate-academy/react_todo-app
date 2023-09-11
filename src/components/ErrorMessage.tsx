/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

type Props = {
  isShown: boolean,
  errorContent: string,
};

export const ErrorMessage: React.FC<Props> = ({ isShown, errorContent }) => {
  const [isShowError, setIsShowError] = useState<boolean>(isShown);
  const handleErrorDelete = () => setIsShowError(false);

  return isShowError ? (
    <div
      className="
        notification
        is-danger
        is-light
        has-text-weight-normal
      "
    >
      <button type="button" className="delete" onClick={handleErrorDelete} />
      {errorContent}
    </div>
  ) : (<></>);
};
