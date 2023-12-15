/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react"

export const MainContext = createContext<IMainContext>({employees : []})

interface IMainContext{
    employees : Array<any>
}