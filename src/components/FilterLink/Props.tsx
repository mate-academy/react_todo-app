import { LinkProps } from 'react-router-dom';
import { SearchParams } from '../../utils/searchHelper';

export type Props = Omit<LinkProps, 'to'> & {
  text: string;
  params: SearchParams;
};
