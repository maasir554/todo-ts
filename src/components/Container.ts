import { logo } from "../assets/logo"

import { HyperInstance } from "../Hyper/Hyper"

type ContainerMethods = { setBGColor: (color: string) => void  } 

type containerPropsType = {className?:string, id?:string|null, displayElements?: HTMLElement[]|null}

const containerProps: containerPropsType = {className:'container', id:null, displayElements:null}



// Reusable component: Container
/**
 * ### Reusable Component: Container
 * - When we call this function, it will create a new DOM component for us,
 *   and bind the methods defined to it.
 * - We can also pass props for creation of the component
 * - After the component is created, and methods are defined, the function will return an object containing both.
 * - this object will be passed to HyperInstance, as it will keep them binded, and also provide functionality for adding nested children. 
 * 
 * @param  props for passing css className and id(if required) and an element which is to be rendered inside the Container.
 * we can add more props according to our requirements 
 * @returns an object containing *element* and *methods* 
*/

const Container = ( props = containerProps ) => {

    const ctr = document.createElement('div')
    
    ctr.className = 'container '
    
    if (props.className) ctr.className += props.className;
    
    if(props.id) ctr.id = props.id;

    // Container will also have a top bar:-
    
    const TopBar = document.createElement('span')

    TopBar.className = 'top-bar'

    // Top bar -> logo

    TopBar.innerHTML += logo('light')
    

    // Top bar -> title

    const topBarTitle = document.createElement('h3')

    topBarTitle.textContent = "todo-app made with TypeScript"

    //append title to top bar

    TopBar.appendChild(topBarTitle)

    // settings button: 

    const settingsBtn = document.createElement('i')

    settingsBtn.className = 'ri-settings-5-line'

    //append settings button to top bar

    TopBar.appendChild(settingsBtn)

    // append top-bar to container
    
    ctr.appendChild(TopBar)

    const footer = document.createElement('footer')

    footer.textContent = 'made by Mohammad Maasir'

    // make display area for the container

    const displayArea = document.createElement('section')

    // append display area

    ctr.appendChild(displayArea)

    // appending the elements received in list from props
    
    props.displayElements?.forEach(
        (element: HTMLElement) => displayArea.appendChild(element)
    )


    // append footer to Container

    ctr.appendChild(footer)

    const methods = {
        setBGColor : (color: string) => {ctr.style.setProperty('--background-color', color)}
    }
    
    return {element:ctr , methods:methods}
} 

/**
 *  Function for creation of an instance of reusable component Container
 * - this will be useful for creating multiple instances of Container component.
 * - 
 * @returns A `HyperInstance` object that have the DOM element and integrated Methods inside it
 */

const CreateContainer = (props: containerPropsType  = {className:'', id:null , displayElements: null}) =>{
    return new HyperInstance<ContainerMethods>( Container(props) )
    // NOTE: for this element, we will not pass the child as as Hyper child, but in props instead.

}

export { CreateContainer }