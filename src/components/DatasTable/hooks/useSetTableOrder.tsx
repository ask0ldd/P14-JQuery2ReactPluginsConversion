/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { IColumnDefElement, IOrdering, IPaginationRules } from "../DatasTable"

// !!! get rid of everything defining tableDatas type, or datatable won't adapt to other contexts
function useSetTableOrder(tableDatas : Array<any>, setTableDatas : (tableDatas : Array<any>) => void, searchString : string, ordering : IOrdering, columnsDefinition : IColumnDefElement[], paginationRules : IPaginationRules){

    const frCollator = new Intl.Collator('en')

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
        sortTable(sortedColumnDef.datatype, ordering.direction, filteredTable)

    }, [ordering.column, ordering.direction, paginationRules.currentPage, searchString])

    function dateToTime(date : string){
        const [day, month, year] = date.split('/')
        return new Date(parseInt(year), parseInt(month), parseInt(day)).getTime()
    }

    function sortTable(dataType : string, direction : 'asc' | 'desc', datasTable : Array<any>){
        if(dataType === 'date'){
            switch(direction){
               case 'asc' : return setTableDatas(datasTable.sort((a,b) => dateToTime(b[ordering.column]) - dateToTime(a[ordering.column]))); break
               case 'desc' : return setTableDatas(datasTable.sort((a,b) => dateToTime(b[ordering.column]) - dateToTime(a[ordering.column]))); break
            }
        }
        switch(direction){
            case 'asc' : return setTableDatas(datasTable.sort((a,b) => frCollator.compare(a[ordering.column], b[ordering.column]))); break
            case 'desc' : return setTableDatas(datasTable.sort((a,b) => frCollator.compare(b[ordering.column], a[ordering.column]))); break
        }

    }
}

export default useSetTableOrder