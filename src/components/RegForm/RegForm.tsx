import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addUser } from '../../api/user';
import { InputUserID } from '../InputUserID/InputUserID';
import { Inputs } from '../../types/Inputs';
import { InputName } from '../InputName/InputName';
import { InputEmail } from '../InputEmail/InputEmail';

export const RegForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'all',
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsLoading(true);
    try {
      await addUser(data);

      localStorage.setItem('userID', (data.id.toString()));

      navigate('/auth');
    } catch (e) {
      Swal.fire('Whoops!', 'This User ID is already exists', 'error');
    }

    setIsLoading(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="box">
      <div className="control has-icons-right">
        <h1 className="title">Registration</h1>
        <span className="icon is-large has-text-success  is-right">
          <i className="fa-brands fa-wpforms" />
        </span>
      </div>

      <div className="field">
        <InputUserID
          error={errors.id}
          register={register}
          message={errors.id?.message}
        />
      </div>

      <div className="field">
        <InputName
          error={errors.name}
          register={register}
          message={errors.name?.message}
        />
      </div>

      <div className="field">
        <InputEmail
          error={errors.email}
          register={register}
          message={errors.email?.message}
        />
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={!isValid}
            className={classNames(
              'button is-link',
              { 'is-loading': isLoading },
            )}
          >
            Submit
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={() => navigate('/auth')}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
