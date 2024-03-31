import React from 'react';
import { Status } from '../enums/status';

export const FilterContext = React.createContext({
  status: Status.all,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setStatus: (_status: Status) => {},
});
