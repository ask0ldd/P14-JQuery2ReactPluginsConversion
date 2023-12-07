/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { IColumnDefElement } from "../interfaces/IColumnDefElement"
import { ISorting, IPaginationRules } from "../DatasTableContext"

// !!! jsdoc
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useOrderTable(
    tableDatas : Array<any>, 
    setTableDatas : (tableDatas : Array<any>) => void, 
    searchString : string, 
    sorting : ISorting, 
    columnsDefinition : IColumnDefElement[], 
    paginationRules : IPaginationRules
){

    const frCollator = new Intl.Collator('en')

    // react to order change / search field typing / any pagination use
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

        if(sorting.column === '') return setTableDatas(filteredTable)
        const sortedColumnDef = [...columnsDefinition].filter(column => column.accessor === sorting.column)[0]
        sortTable(sortedColumnDef.datatype, sorting.direction, filteredTable)

    }, [sorting.column, sorting.direction, paginationRules.currentPage, searchString])

    // !!! jsdoc
    function dateToTime(date : string){
        const [day, month, year] = date.split('/')
        return new Date(parseInt(year), parseInt(month), parseInt(day)).getTime()
    }

    // !!! jsdoc
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function sortTable(dataType : string, direction : 'asc' | 'desc', datasTable : Array<any>){
        if(dataType === 'date'){
            switch(direction){
               case 'asc' : return setTableDatas(datasTable.sort((a,b) => dateToTime(b[sorting.column]) - dateToTime(a[sorting.column]))); break
               case 'desc' : return setTableDatas(datasTable.sort((a,b) => dateToTime(a[sorting.column]) - dateToTime(b[sorting.column]))); break
            }
        }
        switch(direction){
            case 'asc' : return setTableDatas(datasTable.sort((a,b) => frCollator.compare(a[sorting.column], b[sorting.column]))); break
            case 'desc' : return setTableDatas(datasTable.sort((a,b) => frCollator.compare(b[sorting.column], a[sorting.column]))); break
        }

    }
}

export default useOrderTable