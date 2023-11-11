import { getActiveMode, setActiveMode, updateAppThemeAndMode } from '.';
import { getIsFilterBoxEnabled, setIsFilterBoxEnabled } from '../global';
import { TodoAppWrapperInstanceMethods, todoFilterBox } from '../main';
import './Settings.css'

const LightDarkOptionBox = () => {
    
    const optionBox = document.createElement('span');

    optionBox.className = 'settings-option-box'
    
    const option1 = document.createElement('button');

    const option2 = document.createElement('button');

    option1.textContent = 'light'

    option2.textContent = 'dark'

    optionBox.appendChild(option1)
    optionBox.appendChild(option2)

    const indicator = document.createElement('div');

    const setIndicatorTo = (option: HTMLElement) => {        
        // getComputedStyle can only be accessed after the element is added to DOM.
        indicator.style. width = getComputedStyle(option).width;
        indicator.style.height = getComputedStyle(option).height;
        indicator.style.left = option.offsetLeft + 'px'
    } 
    
    setTimeout(() => {
         setIndicatorTo(getActiveMode() === 'light' ? option1 : option2) 
        }, 1);
    
    option1.onclick = () =>{
        setIndicatorTo(option1)
        setActiveMode('light')
        updateAppThemeAndMode()
    }

    option2.onclick = () =>{
        setIndicatorTo(option2)
        setActiveMode('dark')
        updateAppThemeAndMode()
    }

    optionBox.appendChild(indicator)

    return {
        html: optionBox , 
        setIndicatorToMode: () => setIndicatorTo(getActiveMode() === 'light' ? option1 : option2) 
    }
}

const NewSettingsItem = (propertyName: string = "Some Property: ", optionBox: HTMLElement ) => {
    const encl = document.createElement('span')
    
    encl.className = 'settings-item'

    const propertyNameBox = document.createElement('p');

    propertyNameBox.textContent = propertyName;
    
    encl.appendChild(propertyNameBox)

    //-- options:

    encl.appendChild(optionBox)

    return encl
}

let ThemeIndicatorBox: {html: HTMLElement, setIndicatorToMode: () => void}; 

const Settings = () => {
    const encl = document.createElement('div')
    
    encl.className = 'settings-page'

    encl.innerHTML += '<h2>Settings</h>'

    ThemeIndicatorBox = LightDarkOptionBox()

    FilterboxEnabledDisplayBox = ToggleFilterBoxOptionBox()
    
    encl.appendChild(NewSettingsItem('Light / Dark Mode:', ThemeIndicatorBox.html))

    encl.appendChild(NewSettingsItem("Filter Box:", FilterboxEnabledDisplayBox.html))
    
    return encl;
}

const updateThemeIndicatorBox = () => {
    if(ThemeIndicatorBox?.setIndicatorToMode) ThemeIndicatorBox?.setIndicatorToMode()
}

const ToggleFilterBoxOptionBox = () => {
    
    const optionBox = document.createElement('span');

    optionBox.className = 'settings-option-box'
    
    const option1 = document.createElement('button');

    const option2 = document.createElement('button');

    option1.textContent = 'off'

    option2.textContent = 'on'

    optionBox.appendChild(option1)
    optionBox.appendChild(option2)

    const indicator = document.createElement('div');

    const setIndicatorTo = (option: HTMLElement) => {        
        // getComputedStyle can only be accessed after the element is added to DOM.
        indicator.style. width = getComputedStyle(option).width;
        indicator.style.height = getComputedStyle(option).height;
        indicator.style.left = option.offsetLeft + 'px'
    }
    
    setTimeout(() => {
         setIndicatorTo( getIsFilterBoxEnabled() ?  option2: option1) 
        }, 1);
    
    option1.onclick = () =>{
        setIndicatorTo(option1)
        
        setIsFilterBoxEnabled(false)
        todoFilterBox.methods?.setDisplay('none')
        TodoAppWrapperInstanceMethods?.showAll();
    }

    option2.onclick = () =>{
        setIndicatorTo(option2)

        setIsFilterBoxEnabled(true)
        todoFilterBox.methods?.setDisplay('flex')
        
    }

    optionBox.appendChild(indicator)

    return {
        html: optionBox , 
        
    }
}

let FilterboxEnabledDisplayBox: {html: HTMLElement}; 

export {Settings, updateThemeIndicatorBox}
