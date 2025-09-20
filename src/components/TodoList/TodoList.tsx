import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onSelectTodo?: (todo: Todo | null) => void;
  selectedTodoId?: number;
}

const TodoListComponent: React.FC<TodoListProps> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  const handleButtonClick = (todo: Todo) => {
    if (!onSelectTodo) return;
    if (selectedTodoId === todo.id) {
      onSelectTodo(null);
    } else {
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
        {todos.slice(0, 5).map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={
              selectedTodoId === todo.id ? 'has-background-info-light' : ''
            }
          >
            <td className="is-vcentered">{todo.id}</td>

            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon" data-cy="completed">
                  <i className="fas fa-check" />
                </span>
              ) : (
                <span className="icon" data-cy="notCompleted">
                  <i className="fas fa-times" />
                </span>
              )}
            </td>

            <td
              className={`is-vcentered ${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
            >
              {todo.title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                type="button"
                onClick={() => handleButtonClick(todo)}
              >
                {selectedTodoId === todo.id ? 'Hide' : 'Show'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const TodoList = React.memo(TodoListComponent);
