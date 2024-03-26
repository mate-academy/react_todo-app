import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { Error } from '../Error/Error';
import { createUser, getUser } from '../../api/users';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';
import { clearError, setError } from '../../app/features/error';

type Props = {
  setCurrentUser: (newValue: User | null) => void,
};

export const Registration: React.FC<Props> = React.memo(
  ({
    setCurrentUser,
  }) => {
    const [isRegistrated, setIsRegistrated] = useState(true);
    const dispatch = useAppDispatch();
    const logIn = async (email: string) => {
      try {
        const usersFromServer = await getUser(email);
        const foundUser = usersFromServer[0];

        if (!usersFromServer.length) {
          setIsRegistrated(false);
          dispatch(setError('User was not found! Please register!'));
        }

        setCurrentUser(foundUser);
      } catch (error) {
        dispatch(setError('User was not found! Please register!'));
      } finally {
        setTimeout(() => {
          dispatch(clearError());
        }, 3000);
      }
    };

    const signIn = async (user: Omit<User, 'id'>) => {
      try {
        const newUser = await createUser(user);

        setCurrentUser(newUser);
      } catch (error) {
        setIsRegistrated(false);
        dispatch(setError('Registration error'));
      } finally {
        setTimeout(() => {
          dispatch(clearError());
        }, 3000);
      }
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.currentTarget;
      const emailInput = form.elements.namedItem('email') as HTMLInputElement;

      const newUser: Omit<User, 'id'> = {
        email: emailInput.value.trim().toLowerCase(),
      };

      if (isRegistrated) {
        logIn(newUser.email);
      } else {
        signIn(newUser);
      }
    };

    return (
      <>
        <div className="registration">
          <div className={classNames('registration__wrapper', {
            'registration__wrapper--signIn': !isRegistrated,
          })}
          >
            <h2>{isRegistrated ? 'Please log in' : 'Please sign in'}</h2>
            <form onSubmit={onSubmit} className="form registration__form">
              <div className="form__input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form__input-box form__button">
                <input
                  type="submit"
                  value={isRegistrated ? 'Log in' : 'Register Now'}
                />
              </div>
            </form>
          </div>
        </div>
        <Error />
      </>
    );
  },
);
