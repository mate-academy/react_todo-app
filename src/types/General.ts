import React from 'react';

export type TyChangeEvtInputElmt = React.ChangeEvent<HTMLInputElement>;
export type TyKeybrEvtInputElmt = React.KeyboardEvent<HTMLInputElement>;
export type TySetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type TyUseState<T> = (initSt: T | (() => T)) => [T, TySetState<T>];
