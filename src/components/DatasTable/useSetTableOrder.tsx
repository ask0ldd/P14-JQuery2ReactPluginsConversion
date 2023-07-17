import { useEffect } from "react"

function useSetTableOrder(){
    useEffect(() => {
        // [...usersDatas] to avoid any mutation
        let filteredTable
        if(searchString !== '') 
        {
            filteredTable = [...tableDatas].filter(row => {
                // check if one of the properties of a row contain the searchString
                for (const property in row) if(row[property].toString().toLowerCase().includes(searchString.toLowerCase())) return true
                return false
            })}else{
            filteredTable = [...tableDatas]
        }
        if(ordering.column === '') return setTableDatas(filteredTable)
        const sortedColumnDef = [...columnsDefinition].filter(column => column.datakey === ordering.column)[0]
        if(ordering.direction === 'asc' && sortedColumnDef.datatype === 'date') 
            return setTableDatas(filteredTable.sort((a,b) => dateToTime(b[ordering.column]) - dateToTime(a[ordering.column])))
        if(ordering.direction === 'desc' && sortedColumnDef.datatype === 'date') 
            return setTableDatas(filteredTable.sort((a,b) => dateToTime(a[ordering.column]) - dateToTime(b[ordering.column])))
        if(ordering.direction === 'asc') 
            return setTableDatas(filteredTable.sort((a,b) => frCollator.compare(a[ordering.column as keyof IUsersDatas], b[ordering.column as keyof IUsersDatas])))
        if(ordering.direction === 'desc') 
            return setTableDatas(filteredTable.sort((a,b) => frCollator.compare(b[ordering.column as keyof IUsersDatas], a[ordering.column as keyof IUsersDatas])))
}

export default useSetTableOrder