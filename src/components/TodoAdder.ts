import { CreateTodoAppWrapper, CreateTodoItem } from ".";
import { HyperInstance } from "../Hyper/Hyper";
import { HyperTodosList_addTodo } from "../global";
// import { CreateTodoAppWrapper } from "./Todo";
import { nanoid } from 'nanoid'
import { todoFilterBox } from "../main";


const TodoAdder = () => {

    const wrapper = document.createElement('div');
    
    wrapper.className = 'todo-adder';
    
    wrapper.style.animation = 'todo-adder-anim 0.5s 1 ease-out'

    const ipt = document.createElement('input');
    
    ipt.type = 'text';
    
    ipt.placeholder = 'Type here to add a todo...'
    
    const adb = document.createElement('button');
    
    adb.className ="disabled"
    adb.type = 'button';
    adb.innerHTML = `<i class="ri-add-circle-line" style="font-size:16px;margin-right:5px"></i> Add`
    adb.disabled =true;
    
    wrapper.appendChild(ipt); 
    
    wrapper.appendChild(adb);

    interface TodoAdderMethods {
        addTodoToApp: (props:{WhereToPaint: ReturnType<typeof CreateTodoAppWrapper> , TodoDataGetter:() => {id: string, text: string, dateCreated: Date}[], TodoDataPusher: (todoObject: {id: string, text: string, dateCreated: Date, checked: boolean}) => void })=> void,
        
        addSubmitFunctionality : (handeler: EventListener) => void,
        
        addInputChangeFunctionality : (handeler:EventListener) => void,
        
        getInputText: () => string,
        
        setInputValue: (val:string) => void,
        
        enableAddButton: () => void,
        
        disableAddButton: () => void,

        disableAnimation: () => void
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
                
                // generate a random ID to assign it to the todo
                
                const todoId = nanoid(6)

                // push details to list (the global object) :
                
                props.TodoDataPusher({id: todoId, text:inputText, dateCreated:new Date(), checked: false})
            
                // get the final length of the list
            
                const AllTodosCount = props.TodoDataGetter().length;

                // If todos were filtered initially, unfilter them:
                todoFilterBox.methods?.unfilter();
                
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
        },

        disableAnimation: () =>{
            // wrapper.style.opacity = 'inherit'
            wrapper.style.animation = 'none'
        }

    }

    return {element: wrapper, methods: methods}
}

const CreateTodoAdder = () => {

    return new HyperInstance(TodoAdder())

}

export {CreateTodoAdder}
