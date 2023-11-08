import {  getHyperTodos } from "../../global"

const deleteSelectedButton = () => {
    
    const btn = document.createElement('button')
    
    btn.textContent = "delete completed"
    
    btn.className = 'footerBtn delete-selected-btn'
    
    btn.onclick = () => {
        for (let todo of getHyperTodos()){
            if (todo.methods?.getIsChecked()) todo.methods?.deleteCompletely()
        }

    }
    
    return btn
}

const deleteAllButton = () => {
    
    const btn = document.createElement('button')
    
    btn.textContent = "delete all"
    
    btn.className = 'footerBtn delete-selected-btn'
    
    btn.onclick = () => {
        for (let todo of getHyperTodos()){
            todo.methods?.deleteCompletely()
        }

    }
    
    return btn
}




export {deleteSelectedButton, deleteAllButton}