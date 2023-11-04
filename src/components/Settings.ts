import './Settings.css'

const NewSettingsItem = (propertyName: string = "Some Property: ", ) => {
    const encl = document.createElement('span')
    
    encl.className = 'settings-item'

    const propertyNameBox = document.createElement('p');

    propertyNameBox.textContent = propertyName;
    
    encl.appendChild(propertyNameBox)

    return encl
}

const Settings = () => {
    const encl = document.createElement('div')
    
    encl.className = 'settings-page'

    encl.innerHTML += '<h2>Settings</h>'

    encl.appendChild(NewSettingsItem('Light / Dark Mode:'))
    encl.appendChild(NewSettingsItem())
    encl.appendChild(NewSettingsItem())

    return encl;
}

export {Settings}
