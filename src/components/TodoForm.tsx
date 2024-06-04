import { Button, Description, Field, Input, Label } from '@headlessui/react'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import type { TodoFormProps } from '../type'

const TodoForm: FC<TodoFormProps> = ({ onAddTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ name: string }>()

  const onSubmit = (data: { name: string }) => {
    onAddTodo(data.name)
    reset()
  }

  return (
    <Field as="form" onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <Label htmlFor="add-todo" className="sr-only">
        Add new todo
      </Label>
      <div className="mb-2">
        {errors.name && (
          <Description className="text-sm text-red-800 dark:text-red-400 transition-colors duration-300">
            {errors.name.type === 'maxLength'
              ? 'Maximum 20 characters'
              : 'This field is required'}
            .
          </Description>
        )}
      </div>
      <div className="flex">
        <Input
          type="text"
          id="add-todo"
          className="appearance-none border rounded-lg w-full py-2 px-3 mr-4 text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors duration-300"
          placeholder="Enter a new todo..."
          {...register('name', { required: true, maxLength: 20 })}
          aria-invalid={errors.name ? 'true' : 'false'}
          autoComplete="off"
        />
        <Button
          type="submit"
          className="shrink-0 p-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors duration-300"
        >
          Create
        </Button>
      </div>
    </Field>
  )
}

export default TodoForm
