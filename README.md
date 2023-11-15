# todo-ts 
A frontend [ progressive  ] web app made with TypeScript using Vite.
## 🔑 Key features 
- add, delete, and modify your tasks.
- your tasks are saved in 🗄️local storage.
- filter your tasks based on their completion status.
- beautiful and responsive UI with pleasing animations, and 🔆light/🌙dark mode

## ✨ Detailing 
1. the app is completely ⌨️keyboard-friendly:
    - you can use the `Tab` key on your keyboard to itereate over the enabled buttons.
    - press `Enter` key after you input the desired text in the inputs to save - no need to click on save/add button.
2. your preferences are also saved in your 📁local storage:
    - whether you select the light or dark mode, your choice is saved in your 📂localStorage, so that, when you open your app next time, the mode is already set. also, the mode toggle button in the footer is completely synchronized with the control in settings. 
    - your choice for `todo-filter-box` (found in the ⚙️settings) will also be saved in the local storage.
3. multiple task delete functionality:
    delete all the checked tasks or all tasks in a single click, using the buttons in the `footer`.
4. get real time stats in the footer:
   three chips in the footer show how many tasks are present in the app, how many are checked(completed), and how many of them are remaining(unchecked).
