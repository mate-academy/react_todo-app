import { SortType } from '../../enums/SortType';

const footerData = [
  {
    option: 'All',
    href: '#/',
    dataCY: 'FilterLinkAll',
    sortType: SortType.ALL,
  },
  {
    option: 'Active',
    href: '#/active',
    dataCY: 'FilterLinkActive',
    sortType: SortType.ACTIVE,
  },
  {
    option: 'Completed',
    href: '#/completed',
    dataCY: 'FilterLinkCompleted',
    sortType: SortType.COMPLETED,
  },
];

export default footerData;
