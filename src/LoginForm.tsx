import React, { useState } from 'react';
import { RegisterForm } from './RegisterForm';
import { SingInForm } from './SingInForm';

export const LoginForm = React.memo(() => {
  const [isMember, setIsMember] = useState(true);

  if (isMember) {
    return <SingInForm onSetTypeForm={setIsMember} />;
  }

  return <RegisterForm onSetTypeForm={setIsMember} />;
});
