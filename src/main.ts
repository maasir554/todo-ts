import 'remixicon/fonts/remixicon.css'

import './index.css'

import {CreateContainer, CreateTodoAdder, CreateTodoAppWrapper,CreateTodoItem} from "./components";

import { ImplementHyper } from "./Hyper/Hyper";

import { getTodos, addTodo, HyperTodosList_addTodo } from './global';

const root = document.getElementById('root')

const todoAdderElement = CreateTodoAdder()

const todoAppWrapper = CreateTodoAppWrapper()

// if initially, entries are present, then populate them:

const initialTodosAll = getTodos()

initialTodosAll.forEach( (todo, listIndex) => {
        const HypTodoItem = CreateTodoItem({idx:listIndex+1, todoText: todo.text, todoId: todo.id}, true)
        
        todoAppWrapper.methods?.addTodoItem(HypTodoItem.out())
        
        HyperTodosList_addTodo(HypTodoItem) // for reference (to be used when re-indexing the display indexes)
    }
)

// The following could've ben done directly in the component itself, but done here just for demonstration
todoAdderElement.methods?.addInputChangeFunctionality( () => {
    if(todoAdderElement.methods?.getInputText() !== "") todoAdderElement.methods?.enableAddButton();
    else todoAdderElement.methods!.disableAddButton();
})

/**Important: for linking the display area with adder, and also with global object: todos*/
todoAdderElement.methods?.addSubmitFunctionality( () => {
    todoAdderElement.methods?.addTodoToApp({WhereToPaint: todoAppWrapper, TodoDataGetter: getTodos, TodoDataPusher: addTodo })
})

// Populate the UI to root element (here div#root)

ImplementHyper(
    root,
    CreateContainer(
        {
            displayElements:[ 
                todoAdderElement.out(),
                todoAppWrapper.out()
            ]
        }
    ).out()
)
