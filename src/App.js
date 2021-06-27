import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { clearCompleted, toggleAll } from './redux/actions';
import ToggleAllButton from './components/ToggleAllButton';
import Footer from './components/Footer';

function App({ todos }) {
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <section
      className="todoapp"
    >
      <header className="header">
        <h1>todos</h1>

        <NewTodo />
      </header>

      <section className="main">
        {todos.length > 0
          ? <ToggleAllButton />
          : ''
        }

        <TodoList />
      </section>

      {todos.length > 0
        ? <Footer />
        : ''
      }
    </section>
  );
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos.todos,
});

export default connect(mapStateToProps, { clearCompleted, toggleAll })(App);
