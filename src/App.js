import React, { Component } from 'react';
import TodoHeaderSection from './components/TodoHeaderSection';
import TodoMainSection from './components/TodoMainSection';
import TodoFooterSection from './components/TodoFooterSection';

export const filterTypes = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

export default class App extends Component {
  state = {
    todoList: [],
    selectedFilter: filterTypes.all,
  };

  addTodo = (todo) => {
    this.setState(state => ({
      todoList: [
        ...state.todoList,
        todo,
      ],
      selectedFilter: filterTypes.all,
    }));
  };

  deleteTodo = (todoId) => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => todo.id !== todoId),
    }));
  };

  clearAllCompleted = () => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => !todo.completed),
    }));
  };

  setFilter = (filter) => {
    this.setState({
      selectedFilter: filter,
    });
  };

  filterTodos = () => {
    switch (this.state.selectedFilter) {
      case filterTypes.active:
        return this.state.todoList.filter(todo => !todo.completed);
      case filterTypes.completed:
        return this.state.todoList.filter(todo => todo.completed);
      default:
        return this.state.todoList.filter(todo => todo.id);
    }
  };

  markTodoCompleted = (todoId) => {
    this.setState(state => ({
      todoList: state.todoList.map((todo) => {
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

  markListCompleted = () => {
    this.setState((state) => {
      if (state.todoList.every(todo => todo.completed)) {
        return {
          todoList: state.todoList.map(todo => ({
            ...todo,
            completed: false,
          })),
        };
      }

      return {
        todoList: state.todoList.map(todo => ({
          ...todo,
          completed: true,
        })),
      };
    });
  };

  render = () => {
    const { todoList, selectedFilter } = this.state;
    const filteredTodoList = this.filterTodos();

    return (
      <section className="todoapp">

        <TodoHeaderSection
          addTodo={this.addTodo}
        />

        {todoList.length > 0 && (
          <>
            <TodoMainSection
              todoList={todoList}
              onCompletedList={this.markListCompleted}
              onCompletedTodo={this.markTodoCompleted}
              onDeletedTodo={this.deleteTodo}
              filteredTodoList={filteredTodoList}
            />

            <TodoFooterSection
              todoList={todoList}
              currentFilter={selectedFilter}
              onSetFilter={this.setFilter}
              onClearedList={this.clearAllCompleted}
            />
          </>
        )}

      </section>
    );
  };
}
