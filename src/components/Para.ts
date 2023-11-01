import { HyperInstance } from "../Hyper/Hyper";

const Para = (text: string) => {
    const ctr = document.createElement('p');
    ctr.textContent=text;
    return {element: ctr, methods: {}}
}

const CreatePara = (text:string='Hello World!') => {
    return new HyperInstance(Para(text))
}

export { CreatePara }
