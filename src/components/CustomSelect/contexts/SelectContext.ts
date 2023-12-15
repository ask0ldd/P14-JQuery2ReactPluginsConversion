import { createContext } from "react";
import { ILabel, IOption } from "../CustomSelect";

export const SelectContext = createContext<ISelectContext>({
    selectId : '',
    options : [],  
    activeOption : {get : () => ({label:'', value:''}), set : () => false},
    listbox : {isExpanded : false, setAsExpanded : () => false},
    label : {text : ''}
})

interface ISelectContext{
    selectId : string
    options : Array<IOption>
    activeOption : {
        get : () => IOption
        set : (option : IOption) => void
    }
    listbox : {
        isExpanded : boolean, 
        setAsExpanded : (bool : boolean) => void
    }
    label : ILabel
}

