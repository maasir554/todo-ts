import { HyperInstance } from "../Hyper/Hyper";
import { nanoid } from 'nanoid'

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
            
                props.TodoDataPusher({id: nanoid(6), text:inputText, dateCreated:new Date()})
            
                // get the final length of the list
            
                const AllTodosCount = props.TodoDataGetter().length;

                props.WhereToPaint.methods?.addTodoItem(
                    CreateTodoItem({idx:AllTodosCount,todoText:inputText}).out()
                )
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
    
    wrp.appendChild(subwrp)
    const methods = {
        populateInitial : (children: HTMLElement[]) => children.forEach(c => subwrp.appendChild(c)),
        addTodoItem: (todoItem: HTMLElement) => subwrp.appendChild(todoItem)
    }
    return {element: wrp, methods: methods}
}
const CreateTodoAppWrapper = () => {
    return new HyperInstance(TodoAppWrapper())
}

const TodoItem = (props: {idx:number, todoText: string}) => {
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
    const methods = {
        getDateCreated : () => {return dateCreated}
    }
    return {element: encl, methods: methods}

}

const CreateTodoItem = (props:  {idx:number, todoText:string}) => {
    return new HyperInstance(TodoItem(props))
}

export {CreateTodoAppWrapper, CreateTodoAdder, CreateTodoItem}
