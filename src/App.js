import React from 'react';
import './App.css';

function Heading() {
  return <h1 className="Heading"> todos </h1>;
}

// eslint-disable-next-line react/prop-types
function TodoForm({ newTodoFN, toggleAll }) {
  function handleSubmit(e) {
    e.preventDefault();
    newTodoFN(e.target.TodoFormTextBox.value);
    // eslint-disable-next-line no-param-reassign
    e.target.TodoFormTextBox.value = '';
  }

  return (
    <div className="TodoForm">
      <button
        className="ToggleForm"
        type="button"
        onClick={toggleAll}
      >
        ✓
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="TodoFormTextBox"
          name="TodoFormTextBox"
          placeholder="What needs to be done?"
          required
        />
      </form>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function TodoBox({ todo, completed, deleteTodo, todoId, toggleTodo }) {
  const completeStyle = {
    textDecoration: 'line-through',
    color: 'grey',
  };

  return (
    <div className="TodoBox">
      <div className="CheckBox">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(todoId)}
        />
      </div>
      <p
        style={completed ? completeStyle : null}
      >
        {todo}
      </p>
      <button
        type="button"
        className="Deleter"
        onClick={() => deleteTodo(todoId)}
      >
        X
      </button>
    </div>
  );
}

function TodoList({ todos, toggleTodo, deleteTodo }) {
  const listOfTodos = (
    todos.map(todo => (
      <TodoBox
        key={todo.id}
        todoId={todo.id}
        todo={todo.todoItem}
        completed={todo.completed}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    ))
  );

  return (
    listOfTodos
  );
}

// eslint-disable-next-line react/prop-types
function Footer({ todos, changeViewFilter }) {
  function handleClick(e) {
    changeViewFilter(e.target.name);
  }

  return (
    <div className="Footer">
      <p>
        { todos.length }
        { todos.length === 1 ? 'todo' : 'total todos' }
      </p>
      <button
        type="button"
        name="SHOW_ALL"
        onClick={handleClick}
      >
        ALL
      </button>
      <button
        type="button"
        name="SHOW_ACTIVE"
        onClick={handleClick}
      >
        ACTIVE
      </button>
      <button
        type="button"
        name="SHOW_COMPLETED"
        onClick={handleClick}
      >
        COMPLETED
      </button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewFilter: 'SHOW_ALL',
      todos: [
        {
          id: 0,
          todoItem: 'Learn HTML',
          completed: true,
        },
        {
          id: 1,
          todoItem: 'Learn JS',
          completed: false,
        },
        {
          id: 2,
          todoItem: 'Practice web dev',
          completed: true,
        },
      ],
      nextId: 3,
    };
  }

  handleNewTodo = (newTodo) => {
    const newTodoObj = {
      id: this.state.nextId,
      todoItem: newTodo,
      completed: false,
    };
    const todos = [...this.state.todos, newTodoObj];
    const newNextId = this.state.nextId + 1;
    const newState = {
      todos,
      nextId: newNextId,
    };

    this.setState(newState, () => this.state);
  };

  deleteTodo = (todoId) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const newTodos = this.state.todos.filter(todo => todo.id !== todoId);

    this.setState({
      todos: newTodos,
    });
  };

  toggleTodo = (todoId) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const todos = this.state.todos.map(todo => ((todo.id === todoId)
      ? {
        ...todo,
        completed: !todo.completed,
      }
      : todo));

    this.setState({ todos });
  };

  toggleAll = () => {
    const allCompleted = this.state.todos.every(todo => (
      todo.completed === true
    ));

    // eslint-disable-next-line react/no-access-state-in-setstate
    const todos = this.state.todos.map(todo => (allCompleted
      ? {
        ...todo,
        completed: false,
      }
      : {
        ...todo,
        completed: true,
      }));

    this.setState({ todos });
  };

  changeViewFilter = (viewFilter) => {
    this.setState({ viewFilter });
  };

  render() {
    const { todos, viewFilter } = this.state;

    // eslint-disable-next-line no-shadow
    function visibleTodos(todos, viewFilter) {
      switch (viewFilter) {
        case 'SHOW_ALL':
          return todos;
        case 'SHOW_COMPLETED':
          return todos.filter(todo => todo.completed);
        case 'SHOW_ACTIVE':
          return todos.filter(todo => !todo.completed);
        default:
          return '';
      }
    }

    return (
      <div className="App">
        <Heading />
        <TodoForm newTodoFN={this.handleNewTodo} toggleAll={this.toggleAll} />
        <TodoList
          todos={visibleTodos(todos, viewFilter)}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
        />
        {(this.state.todos.length !== 0)
          ? <Footer todos={todos} changeViewFilter={this.changeViewFilter} />
          : null
        }
      </div>
    );
  }
}

export default App;
