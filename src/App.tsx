/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

import './App.scss';

import { FilterType } from './types/FilterType';

import { AppContent } from './components/AppContent';

export const App: React.FC = () => {
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);

  return <AppContent filterType={filterType} setFilterType={setFilterType} />;
};
