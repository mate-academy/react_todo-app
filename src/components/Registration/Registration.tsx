import React, { useState } from 'react';
import { User } from '../../types/User';
import { Error } from '../Error/Error';
import { createUser, getUser } from '../../api/users';
import { errorObject } from '../../constants/constants';

type Props = {
  setCurrentUser: (newValue: User | null) => void,
  setErrorType: React.Dispatch<React.SetStateAction<string | null>>,
  errorType: string | null,
  setError: (typeOfError: string | null) => void,
};

export const Registration: React.FC<Props> = React.memo(
  ({
    setCurrentUser,
    setErrorType,
    errorType,
    setError,
  }) => {
    const [isRegistrated, setIsRegistrated] = useState(true);
    const logIn = async (email: string) => {
      try {
        const usersFromServer = await getUser(email);
        const foundUser = usersFromServer[0];

        if (!usersFromServer.length) {
          setIsRegistrated(false);
          setError(errorObject.LoginError);
        }

        setCurrentUser(foundUser);
      } catch (error) {
        setError(errorObject.LoginError);
      }
    };

    const signIn = async (user: Omit<User, 'id'>) => {
      try {
        const newUser = await createUser(user);

        setCurrentUser(newUser);
      } catch (error) {
        setIsRegistrated(false);
        setError(errorObject.SignInError);
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
          <div className="registration__wrapper">
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
        <Error
          setErrorType={setErrorType}
          errorMessage={errorType}
        />
      </>
    );
  },
);
