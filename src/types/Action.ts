import { ReducerNewUserType } from '../enums/ReducerNewUserType';
import { ReducerTempTodoType } from '../enums/ReducerTempTodoType';

export type Action = { type: ReducerTempTodoType.RESET; } |
{ type: ReducerTempTodoType.TITLE; newTitle: string; } |
{ type: ReducerTempTodoType.ID; newId: number; } |
{ type: ReducerNewUserType.RESET } |
{ type: ReducerNewUserType.ID; newID: number; } |
{ type: ReducerNewUserType.NAME; newName: string } |
{ type: ReducerNewUserType.EMAIL; newEmail: string };
