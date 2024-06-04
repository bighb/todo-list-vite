import { Button } from '@headlessui/react'
import cn from 'clsx'
import type { FC } from 'react'
import { memo } from 'react'
import type { Todo } from '../type'

const TodoItem: FC<{
  todo: Todo
  isCompleted: boolean
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}> = memo(({ todo, isCompleted, onToggle, onEdit, onDelete }) => (
  <div className="flex mb-4 last:mb-0 items-center">
    <p
      className={cn(
        'mr-auto text-ellipsis overflow-hidden transition-colors duration-300',
        {
          'line-through text-blue-700 dark:text-blue-300': isCompleted,
          'text-gray-900 dark:text-gray-100': !isCompleted
        }
      )}
    >
      {todo.text}
    </p>
    <Button
      type="button"
      className="shrink-0 p-2 ml-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors duration-300"
      onClick={onToggle}
    >
      {isCompleted ? 'Not Done' : 'Done'}
    </Button>
    {!isCompleted && (
      <Button
        type="button"
        className="shrink-0 p-2 ml-4 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-colors duration-300"
        onClick={onEdit}
      >
        Edit
      </Button>
    )}
    <Button
      type="button"
      className="shrink-0 p-2 ml-4 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 transition-colors duration-300"
      onClick={onDelete}
    >
      Delete
    </Button>
  </div>
))

TodoItem.displayName = 'TodoItem'

export default TodoItem
