import cn from 'clsx'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { TodoListProps } from '../type'
import TodoItem from './TodoItem'

const TodoList: FC<TodoListProps> = ({
  todos,
  completedTodos,
  handleEditClick,
  handleDeleteClick,
  handleToggleClick
}) => {
  const todoList = useMemo(
    () =>
      todos?.map(todo => {
        const isTodoCompleted = completedTodos.includes(todo.id)

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isCompleted={isTodoCompleted}
            onToggle={() => handleToggleClick(todo.id)}
            onEdit={() => handleEditClick(todo.id)}
            onDelete={() => handleDeleteClick(todo.id)}
          />
        )
      }),
    [
      todos,
      completedTodos,
      handleEditClick,
      handleDeleteClick,
      handleToggleClick
    ]
  )

  return (
    <div
      className={cn('overflow-auto h-full', {
        'max-h-[300px]': (todos?.length ?? 0) > 4
      })}
    >
      {todoList}
    </div>
  )
}

export default TodoList
