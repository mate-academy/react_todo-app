import { FC, useState } from 'react';
import classNames from 'classnames';

type Props = {
  name: string;
  type: string;
  value: string;
  required?: boolean,
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void,
};

export const Field: FC<Props> = ({
  name,
  type,
  value,
  required = false,
  onChange,
}) => {
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;

  return (
    <div className="field">
      <div className="control">
        <input
          type={type}
          id={name}
          name={name}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={`Enter your ${name}`}
          value={value}
          onChange={onChange}
          onBlur={() => setToched(true)}

        />
      </div>
      {hasError && (
        <p className="help is-danger">{`${name} is required`}</p>
      )}
    </div>
  );
};
