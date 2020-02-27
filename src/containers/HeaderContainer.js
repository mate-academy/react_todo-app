import { connect } from 'react-redux';

import Header from '../components/Header/Header';

const mapStateToProps = state => ({
  todos: state.todos,
});

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
