import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

type Props = {
  name: string,
  placeholder: string,
  type: string,
  onSubmit: React.Dispatch<React.SetStateAction<string>>,
  onError: React.Dispatch<React.SetStateAction<boolean>>,
};

export const FormInput: React.FC<Props> = ({
  name, placeholder, type, onError, onSubmit,
}) => {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);

  const handlerInput = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      if (!inputValue) {
        setIsError(true);
      } else {
        setIsError(false);
      }

      switch (name) {
        case 'email':
          if (!inputValue.includes('@')
            || !inputValue.includes('.')) {
            setIsError(true);
          }

          break;
        case 'phone':
          if (!inputValue.includes('+')
            || inputValue.length !== 13) {
            setIsError(true);
          }

          break;
        default:
          break;
      }

      if (!isError) {
        onSubmit(inputValue);
      } else {
        onError(true);
      }
    },
    [],
  );

  return (
    <label className="form__label">
      <h3>
        {placeholder}
      </h3>
      <input
        value={value}
        onChange={event => {
          setValue(event.target.value);
        }}
        className={classNames(
          'form__input',
          { 'error-input': isError },
        )}
        type={type}
        name={name}
        placeholder={placeholder}
        onBlur={handlerInput}
      />
      {isError && (
        <div className="error-message">
          Please fill in this field.
          {name === 'email' && (
            ' Email must contain @ and .'
          )}
          {name === 'phone' && (
            ' Phone number with country code'
          )}
        </div>
      )}
    </label>
  );
};
