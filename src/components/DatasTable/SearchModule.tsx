/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../style/table/SearchModule.css'

interface IProps{
    setSearchString: any
}

function SearchModule({setSearchString} : IProps) {

    /* oninput should bring the user back to page 1 */

    return (
        <div id="searchContainer">
        <label htmlFor='search'>Search:</label>
        <input contentEditable id='search' type="text" onInput={(e)=> setSearchString(e.currentTarget.value)}/>
        </div>
    )
    
}

export default SearchModule