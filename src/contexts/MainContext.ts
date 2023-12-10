/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react"
import usersDatasTen from "../datas/usersDatasTen"

export const MainContext = createContext<IMainContext>({employees : usersDatasTen})

interface IMainContext{
    employees : Array<any>
}