import PropTypes from 'prop-types';
import { onSetFilterType } from './methodsType';

export const filterListType = {
  selectedFilter: PropTypes.string,
  onSetFilter: onSetFilterType,
};
