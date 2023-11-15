import { getActiveMode, setActiveMode, updateAppThemeAndMode } from ".."

let updateToggleModeButtonDisplay: () => void;

const ModeToggleButton = () => {
    const btn = document.createElement('button')
    btn.title = "Toggle Light/Dark mode"

    btn.type = 'button'
    
    btn.className = 'theme-toggle-button'
    
    updateToggleModeButtonDisplay = () => btn.innerHTML = getActiveMode() === 'light' ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-clear-line"></i>'
    
    updateToggleModeButtonDisplay()
    
    btn.onclick = () => {
        if(getActiveMode() === 'light') { 
            setActiveMode('dark')
            btn.innerHTML = '<i class="ri-moon-clear-line"></i>'
        }
        else {
            setActiveMode('light')
            btn.innerHTML = '<i class="ri-sun-line"></i>'
        }

        updateAppThemeAndMode()
        
    }

    return btn
}

export {ModeToggleButton, updateToggleModeButtonDisplay}
