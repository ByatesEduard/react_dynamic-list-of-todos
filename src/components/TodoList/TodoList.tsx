import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onSelectTodo?: (todo: Todo) => void;
  selectedTodoId?: number;
}

const TodoListComponent: React.FC<TodoListProps> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  const handleButtonClick = (todo: Todo) => {
    if (onSelectTodo) {
      onSelectTodo(todo);
    }
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map((todo, index) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={
              todo.completed
                ? 'has-background-info-light'
                : ''
            }
          >
            <td className="is-vcentered">{index + 1}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td
              className={`is-vcentered is-expanded ${
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }`}
            >
              <p>{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className={`button ${
                  selectedTodoId === todo.id ? 'is-link' : ''
                }`}
                type="button"
                onClick={() => handleButtonClick(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      todo.completed ? 'far fa-eye' : 'far fa-eye-slash'
                    }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const TodoList = React.memo(TodoListComponent);
