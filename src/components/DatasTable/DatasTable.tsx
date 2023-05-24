import Table from './Table'
import NDisplayedSelect from './NDisplayedSelect'
import SearchModule from './SearchModule'
import Pagination from './Pagination'
import NEntries from './NEntries'

export interface IProps {
    tableColumns : Array<string>
    tableDatas : Array<string> | Array<Date> | Array<number>
}

function DatasTable({tableColumns, tableDatas} : IProps){

    /*const Datas = [
        {
            'firstName' : 'john',
            'lastName' : 'doe',
            'birthDate' : '01/01/1985',
            'startDate' : '27/03/22',
            'street' : '31 baker street',
            'city' : 'new york',
            
        }
    ]*/

    return(
        <>
            <div id="entriesNSearchContainer">
                <NDisplayedSelect/>
                <SearchModule/>
            </div>
            <Table tableColumns={tableColumns} tableDatas={tableDatas}/>
            <div id="infosNPaginationContainer">
                <NEntries/>
                <Pagination/>
            </div>
        </>
    )
}

export default DatasTable

/*
[
    {"id":1,
    "firstName":"Bernarr",
    "lastName":"Camilleri",
    "street":"4 Starling Plaza",
    "city":"Rossosh’",
    "zipCode":"624282",
    "state":null,
    "birthDate":"04/06/2022",
    "startingDate":"09/08/2022"},
    "department":"human ressources"
*/