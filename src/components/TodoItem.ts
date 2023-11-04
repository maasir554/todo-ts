import { HyperInstance } from "../Hyper/Hyper";
import { HyperTodosList_removeTodo, getHyperTodos, getIndexOfTodo, getTodoById, getTodos, isTodoChecked, removeTodo, toggleCheckTodoById, updateTodoText } from "../global";

const TodoItem = (props: {idx:number, todoText: string, todoId: string}, animateDelayed=false) => {
    const encl = document.createElement('div');
    
    encl.className = 'todo-item';
    
    /** Check button for marking todo as done */ 

   const checkButton = document.createElement('button')
   
   checkButton.type = 'button';
   
   const updateCheckedStatus = () => {
        checkButton.innerHTML = `<i class="ri-checkbox-${isTodoChecked(props.todoId) ? '' : 'blank-'}circle-line"></i>`
        if (isTodoChecked(props.todoId)){
            textBox.style.textDecoration = 'line-through'
            indexDisplay.style.textDecoration = 'line-through'
            encl.style.backgroundColor = 'rgb(225,225,225)'
            encl.style.borderColor = 'rgb(112 172 84)'
            checkButton.style.backgroundColor = 'rgb(170 218 147)'
        }
        else{
            textBox.style.textDecoration = 'none'
            indexDisplay.style.textDecoration = 'none'
            encl.style.backgroundColor = ''
            encl.style.borderColor = ''
            checkButton.style.backgroundColor = ''
        }

    } 
   
   encl.appendChild(checkButton)

   checkButton.onclick = () => {
        toggleCheckTodoById(props.todoId)
        updateCheckedStatus()
        
    }
    
    
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

    // once we got index display, and textbox, we can ypdate the checked status.
    updateCheckedStatus()

    /** Edit button for Todo Item */

    const editButton = document.createElement('button');
    
    editButton.className = 'todo-edit-button';
    
    editButton.type = 'button'
    
    editButton.innerHTML = '<i class="ri-edit-2-line"></i>'
    
    encl.appendChild(editButton);

    // optional code for animation:
    
    animateDelayed ? encl.style.animationDelay = ` ${500 + props.idx * 100}ms` : encl.style.animationDelay = "0";
        
    setTimeout(() => { encl.style.animation = ''}, 250 + 500 + props.idx * 100)

    //--------
    
    const enableEdit = ()=>{
        textBox.readOnly = false
        textBox.disabled = false
        editButton.innerHTML = '<i class="ri-save-3-line save-icon"></i>'
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
    
    removeButton.innerHTML = '<i class="ri-delete-bin-line todo-remove-icon"></i>'
    
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

        encl.style.animation = "todo-remove-anim 0.25s ease 1"
        
        setTimeout(() => {
            
            encl.remove()
        
        }, 250);
    
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
        
        updateHyperIndex: (n) => {hyperIndex = n} ,

    }
    return {element: encl, methods: methods}

}

const CreateTodoItem = (props: {idx:number, todoText:string, todoId: string}, animateDelayed=false) => {
    return new HyperInstance(TodoItem(props, animateDelayed))
}

export {CreateTodoItem}
