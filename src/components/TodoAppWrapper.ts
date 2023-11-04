import { HyperInstance } from "../Hyper/Hyper";
import { getHyperTodos } from "../global";

const TodoAppWrapper = () => {
    const wrp = document.createElement('div')

    wrp.className = 'wrapper'
    
    const subwrp = document.createElement('div')
    
    subwrp.className = 'subwrp'
    
    wrp.appendChild(subwrp)
    
    const methods = {
        addTodoItem: (todoItem: HTMLElement) => {
            subwrp.appendChild(todoItem)

            // [for animation] Update z indexes of all items: 
            getHyperTodos().forEach((htd, idx) => {
                htd.out().style.zIndex = `${getHyperTodos().length - idx + 1}`
            });

        },
        
        scrollToBottom: () => {
            subwrp.scrollTop = subwrp.scrollHeight;
        },
        disableAnimation: () =>{
            getHyperTodos().forEach(
                hyptodo => hyptodo?.methods?.disableAnimation()
            )
        }

    }
    return {element: wrp, methods: methods}
}
const CreateTodoAppWrapper = () => {
    return new HyperInstance(TodoAppWrapper())
}

export {CreateTodoAppWrapper}
