const todos:{id:string, text:string, dateCreated: Date}[] = [
    {id: 's43fr', text:"One", dateCreated:new Date()},
    {id: 'dsfw3', text:"Two Do", dateCreated: new Date()}
]

const getTodos = () => {
    return todos
}

const addTodo = ( todoObject: {id: string, text: string, dateCreated: Date} ) => {
    todos.push(todoObject)
}

export {getTodos, addTodo}
