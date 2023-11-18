import React from 'react';

export type TyChangeEvtInputElmt = React.ChangeEvent<HTMLInputElement>;
export type TyKeybrEvtInputElmt = React.KeyboardEvent<HTMLInputElement>;
export type TySetState<Ty> = React.Dispatch<React.SetStateAction<Ty>>;
