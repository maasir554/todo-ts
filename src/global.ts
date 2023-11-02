import { CreateTodoItem } from "./components/Todo"

const todos:{id:string, text:string, dateCreated: Date}[] = [
    {id: 's43fr', text:"One", dateCreated:new Date()},
    {id: 'dsfw3', text:"Two Do", dateCreated: new Date()}
]

const getTodos = () => {
    return todos
}

const addTodo = ( todoObject: {id: string, text: string, dateCreated: Date} ) => {
    todos.push(todoObject)
}

const getIndexOfTodo = (id: string) => {
    return todos.findIndex(item => item.id === id)
    
}

/**
 * @param id - Id of the todo item, which is to be remove.
 */
const removeTodo =  (id: string) => {
    const index_of_object_to_remove = todos.findIndex(item => item.id === id)

    todos.splice(index_of_object_to_remove, 1)
}


const HyperTodosList: ReturnType<typeof CreateTodoItem>[] = [] 

const getHyperTodos = () => {return HyperTodosList}

const HyperTodosList_addTodo = (hyptodo: ReturnType<typeof CreateTodoItem>) => HyperTodosList.push(hyptodo)

const HyperTodosList_removeTodo = (indexToRemove: number) => {
    HyperTodosList.splice(indexToRemove,1)
    HyperTodosList.forEach((htd, idx) => htd.methods?.updateHyperIndex(idx))
}

export {getTodos, addTodo, removeTodo, getIndexOfTodo, getHyperTodos, HyperTodosList_addTodo, HyperTodosList_removeTodo }
