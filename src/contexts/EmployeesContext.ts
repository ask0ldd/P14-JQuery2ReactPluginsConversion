/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react"

export const EmployeesContext = createContext<IEmployeesContext>({employees : []})

interface IEmployeesContext{
    employees : Array<any>
}