/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../style/table/NDisplayedSelect.css'

interface IProps{
    setDisplayRules :any
}

function NDisplayedSelect({setDisplayRules} : IProps) 
{
    // const selectElement = useRef<HTMLSelectElement>(null)

    const NDisplayedOptions = ['10', '25', '50', '100']
    // const defaultOptionIndex = 0;

     /* should update select active option if 100 */

    return (
    <div id="entriesContainer">
        Show
        <select onChange={(e) => 
            {
                const currentPage = 0
                const nEntriesPerPage = e.target.value != null ? parseInt(e.target.value) : 50
                setDisplayRules({currentPage, nEntriesPerPage})
            }}
        >
            {NDisplayedOptions.map((opt, index) => (<option value={parseInt(opt)} key={'opt'+index}>{opt}</option>))}
        </select>
        entries
    </div>
    )
}

export default NDisplayedSelect