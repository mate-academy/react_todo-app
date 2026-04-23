import React from 'react';

const TitleBase: React.FC = () => {
  return <div className="todoapp__title">todos</div>;
};

export const Title = React.memo(TitleBase);
