export interface IDatasTableContext{
    paginationRules? : IPaginationRules
    tableDatasState : Array<any>
    ordering? : IOrdering
    searchString? : string
    tableColumnsNames : Array<string>
    tableDatasKeys : Array<string>
    setPaginationRules?({currentPage, nEntriesPerPage} : IPaginationRules) : void
    setOrdering?({column, direction} : IOrdering) : void
    setSearchString?(string : string) : void
}

export interface IPaginationRules{
    currentPage : number
    nEntriesPerPage : number
}

export interface IOrdering{
    column : string
    direction : 'asc' | 'desc'
}