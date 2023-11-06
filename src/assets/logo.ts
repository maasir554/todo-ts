
export const logo = (themeMode:'light'|'dark') =>{

    const reqColor = themeMode === 'dark' ?  "white" : "rgb(90,90,90)";

    const oppColor = themeMode === 'dark' ?  "rgb(90,90,90)" : "white";

    return (`<svg xmlns="http://www.w3.org/2000/svg" width="50" height="37" viewBox="0 0 50 37" fill=${reqColor} stroke=${reqColor} >

            <path d="M0 25H22V30H5C2.23858 30 0 27.7614 0 25Z" fill="inherit" fill-opacity="0.81"/>

            <path d="M0 18H19V22H0V18Z" fill=${reqColor} />

            <path d="M0 15C0 12.2386 2.23858 10 5 10H21V15H0Z" fill=${reqColor} fill-opacity="0.81"/>

            <circle cx="32.3074" cy="19.5333" r="14.1926" stroke=${oppColor}  stroke-width="5"/>

            <path d="M24.563 20.7468L28.968 25.1518L39.3698 14.75" stroke=${oppColor} stroke-width="3"/>

            </svg>`
        )
}
