import { HyperInstance } from "../Hyper/Hyper";
import { nanoid } from 'nanoid'
import { HyperTodosList_addTodo, HyperTodosList_removeTodo, getHyperTodos, getIndexOfTodo, getTodos, removeTodo } from "../global";

const TodoAdder = () => {

    const wrapper = document.createElement('div');
    wrapper.className = 'todo-adder';
    const ipt = document.createElement('input');
    ipt.type = 'text';
    ipt.placeholder = 'Type here to add a todo...'
    const adb = document.createElement('button');
    adb.className ="disabled"
    adb.type = 'button';
    adb.innerHTML = `<i class="ri-add-line"></i> Add`
    adb.disabled =true;
    wrapper.appendChild(ipt); 
    wrapper.appendChild(adb);

    interface TodoAdderMethods {
        addTodoToApp: (props:{WhereToPaint: ReturnType<typeof CreateTodoAppWrapper> , TodoDataGetter:() => {id: string, text: string, dateCreated: Date}[], TodoDataPusher: (todoObject: {id: string, text: string, dateCreated: Date}) => void })=> void,
        addSubmitFunctionality : (handeler: EventListener) => void,
        addInputChangeFunctionality : (handeler:EventListener) => void,
        getInputText: () => string,
        setInputValue: (val:string) => void,
        enableAddButton: () => void,
        disableAddButton: () => void
    }
    
    const methods: TodoAdderMethods = {
        addSubmitFunctionality : (handeler: EventListener) => {
            adb.onclick = handeler;
            ipt.onkeydown = evt => {
                if (evt.key === 'Enter') handeler(evt)
            }
        },

        addInputChangeFunctionality : (handeler:EventListener) => {
            ipt.oninput = handeler // this is very important!
        },

        getInputText: () => {return ipt.value},

        setInputValue: (val: string) => {ipt.value = val},

        enableAddButton: () => {adb.disabled = false; adb.classList.remove('disabled')},

        disableAddButton: () => {adb.disabled = true; adb.classList.add('disabled')},
        /**
         * this function add a todo to the global record file as well as the UI.
         */
        addTodoToApp: function (props){
            const inputText = ipt.value.trim();
            
            if (inputText){ 
                // push details to list:
            
                const todoId = nanoid(6)
                
                props.TodoDataPusher({id: todoId, text:inputText, dateCreated:new Date()})
            
                // get the final length of the list
            
                const AllTodosCount = props.TodoDataGetter().length;

                const HyperTodoItem = CreateTodoItem({idx:AllTodosCount,todoText:inputText, todoId:todoId})
                
                props.WhereToPaint.methods?.addTodoItem(HyperTodoItem.out())

                HyperTodosList_addTodo(HyperTodoItem)
            }

            this.disableAddButton()

            this.setInputValue("")
        }

    }

    return {element: wrapper, methods: methods}
}

const CreateTodoAdder = () => {

    return new HyperInstance(TodoAdder())

}

const TodoAppWrapper = () => {
    const wrp = document.createElement('div')
    wrp.className = 'wrapper'
    const subwrp = document.createElement('div')
    subwrp.className = 'subwrp'
    
    // const HyperTodoItems:  ReturnType<typeof CreateTodoItem>[] = [];
    
    wrp.appendChild(subwrp)
    const methods = {
        addTodoItem: (todoItem: HTMLElement) => subwrp.appendChild(todoItem),
        // updateIndexesOfItems: (startIndex: number) => {
        //     for (let i=startIndex; i < getTodos().length; i++){
        //         HyperTodoItems[i].methods?.setDisplayIndex(i+1);
        //     }
        // }
    }
    return {element: wrp, methods: methods}
}
const CreateTodoAppWrapper = () => {
    return new HyperInstance(TodoAppWrapper())
}

const TodoItem = (props: {idx:number, todoText: string, todoId: string}) => {
    const encl = document.createElement('div');
    
    encl.className = 'todo-item';
    
    const indexDisplay = document.createElement('span')
    
    indexDisplay.textContent = props.idx + "." 

    encl.appendChild(indexDisplay)

    const textBox = document.createElement('p');
    
    encl.appendChild(textBox);
    
    textBox.textContent =  props.todoText
    
    const editButton = document.createElement('button');
    
    editButton.className = 'todo-edit-button';
    
    editButton.type = 'button'
    
    editButton.textContent = 'Edit'
    
    encl.appendChild(editButton);
    
    const removeButton = document.createElement('button'); 
    
    removeButton.className = 'todo-remove-button'
    
    removeButton.textContent = 'Remove'
    
    encl.appendChild(removeButton);
    
    const dateCreated = Date.now()

    // setting a hyper index:
    let hyperIndex = getHyperTodos().length;
    
    // For Remove button:
    
    removeButton.onclick = () => {
            
        //first, get the index of the todo item being removed, from the global record: 
    
        const listIndex = getIndexOfTodo(props.todoId)

        // Then remove the item from the global record

        removeTodo(props.todoId)

        // Remove element from Hyper list and DOM: 

        HyperTodosList_removeTodo(methods.getHyperIndex())

        encl.remove()
    
        // Now, in the ui, the below elements' indexes should be updated: 

        const HyperTodos = getHyperTodos();

        for (let i=listIndex; i < getTodos().length; i++){
            
                HyperTodos[i].methods?.setDisplayIndex(i+1);
        }
    
    }
    
    interface TodoItemMethods {
        getDateCreated: ()=> void,
        setDisplayIndex: (idx: number) => void,
        getHyperIndex: ()=>number,
        updateHyperIndex: (n: number) => void
    }
    
    const methods: TodoItemMethods = {
        getDateCreated : () => {return dateCreated},
        setDisplayIndex: (idx: number) => {indexDisplay.textContent = idx + "."},
        getHyperIndex: () => {return hyperIndex},
        updateHyperIndex: (n) => {hyperIndex = n} 
    }
    return {element: encl, methods: methods}

}

const CreateTodoItem = (props: {idx:number, todoText:string, todoId: string}) => {
    return new HyperInstance(TodoItem(props))
}

export {CreateTodoAppWrapper, CreateTodoAdder, CreateTodoItem}
