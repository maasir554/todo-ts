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

const getTodoById = (id: string) => {
    return todos[getIndexOfTodo(id)]
}

const updateTodoText = (id: string, text: string) => {
    const requiredTodo = getTodoById(id);
    requiredTodo.text = text
}



/**
 * @param id - Id of the todo item, which is to be removed.
 */
const removeTodo =  (id: string) => {
    const index_of_object_to_remove = todos.findIndex(item => item.id === id)

    todos.splice(index_of_object_to_remove, 1)
}

/**
 * A list containing the HyperInstances of TodoItem that are populated in the UI
 * those instances will be added in main.ts file and when new todos are added.
 */
const HyperTodosList: ReturnType<typeof CreateTodoItem>[] = [] 

const getHyperTodos = () => {return HyperTodosList}

const HyperTodosList_addTodo = (hyptodo: ReturnType<typeof CreateTodoItem>) => HyperTodosList.push(hyptodo)

const HyperTodosList_removeTodo = (indexToRemove: number) => {
    
    HyperTodosList.splice(indexToRemove,1)
    
    // now, we need to updare index data present inside each HyperInstance:-

    HyperTodosList.forEach((htd, idx) => htd.methods?.updateHyperIndex(idx))
}

export {
        getTodos,
        addTodo, 
        removeTodo, 
        getIndexOfTodo,
        getTodoById,
        updateTodoText, 
        getHyperTodos, 
        HyperTodosList_addTodo, 
        HyperTodosList_removeTodo 
    }
