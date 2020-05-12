import React, { Component } from 'react';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { Footer } from '../../components/Footer';
import { FILTER_TYPES } from '../../constants';
import './ToDoContainer.scss';

export class ToDoContainer extends Component {
  state = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    selectedFilter: FILTER_TYPES.all,
  };

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  addTodo = todo => this.setState(state => ({
    todos: [...state.todos, todo],
  }));

  deleteTodo = todoId => this.setState(state => ({
    todos: state.todos.filter(todo => todo.id !== todoId),
  }));

  handleClearCompleted = () => this.setState(state => ({
    todos: state.todos.filter(todo => !todo.completed),
  }));

  toggleTodoCompleted = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  };

  toggleAllCompleted = () => {
    this.setState((state) => {
      if (state.todos.every(todo => todo.completed)) {
        return {
          todos: state.todos.map(todo => ({
            ...todo,
            completed: false,
          })),
        };
      }

      return {
        todos: state.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      };
    });
  };

  setFilter = filter => this.setState({ selectedFilter: filter });

  filterTodos = () => {
    const { selectedFilter, todos } = this.state;

    switch (selectedFilter) {
      case FILTER_TYPES.active:
        return todos.filter(todo => !todo.completed);
      case FILTER_TYPES.completed:
        return todos.filter(todo => todo.completed);
      case FILTER_TYPES.all:
        return todos.filter(todo => todo.id);
      default:
        return todos;
    }
  };

  setEditableState = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== id) {
          return {
            ...todo,
            isEditable: false,
          };
        }

        return {
          ...todo,
          isEditable: true,
        };
      }),
    }));
  };

  handleKeyPress = (event, id, value) => {
    if (event.key === 'Escape') {
      this.setState(state => ({
        todos: state.todos.map(todo => ({
          ...todo,
          isEditable: false,
        })),
      }));
    }

    if (event.key === 'Enter') {
      this.setEditedValue(event, id, value);
    }
  }

  setEditedValue = (event, id, value) => {
    if (!event.target.value.trim()) {
      this.deleteTodo(id);
    }

    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          title: value || todo.title,
          isEditable: false,
        };
      }),
    }));
  };

  render = () => {
    const { todos, selectedFilter } = this.state;
    const visibleTodos = this.filterTodos();

    return (
      <section className="todoapp">
        <Header
          addTodo={this.addTodo}
        />

        {todos.length > 0 && (
          <>
            <Main
              {...{ todos }}
              visibleTodos={visibleTodos}
              onToggleAllCompleted={this.toggleAllCompleted}
              onToggleTodoCompleted={this.toggleTodoCompleted}
              onDeleteCurrentTodo={this.deleteTodo}
              onEditCurrentTodo={this.setEditableState}
              handleKeyPress={this.handleKeyPress}
              setEditedValue={this.setEditedValue}
            />

            <Footer
              {...{ todos }}
              onSetFilter={this.setFilter}
              currentFilter={selectedFilter}
              onClearCompleted={this.handleClearCompleted}
            />
          </>
        )}

      </section>
    );
  };
}
