import classNames from 'classnames';
import React from 'react';
import { InputProps } from '../../types/InputProps';

export const InputEmail: React.FC<InputProps> = ({
  error,
  message,
  register,
}) => (
  <label className="label">
    Email
    <div className="control has-icons-left has-icons-right">
      <input
        type="email"
        {...register('email', { required: 'Please enter your Email!' })}
        className={classNames(
          'input',
          { 'is-danger': error },
        )}
        placeholder="email@gmail.com"
      />

      <span className="icon is-small is-left">
        <i className="fas fa-envelope" />
      </span>

      {error && (
        <span className="help is-danger">{message}</span>
      )}
    </div>
  </label>
);
