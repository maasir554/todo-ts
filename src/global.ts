import { CreateTodoItem } from "./components"
import { DoneTodosCount, TotalNumberOfTodos } from "./components/buttons"
import { RemainingTodosCount } from "./components/buttons/chips"

let todos:{id:string, text:string, dateCreated: Date, checked:boolean}[] = [
    {id: 's43fr', text:"Your tasks will appear like this.", dateCreated:new Date(), checked: false},
    {id: 'dsfw3', text:"Please avoid procrastination.", dateCreated: new Date(), checked: false}
]

// For fetching todos from local storage:
if (localStorage.getItem('todos') !== null) todos = JSON.parse(localStorage.getItem('todos')!);


// function for pushing todos to local storage
const pushTodosToLocalStorage = () =>{
    localStorage.setItem('todos', JSON.stringify(todos))
} 


const getTodos = () => {
    return todos
}

const addTodo = ( todoObject: {id: string, text: string, dateCreated: Date, checked: boolean} ) => {
    todos.push(todoObject)

    pushTodosToLocalStorage()

    // some values which depends on todos object can be updated here:

    TotalNumberOfTodos().updateTotalTodoChipCount(todos.length)
    RemainingTodosCount().updateRemainingTodosCount(todos.filter(todo => todo.checked === false).length)

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

    // dependent values update

    DoneTodosCount().updateDoneTodoChipCount(todos.filter(todo => todo.checked===true).length)
    RemainingTodosCount().updateRemainingTodosCount(todos.filter(todo => todo.checked === false).length)
}

/**
 * @param id - Id of the todo item, which is to be removed.
 */
const removeTodo =  (id: string) => {
    const index_of_object_to_remove = todos.findIndex(item => item.id === id)

    todos.splice(index_of_object_to_remove, 1)

    pushTodosToLocalStorage()

    // dependent values update : 
    TotalNumberOfTodos().updateTotalTodoChipCount(todos.length)
    DoneTodosCount().updateDoneTodoChipCount(todos.filter(todo => todo.checked===true).length)
    RemainingTodosCount().updateRemainingTodosCount(todos.filter(todo => todo.checked === false).length)
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

// for the filter box:

let isFilterBoxEnabled = localStorage.getItem('isTodoFilterBoxEnabled') ? JSON.parse(localStorage.getItem('isTodoFilterBoxEnabled')!) : false;

const getIsFilterBoxEnabled = () => {
    return isFilterBoxEnabled
}

const setIsFilterBoxEnabled = (val: boolean) => {
    isFilterBoxEnabled = val;
    localStorage.setItem('isTodoFilterBoxEnabled', JSON.stringify(val))
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
        HyperTodosList_removeTodo,
        getIsFilterBoxEnabled,
        setIsFilterBoxEnabled
    }
