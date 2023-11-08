import { getTodos } from "../../global";


const TotalTodosChip = document.createElement('span')

const TotalNumberOfTodos = () => {
    const todosCount = getTodos().length;
    TotalTodosChip.className = "chip";
    TotalTodosChip.textContent = `Total todos: ${todosCount}`
    return {html: TotalTodosChip, updateTotalTodoChipCount: (n: number) => TotalTodosChip.textContent = `Total todos: ${n}` };
}

const DoneTodosChip = document.createElement('span')

const DoneTodosCount = () => {
    const CompletedTodosCount = getTodos().filter(todo => todo.checked===true).length;
    
    DoneTodosChip.className = "chip";
    
    DoneTodosChip.textContent = `Completed todos: ${CompletedTodosCount}`
    
    return {html: DoneTodosChip, updateDoneTodoChipCount: (n: number) => DoneTodosChip.textContent = `Completed todos: ${n}` };
}

export {TotalNumberOfTodos, DoneTodosCount}