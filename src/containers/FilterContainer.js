import { connect } from 'react-redux';

import { setFilter } from '../actions';
import Filter from '../components/Filter/Filter';

const mapStateToProps = state => ({
  activeFilter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  onSetFilter: filter => dispatch(setFilter(filter)),
});

const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterContainer;
