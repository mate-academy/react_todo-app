import { State } from '../react-app-env';

export const getTodosSelector = ({ todoList }: State) => todoList;

export const getShowBySelector = ({ showBy }: State) => showBy;
