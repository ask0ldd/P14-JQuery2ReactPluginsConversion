import { createContext } from "react"
import { ITableState, reducerDispatchType } from "./hooks/useTableManager"
import { TableModel } from "./models/TableModel"

const initialContext : IDatasTableContext = {}

export const DatasTableContext = createContext<IDatasTableContext>(initialContext)

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDatasTableContext{
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