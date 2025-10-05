import React, { FC } from 'react';

type Props = {
  title: string;
};

export const Title: FC<Props> = ({ title }) => {
  return <h1 className="todoapp__title">{title}</h1>;
};
