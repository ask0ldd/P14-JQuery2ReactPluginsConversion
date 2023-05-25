interface IProps{
    nEntries:number
}

function NEntries({nEntries} : IProps){
    return(
        <div id="infosContainer">Showing 1 of {nEntries} entries</div>
    )
}

export default NEntries