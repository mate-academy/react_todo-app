import React from 'react';

import { FilterType } from '../../types/FilterType';

export interface Props {
  filter: FilterType;
  onChange: React.Dispatch<React.SetStateAction<FilterType>>;
}
