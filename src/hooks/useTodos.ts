import React from 'react';

import { TodosContext } from '../utils/TodosContext';
import { State } from '../type/type';

export const useTodos = () => React.useContext<State>(TodosContext);
