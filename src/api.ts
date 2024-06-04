import type { DBSchema, IDBPDatabase } from 'idb'
import { openDB } from 'idb'
import type { Todo } from './type'

interface TodoDB extends DBSchema {
  todos: {
    key: number
    value: Todo
  }
}

let dbPromise: Promise<IDBPDatabase<TodoDB>> | null = null

const getDb = (): Promise<IDBPDatabase<TodoDB>> => {
  dbPromise ||= openDB<TodoDB>('todosDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('todos')) {
        db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true })
      }
    }
  })
  return dbPromise
}

export const getTodos = async (): Promise<Todo[]> => {
  const db = await getDb()
  return db.getAll('todos')
}

export const addTodo = async (todo: Todo): Promise<void> => {
  if (!todo) {
    throw new Error('Todo cannot be null or undefined.')
  }

  const db = await getDb()
  await db.add('todos', todo)
}

export const updateTodo = async (updatedTodo: Todo): Promise<void> => {
  if (updatedTodo?.id == null) {
    throw new Error('Updated todo must have a valid ID.')
  }

  const db = await getDb()
  await db.put('todos', updatedTodo)
}

export const deleteTodo = async (todoId: number): Promise<void> => {
  if (todoId == null) {
    throw new Error('Todo ID cannot be null or undefined.')
  }

  const db = await getDb()
  await db.delete('todos', todoId)
}

export const getCompletedTodos = async (): Promise<number[]> => {
  const db = await getDb()
  const todos = await db.getAll('todos')
  return todos.filter(todo => todo.completed).map(todo => todo.id)
}

export const saveCompletedTodos = async (
  completedTodos: number[]
): Promise<void> => {
  const db = await getDb()
  const tx = db.transaction('todos', 'readwrite')
  const store = tx.objectStore('todos')
  const allTodos = await store.getAll()

  const updatePromises = allTodos.map(todo => {
    const isCompleted = completedTodos.includes(todo.id)
    return store.put({ ...todo, completed: isCompleted })
  })

  await Promise.all(updatePromises)
  await tx.done
}

export default {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getCompletedTodos,
  saveCompletedTodos
}
