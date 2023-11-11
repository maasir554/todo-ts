import { HyperInstance } from "../Hyper/Hyper";
import { getHyperTodos, getIsFilterBoxEnabled } from "../global";
import { TodoAppWrapperInstanceMethods } from "../main";
import { getShowSettings } from "./Container";

let updateFilterIndicatorPosn = () => {}

const TodoAppWrapper = () => {
    const wrp = document.createElement('div')

    wrp.className = 'wrapper'
    
    const subwrp = document.createElement('div')
    
    subwrp.className = 'subwrp'
     

    const methods = {
        addTodoItem: (todoItem: HTMLElement) => {

            subwrp.style.display = 'flex'
            
            subwrp.appendChild(todoItem)
            
            // [for animation] Update z indexes of all items: 
            getHyperTodos().forEach((htd, idx) => {
                htd.out().style.zIndex = `${getHyperTodos().length - idx + 1}`
            });
            
        },
        
        scrollToBottom: () => {
            subwrp.scrollTop = subwrp.scrollHeight;
        },
        
        // disableAnimation: () =>{
        //     getHyperTodos().forEach(
        //         hyptodo => hyptodo?.methods?.disableAnimation()
        //         )
        // },

        /** Function for displaying only checked todos:  */
        showOnlyDone: () => {
            subwrp.innerHTML = "";
            
            getHyperTodos().forEach(
                todoItem => {
                    if(todoItem.methods?.getIsChecked()) subwrp.appendChild(todoItem.out()) ;
                    
                }
            )
        },

        /** Function for displaying all the todos */
        showAll: () =>{
            subwrp.innerHTML = "";
            
            getHyperTodos().forEach(
                todoItem => subwrp.appendChild(todoItem.out())
            )
        },
            
        /** Function for displaying only the unchecked todos */

        showOnlyRemaining: () =>{
            subwrp.innerHTML = "";
            
            getHyperTodos().forEach(
                todoItem => {
                    if( ! todoItem.methods?.getIsChecked()) subwrp.appendChild(todoItem.out());
                }
            )
            
        }

        }
        
        wrp.appendChild(subwrp)
    
        return {element: wrp, methods: methods}
}
const CreateTodoAppWrapper = () => {
    return new HyperInstance(TodoAppWrapper())
}

const CreateFilterBox = () => {

    const FilterBoxHTML = document.createElement('div');
    
    FilterBoxHTML.className = "todo-filter-box"
    
    FilterBoxHTML.style.display = getIsFilterBoxEnabled() ? "flex" : "none";
    
    // theree options:
    const btn_show_all = document.createElement('button');
    const btn_show_done = document.createElement('button');
    const btn_show_remaining = document.createElement('button');

    btn_show_all.textContent = "All"
    btn_show_done.textContent = "Done"
    btn_show_remaining.textContent = "Remaining"

    FilterBoxHTML.textContent = "Filter:"
    FilterBoxHTML.append(btn_show_all, btn_show_done, btn_show_remaining)
    
    const allFilterOptions = [btn_show_all,btn_show_done, btn_show_remaining]

    // active option reference: 

    let activeOption = btn_show_all
    
    // Indicator for showing the selected option:
    const indicator = document.createElement('indicatior');
    indicator.className = 'indicator'
    
    const SetIndicatorToButton = (btn: HTMLElement) => {
        indicator.style.left = btn.offsetLeft + 'px'
        indicator.style.width = getComputedStyle(btn).width

    }
    
    setTimeout(() => { activeOption.click() }, 1)

    updateFilterIndicatorPosn = () => {
        indicator.style.transition = 'left 0s'
        SetIndicatorToButton(activeOption)
        indicator.style.transition = 'left 250ms'
    }
    
    window.addEventListener('resize', () => {
        if(!getShowSettings()) updateFilterIndicatorPosn();
    })

    setTimeout(() => {
        FilterBoxHTML.style.animation = 'none'
    }, 500);
    
    FilterBoxHTML.appendChild(indicator)
    
    allFilterOptions.forEach(
        btn => {
            btn.addEventListener('click',()=>{
                SetIndicatorToButton(btn);
                activeOption = btn;
                btn.classList.remove('inactive-option')
                btn.classList.add('active-option')
                allFilterOptions.forEach(
                    btn => {
                        if (btn !== activeOption){
                            btn.classList.add('inactive-option')
                            btn.classList.remove('active-option')
                        }
                    }
                )
            })
        }
    )

    btn_show_all.addEventListener('click', () => {TodoAppWrapperInstanceMethods?.showAll()})

    btn_show_done.addEventListener('click', ()=>{
        TodoAppWrapperInstanceMethods?.showOnlyDone()
    })

    btn_show_remaining.addEventListener('click', ()=>{
        TodoAppWrapperInstanceMethods?.showOnlyRemaining()
    })

    const methods = {
        html: FilterBoxHTML,
        setDisplay: (val:string) => {
            FilterBoxHTML.style.display = val
        },
        unfilter:() => {
            if(activeOption !== btn_show_all)  btn_show_all.click()
        },
    }
    
    return new HyperInstance({element: FilterBoxHTML, methods: methods})

}





export {CreateTodoAppWrapper, CreateFilterBox, updateFilterIndicatorPosn}
