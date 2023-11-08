import { CreateTodoItem } from "./components"

let todos:{id:string, text:string, dateCreated: Date, checked:boolean}[] = [
    {id: 's43fr', text:"Your tasks will appear like this.", dateCreated:new Date(), checked: false},
    {id: 'dsfw3', text:"Please avoid procrastination.", dateCreated: new Date(), checked: false}
]

// For fetching todos from local storage:
if (localStorage.getItem('todos') !== null) todos = JSON.parse(localStorage.getItem('todos')!)

// function for pushing todos to local storage
const pushTodosToLocalStorage = () =>{
    localStorage.setItem('todos', JSON.stringify(todos))
} 


const getTodos = () => {
    return todos
}

const addTodo = ( todoObject: {id: string, text: string, dateCreated: Date, checked: false} ) => {
    todos.push(todoObject)

    pushTodosToLocalStorage()
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

    pushTodosToLocalStorage()
}

const isTodoChecked = (id:string) =>{
    return getTodoById(id).checked;
}

const toggleCheckTodoById = (id:string) => {
    const todo = getTodoById(id);
    todo.checked = todo.checked ? false: true;
    pushTodosToLocalStorage()
}

/**
 * @param id - Id of the todo item, which is to be removed.
 */
const removeTodo =  (id: string) => {
    const index_of_object_to_remove = todos.findIndex(item => item.id === id)

    todos.splice(index_of_object_to_remove, 1)

    pushTodosToLocalStorage()
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
        toggleCheckTodoById,
        isTodoChecked,
        getHyperTodos, 
        HyperTodosList_addTodo, 
        HyperTodosList_removeTodo 
    }
