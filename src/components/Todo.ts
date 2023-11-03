import { HyperInstance } from "../Hyper/Hyper";
import { nanoid } from 'nanoid'
import { HyperTodosList_addTodo, HyperTodosList_removeTodo, getHyperTodos, getIndexOfTodo, getTodoById, getTodos, removeTodo, updateTodoText } from "../global";

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

                // Create a new HyperInstandce and add/push it:
                
                const HyperTodoItem = CreateTodoItem({idx:AllTodosCount,todoText:inputText, todoId:todoId})
                
                props.WhereToPaint.methods?.addTodoItem(HyperTodoItem.out())

                props.WhereToPaint.methods?.scrollToBottom()
                
                // Pushing the HyperInstance of this element to Reference list, so that we can manupulate it in future:
                // mtlab k uske methods ka fayda utha saken.
                
                HyperTodosList_addTodo(HyperTodoItem)
            }

            // Clear the Input

            this.setInputValue("")
            
            // disable add button as there is no text is there in input
            
            this.disableAddButton()
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
    
    wrp.appendChild(subwrp)
    
    const methods = {
        addTodoItem: (todoItem: HTMLElement) => {subwrp.appendChild(todoItem)},
        
        scrollToBottom: () => {
            subwrp.scrollTop = subwrp.scrollHeight;
        }

    }
    return {element: wrp, methods: methods}
}
const CreateTodoAppWrapper = () => {
    return new HyperInstance(TodoAppWrapper())
}

const TodoItem = (props: {idx:number, todoText: string, todoId: string}, animateDelayed=false) => {
    const encl = document.createElement('div');
    
    encl.className = 'todo-item';
    
    // To diaplay the index of the item
    const indexDisplay = document.createElement('span')
    
    indexDisplay.textContent = props.idx + "." 

    encl.appendChild(indexDisplay)

    // Tp diaplay the text content
    
    const textBox = document.createElement('input');

    textBox.type = 'text'
    
    textBox.readOnly = true

    textBox.disabled = true

    encl.appendChild(textBox);
    
    textBox.value =  props.todoText
    
    
    /** Edit button for Todo Item */

    const editButton = document.createElement('button');
    
    editButton.className = 'todo-edit-button';
    
    editButton.type = 'button'
    
    editButton.innerHTML = '<i class="ri-edit-2-line"></i>'
    
    encl.appendChild(editButton);

    // optional code for animation:

    
    animateDelayed ? encl.style.animationDelay = ` ${500 + props.idx * 100}ms` : encl.style.animationDelay = "0";
        
    const enableEdit = ()=>{
        textBox.readOnly = false
        textBox.disabled = false
        editButton.innerHTML = '<i class="ri-check-line tick"></i>'
        cancelButton.style.display = 'flex'
        textBox.focus()
    }

    const disableEdit = () => {
        textBox.readOnly = true
        textBox.disabled = true
        editButton.innerHTML = '<i class="ri-edit-2-line"></i>'
        textBox.focus()
        cancelButton.style.display = 'none'
        // now update the global object:
        updateTodoText(props.todoId, textBox.value)
    }
    
    editButton.onclick = () => {
        textBox.readOnly ? enableEdit() : disableEdit()
    }

    textBox.onkeydown = (e) => {
        if (e.key === 'Enter') disableEdit()
    }

    textBox.onblur = () => {
        if (textBox.value === getTodoById(props.todoId).text ) disableEdit()
    }

    /** Cancel button to cancel changes */

    const cancelButton = document.createElement('button')

    cancelButton.innerHTML = '<i class="ri-close-line cross"></i>'

    cancelButton.style.display = 'none'

    cancelButton.onclick = () => {
        textBox.value = getTodoById(props.todoId).text
        disableEdit()
    }

    encl.appendChild(cancelButton)
    
    /** Remove button for Todo Item */
    const removeButton = document.createElement('button'); 
    
    removeButton.className = 'todo-remove-button'
    
    removeButton.innerHTML = '<i class="ri-delete-bin-line"></i>'
    
    encl.appendChild(removeButton);
    
    
    // date when the component is created.
    const dateCreated = Date.now()

    // setting a hyper index at the time of creation:

    /** This represents the index of the created HyperInstance in the reference list */
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
        
        /** Set the index which is shown in the UI, before todo text */
        setDisplayIndex: (idx: number) => void,
        
        /** HyperIndex represents the index of the created HyperInstance in the reference list */
        getHyperIndex: ()=>number,
        
        /** This function is need because we need to update the HyperIndex of the particular element manually when the reference list is updated. */
        updateHyperIndex: (n: number) => void
    }
    
    const methods: TodoItemMethods = {
        getDateCreated : () => {return dateCreated},
        
        setDisplayIndex: (idx: number) => {
            indexDisplay.textContent = idx + "."; 

        },
        
        getHyperIndex: () => {return hyperIndex},
        
        updateHyperIndex: (n) => {hyperIndex = n} 
    }
    return {element: encl, methods: methods}

}

const CreateTodoItem = (props: {idx:number, todoText:string, todoId: string}, animateDelayed=false) => {
    return new HyperInstance(TodoItem(props, animateDelayed))
}

export {CreateTodoAppWrapper, CreateTodoAdder, CreateTodoItem}
