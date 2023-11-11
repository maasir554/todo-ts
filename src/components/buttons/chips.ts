import { getTodos } from "../../global";


const TotalTodosChip = document.createElement('span')

const TotalNumberOfTodos = () => {
    const todosCount = getTodos().length;
    TotalTodosChip.className = "chip";
    TotalTodosChip.textContent = `Total: ${todosCount}`
    return {html: TotalTodosChip, updateTotalTodoChipCount: (n: number) => TotalTodosChip.textContent = `Total: ${n}` };
}

const DoneTodosChip = document.createElement('span')

const DoneTodosCount = () => {
    const CompletedTodosCount = getTodos().filter(todo => todo.checked===true).length;
    
    DoneTodosChip.className = "chip";
    
    DoneTodosChip.textContent = `Completed: ${CompletedTodosCount}`
    
    return {html: DoneTodosChip, updateDoneTodoChipCount: (n: number) => DoneTodosChip.textContent = `Completed: ${n}` };
}

const RemainingTodosChip = document.createElement('span')

const RemainingTodosCount = () => {

    const NumberOfRemainingTodos = getTodos().filter(todo => todo.checked === false).length;
    RemainingTodosChip.className = 'chip'
    RemainingTodosChip.textContent = `Remaining: ${NumberOfRemainingTodos}`
    return {html: RemainingTodosChip, updateRemainingTodosCount: (n: number) => RemainingTodosChip.textContent = `Remaining: ${n}`}
}


export {TotalNumberOfTodos, DoneTodosCount, RemainingTodosCount}