import classNames from 'classnames';
import React from 'react';
import { InputProps } from '../../types/InputProps';
import { RegExp } from '../../constants/RegExp';

export const InputName: React.FC<InputProps> = ({
  register,
  error,
  message,
}) => (
  <label className="label">
    Name
    <div className="control has-icons-left has-icons-right">
      <input
        {...register('name', {
          pattern: RegExp,
          required: 'Please enter your Name!',
        })}
        className={classNames(
          'input',
          { 'is-danger': error },
        )}
        placeholder="Anton Vasyliev"
      />

      <span className="icon is-small is-left">
        <i className="fas fa-user" />
      </span>

      {error && (
        <span className="help is-danger">
          {
            message || 'There are wrong symbols in the name'
          }
        </span>
      )}
    </div>
  </label>
);
