interface IProps{
    nEntries: number
    totalEntries: number
}

function NEntries({nEntries, totalEntries} : IProps){
    return(
        <div id="infosContainer">Showing {nEntries} of {totalEntries} entries</div>
    )
}

export default NEntries