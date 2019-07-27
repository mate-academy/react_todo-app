import React from 'react';
import { connect } from 'react-redux';

import TodoList from './Todos';
import Header from './Header';
import Footer from './Footer';
import { appPropTypes } from '../propTypes/propTypes';

function App({ todosLength, match: { params } }) {
  return (
    <section className="todoapp">

      <Header />
      {
        todosLength > 0 && (
        <>
          <TodoList filter={params.filter} />
          <Footer />
        </>
        )
      }

    </section>
  );
}

const mapState = ({ todos }) => ({
  todosLength: todos.length,
});

export default connect(mapState)(App);

App.propTypes = appPropTypes;
