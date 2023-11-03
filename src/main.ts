import 'remixicon/fonts/remixicon.css'

import './index.css'

import {CreateContainer, CreateTodoAdder, CreateTodoAppWrapper} from "./components";

import { ImplementHyper } from "./Hyper/Hyper";

import { CreateTodoItem } from './components/Todo';

import { getTodos, addTodo, HyperTodosList_addTodo } from './global';

const root = document.getElementById('root')

const todoAdderElement = CreateTodoAdder()

const todoAppWrapper = CreateTodoAppWrapper()

// if initially, entries are present, then populate them:

const initialTodosAll = getTodos()

initialTodosAll.forEach( (todo, listIndex) => {
        const HypTodoItem = CreateTodoItem({idx:listIndex+1, todoText: todo.text, todoId: todo.id}, true)
        
        todoAppWrapper.methods?.addTodoItem(HypTodoItem.out())
        
        HyperTodosList_addTodo(HypTodoItem) // for reference
    }
)


todoAdderElement.methods?.addInputChangeFunctionality( () => {
    if(todoAdderElement.methods?.getInputText() !== "") todoAdderElement.methods?.enableAddButton();
    else todoAdderElement.methods!.disableAddButton();
})

todoAdderElement.methods?.addSubmitFunctionality( () => {
    todoAdderElement.methods?.addTodoToApp({WhereToPaint: todoAppWrapper, TodoDataGetter: getTodos, TodoDataPusher: addTodo })
})


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
