
/**
 * - Class for combining a DOM Element with methods related to it, and also make it easier to add any number of children to it, whether nested or not.
 * - creates an object containing the methods and DOM element.
 * 
 * @class 
 */
class HyperInstance <MethodsType> {    
    raw: HTMLElement|null;
    out: (...args:HTMLElement[]) => any;
    methods?: MethodsType;

    /**
     * @param {HTMLElement} props.element - the DOM element i.e. `HTMLElement` created by you 
     * @param {MethodsType} props.methods - an object containing methods related to the DOM element above
     * 
     */

    constructor( props: { element: HTMLElement | null, methods?: MethodsType } ) {
        
        /**
         * 
         * @member {HTMLElement} - get the raw DOM element inside HyperInstance object
         */
        this.raw = props.element

        /**
         * to append children to the raw `HTMLElement` and get the raw `HTMLElement` after it.
         * @member {Function}
         * @returns HTMLElement after appending all children to it.
         */
        this.out = (...args: HTMLElement[]|null[]) => {
            args?.forEach(e => this.raw?.appendChild(e!))
            return this.raw;
        }

        if(props.methods) this.methods = props.methods
    }
}


/**
 * Function to declare the UI in the main.ts file, for Assembling all the Components' Instances.  
 * @param root the element in the HTML file in which we will populate our app
 * @param children Any (or no) number `HTMLElement` DOM elements (either pure, or returned by `HyperInstance.out` or `HyperInstance.raw`) that will be sequentially appended as children of the `root` element
 */

const ImplementHyper = (root:HTMLElement|null,...children: HTMLElement[]|null[]) => {
    children?.forEach(
        child => root?.appendChild(child!)
    )
}

export {HyperInstance, ImplementHyper}

