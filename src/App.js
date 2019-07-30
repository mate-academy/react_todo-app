import React from 'react';
import getTodos from './api/todos';
import TodoApp from './TodoApp';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';

class App extends React.Component {
  state = {
    visibleTodos: [],
    currentFilter: 'all',
  };

  componentDidMount() {
    this.setState({
      visibleTodos: getTodos,
    });
  }

  addTodo = (title) => {
    this.setState(prevState => ({
      visibleTodos: [
        ...prevState.todos,
        {
          title,
          id: Math.ceil(Math.random() * 1000 + prevState.visibleTodos.length),
          completed: false,
        },
      ],
    }));
  };

  handlerChangeCompleted = (id) => {
    this.setState(prevState => ({
      visibleTodos: prevState.visibleTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  };

  handleChangeCompletedAll = () => {
    this.setState(prevState => {
      if (prevState.visibleTodos.every(todo => !todo.completed)
        || prevState.visibleTodos.every(todo => todo.completed)) {
        return {
          visibleTodos:  prevState.visibleTodos.map(todo => ({
            ...todo,
            completed: !todo.completed,
          })),
        };
      } else {
        return {
          visibleTodos: prevState.visibleTodos.map(todo => ({
            ...todo,
            completed: true,
          })),
        };
      }
    });
  };

  handleRemoveTodo = (id) => {
    this.setState(prevState => ({
        visibleTodos: prevState.visibleTodos.filter(todo => (
          todo.id !== id
        )),
      }
    ));
  };

  handlerFilter = () => {
    const { currentFilter, visibleTodos } = this.state;

    switch (currentFilter) {
        case 'all':
          return visibleTodos;
        case  'active':
          return visibleTodos.filter(todo => (
            !todo.completed));
        case  'completed':
          return visibleTodos.filter(todo => (
            todo.completed));
      }
  };

  toggleCurrentFilter = (newCurrentFilter) => {
    this.setState({ currentFilter: newCurrentFilter })
  };

  handlerClearCompleted = () => {
    this.setState(prevState => ({
      visibleTodos: prevState.visibleTodos.filter(todo => (
        !todo.completed
      )),
    }));
  };

  render() {
    const { visibleTodos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp addTodo={this.addTodo} />
        </header>

        <TodoList
          todos={this.handlerFilter()}
          changeCompleted={this.handlerChangeCompleted}
          changeCompletedAll={this.handleChangeCompletedAll}
          removeTodo={this.handleRemoveTodo}
        />

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${visibleTodos
              .filter(todo => !todo.completed)
              .length} items left`
            }
          </span>

          <TodosFilter
            handlerFilter={this.toggleCurrentFilter}
          />

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.handlerClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
