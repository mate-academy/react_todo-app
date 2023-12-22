import { signal } from '@preact/signals-react';

type Filter = 'all' | 'active' | 'completed';

export const filter = signal<Filter>('all');
