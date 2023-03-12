import {
  ChangeEvent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Context } from '../context';
import { ReducerNewUserType } from '../enums/ReducerNewUserType';
import { Error } from '../enums/Error';
import { User } from '../types/User';

export function useRegForm(newUser: User, dispatch: any) {
  const { setCurrentError } = useContext(Context);
  const [isDirtyName, setDirtyName] = useState(false);

  const [isDirtyEmail, setDirtyEmail] = useState(false);

  const [isDirtyId, setDirtyId] = useState(false);

  const [isSuccessId, setIsSuccessId] = useState(false);
  const [isSuccessName, setIsSuccessName] = useState(false);
  const [isSuccessEmail, setIsSuccessEmail] = useState(false);

  const isValidName = useCallback(() => {
    if (!newUser.name.trim()) {
      setCurrentError(Error.NAME);
      setDirtyName(true);
      setIsSuccessName(true);
    }

    if (newUser.name.trim()) {
      setIsSuccessName(true);
    }
  }, []);

  const isValidEmail = useCallback(() => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!newUser.email.trim()) {
      setCurrentError(Error.EMAIL_EMPTY);
      setDirtyEmail(true);
    }

    if (!regex.test(newUser.email)) {
      setCurrentError(Error.EMAIL_WRONG);
      setDirtyEmail(true);
    }

    setIsSuccessEmail(true);
  }, []);

  const inputIdHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerNewUserType.ID,
      newID: +e.target.value.replace(/[^0-9]/g, ''),
    });
  }, []);

  const inputNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerNewUserType.NAME,
      newName: e.target.value.replace(/[^A-Za-z\s^А-яЁё]/gi, ''),
    });
  }, []);

  const inputEmailHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerNewUserType.EMAIL,
      newEmail: e.target.value,
    });
  }, []);

  const onFocusName = () => {
    setDirtyName(false);
    setIsSuccessName(false);
  };

  const onFocusId = () => {
    setDirtyId(false);
    setIsSuccessId(false);
  };

  const onFocusEmail = () => {
    setDirtyEmail(false);
    setIsSuccessEmail(false);
  };

  return [
    onFocusId,
    isDirtyName,
    isDirtyEmail,
    isDirtyId,
    isSuccessName,
    isSuccessId,
    isSuccessEmail,
    isValidEmail,
    isValidName,
    inputIdHandler,
    inputEmailHandler,
    inputNameHandler,
    onFocusEmail,
    onFocusName,
    setIsSuccessId,
    setDirtyId,
  ];
}
