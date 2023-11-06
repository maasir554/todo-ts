
const AllThemes = {
    "default" : {
        "light":{
            "--normal-font-color": "rgb(90, 90, 90)",
            "--extreme-bg": "white",
            "--primary-bg": "rgb(250, 250, 250)",
            "--secondary-bg": "rgb(245, 245, 245)",
            "--normal-btn-bg": "rgb(225,225,225)",

            "--normal-border-color": "rgb(225, 225, 225)",
            "--imp-border-color": "rgb(200,200,200)",

            "--theme-color": "rgb(47, 107, 164)",

            "--tda-btn-hov-bg": "rgb(200,200,200)",

            "--tdi-bg":"rgb(245, 245, 245)",
            "--tdi-btn-bg": "rgb(240, 240, 240)",
            "--tdi-btn-hov-bg": "rgb(235, 235, 235)",
            "--tdi-btn-act-bg": "rgb(220, 220, 220)",

            "--tdi-done-bg": "rgb(225,225,225)",
            "--tdi-done-check-btn-bg":"rgb(170 218 147)",
            "--tdi-done-border-color": "rgb(112 172 84)",
            
            "--del-btn-fg": "rgb(174 78 78)",
            "--cancel-fg": "rgb(234, 73, 73)",
            "--save-icon-fg": "rgb(125, 176, 48)",

            "--scrollbar-bg": "rgb(245,245,245)",
            "--scrollbar-thumb-bg": "rgba(225,225,225)",
            "--scrollbar-thumb-hov-bg": "rgb(200,200,200)",

            "--indicator-bg":"white",
        },
        
        "dark":{
            '--normal-font-color': 'rgb(199 199 199)',
            '--extreme-bg': 'rgb(28 28 28)',
            '--primary-bg': 'rgb(25 25 25)',
            '--secondary-bg': 'rgb(51 51 51)',
            '--normal-btn-bg': 'rgb(27 27 27)',

            '--normal-border-color': 'rgb(91 91 91)',
            '--imp-border-color': 'rgb(76 76 76)',

            '--theme-color': 'rgb(102 156 206)',

            '--tda-btn-hov-bg': 'rgb(75 75 75)',
            
            '--tdi-bg': 'rgb(35 35 35)',
            '--tdi-btn-bg': 'rgb(51 51 51)',
            '--tdi-btn-hov-bg': 'rgb(65 65 65)',
            '--tdi-btn-act-bg': 'rgb(41 41 41)',

            "--tdi-done-bg": "rgb(70 70 70)",
            "--tdi-done-check-btn-bg":"#314426",
            "--tdi-done-border-color": "#4f7b3b",
            
            '--del-btn-fg': 'rgb(174 78 78)',
            '--cancel-fg': 'rgb(234, 73, 73)',
            '--save-icon-fg': 'rgb(125 176 48)',
           
            '--scrollbar-bg': 'rgb(30 30 30)',
            '--scrollbar-thumb-bg': 'rgb(51 51 51)',
            '--scrollbar-thumb-hov-bg': 'rgb(62 62 62)',

            "--indicator-bg":"rgb(36,36,36)",

        }
    }
}

let ActiveTheme = "default";

let ActiveMode = "light"

const getActiveTheme = () => {
    return ActiveTheme;
}

const setActiveTheme = (value: string) => ActiveTheme = value



const getActiveMode = () => {return ActiveMode}

const setActiveMode = (value: string) => ActiveMode = value


/*
 
    the theme properties will be accessed like this:

    AllThemes[ACTIVEthemename][ACTIVEmodename][property]
    example:-
    AllThemes["default"]["light"]["--primary-bg"]

 */

const updateAppThemeAndMode = () => {
    console.log("chhala bei!");
    const themeObj = AllThemes[ActiveTheme as keyof typeof AllThemes]
    
    const cssProperties = themeObj[ActiveMode as keyof typeof themeObj]

    for (let property in cssProperties){
        document.documentElement.style.setProperty(property, cssProperties[property as keyof typeof cssProperties])
    }
}

/* 
    '--normal-font-color': 'rgb(199 199 199)',
    '--extreme-bg': 'rgb(28 28 28)',
    '--primary-bg': 'rgb(25 25 25)',
    '--secondary-bg': 'rgb(51 51 51)',
    '--normal-btn-bg': 'rgb(27 27 27)',
    '--normal-border-color': 'rgb(91 91 91)',
    '--imp-border-color': 'rgb(76 76 76)',
    '--theme-color': 'rgb(102 156 206)',
    '--tda-btn-hov-bg': 'rgb(75 75 75)',
    '--tdi-bg': 'rgb(35 35 35)',
    '--tdi-btn-bg': 'rgb(51 51 51)',
    '--tdi-btn-hov-bg': 'rgb(65 65 65)',
    '--tdi-btn-act-bg': 'rgb(41 41 41)',
    '--del-btn-fg': 'rgb(174 78 78)',
    '--cancel-fg': 'rgb(234, 73, 73)',
    '--tick-icon-fg': 'rgb(125 176 48)',
    '--scrollbar-bg': 'rgb(30 30 30)',
    '--scrollbar-thumb-bg': 'rgb(51 51 51)',
    '--scrollbar-thumb-hov-bg': 'rgb(62 62 62)'
*/

export {updateAppThemeAndMode, setActiveMode, setActiveTheme, getActiveTheme, getActiveMode}
