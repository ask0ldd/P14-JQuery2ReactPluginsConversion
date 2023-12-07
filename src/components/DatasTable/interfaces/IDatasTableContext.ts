import { ITableState, reducerDispatchType } from "../hooks/useTableManager"
import { TableModel } from "../models/TableModel"

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDatasTableContext{
    /*paginationRules? : IPaginationRules
    tableDatasState : Array<any>
    ordering? : IOrdering
    searchString? : string
    tableModel : TableModel
    setPaginationRules?({currentPage, nEntriesPerPage} : IPaginationRules) : void
    setOrdering?({column, direction} : IOrdering) : void
    setSearchString?(string : string) : void*/
    tableModel? : TableModel
    dispatch? : reducerDispatchType
    tableState? : ITableState 
}

export interface IPaginationRules{
    currentPage : number
    nEntriesPerPage : number
}

export interface IOrdering{
    column : string
    direction : 'asc' | 'desc'
}