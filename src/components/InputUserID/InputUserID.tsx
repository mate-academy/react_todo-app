import classNames from 'classnames';
import React from 'react';
import { InputProps } from '../../types/InputProps';

export const InputUserID: React.FC<InputProps> = ({
  error,
  register,
  message,
}) => (
  <label className="label">
    User ID
    <div className="control has-icons-left has-icons-right">
      <input
        placeholder="Create your User ID"
        className={classNames(
          'input',
          { 'is-danger': error },
        )}
        {...register('id',
          {
            required: 'Can\'t be empty!',
            valueAsNumber: true,
            validate: (value: number) => value > 0,
          })}
      />

      <span className="icon is-small is-left">
        <i className="fa-sharp fa-solid fa-id-badge" />
      </span>

      {error && (
        <span className="help is-danger">
          {
            message || 'Only numbers are allowed'
          }
        </span>
      )}
    </div>
  </label>
);
