import { HyperInstance } from "../Hyper/Hyper";

const TodoAppWrapper = () => {
    const wrp = document.createElement('div')

    wrp.className = 'wrapper'
    
    const subwrp = document.createElement('div')
    
    subwrp.className = 'subwrp'
    
    wrp.appendChild(subwrp)
    
    const methods = {
        addTodoItem: (todoItem: HTMLElement) => {
            subwrp.appendChild(todoItem)
        },
        
        scrollToBottom: () => {
            subwrp.scrollTop = subwrp.scrollHeight;
        }

    }
    return {element: wrp, methods: methods}
}
const CreateTodoAppWrapper = () => {
    return new HyperInstance(TodoAppWrapper())
}

export {CreateTodoAppWrapper}
