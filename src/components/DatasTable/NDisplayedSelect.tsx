import '../../style/table/NDisplayedSelect.css'

function NDisplayedSelect() {

    const NDisplayedOptions = ['10', '25', '50', '100']
    // const defaultOptionIndex = 0;

    return (
    <div id="entriesContainer">
        Show
        <select>
            {NDisplayedOptions.map((opt, index) => (<option key={'opt'+index}>{opt}</option>))}
        </select>
        entries
    </div>
    )
}

export default NDisplayedSelect