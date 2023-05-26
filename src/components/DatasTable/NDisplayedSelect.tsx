/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../style/table/NDisplayedSelect.css'
import { useRef } from 'react'

interface IProps{
    setDisplayingRange :any
}

function NDisplayedSelect({setDisplayingRange} : IProps) 
{
    const selectElement = useRef<HTMLSelectElement>(null)

    const NDisplayedOptions = ['10', '25', '50', '100']
    // const defaultOptionIndex = 0;

    return (
    <div id="entriesContainer">
        Show
        <select ref={selectElement} onSelect={() => setDisplayingRange([0, selectElement.current?.value])}>
            {NDisplayedOptions.map((opt, index) => (<option value={parseInt(opt)} key={'opt'+index}>{opt}</option>))}
        </select>
        entries
    </div>
    )
}

export default NDisplayedSelect