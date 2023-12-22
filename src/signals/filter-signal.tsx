import { signal } from '@preact/signals-react';
import { FilterValues } from '../types';

type Filter = keyof typeof FilterValues;

export const filter = signal<Filter>(FilterValues.All);
