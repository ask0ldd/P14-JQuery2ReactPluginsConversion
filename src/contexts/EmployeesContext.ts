/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react"

export const EmployeesContext = createContext<IEmployeesContext>({employeesList : [], setEmployeesList : () => void 0})

interface IEmployeesContext{
    employeesList : Array<any>
    setEmployeesList : React.Dispatch<React.SetStateAction<Array<any>>> | (() => void)
}