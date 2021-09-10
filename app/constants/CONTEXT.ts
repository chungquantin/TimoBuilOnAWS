/* eslint-disable camelcase */
import React from "react"
import { Transaction } from "../models/transaction/transaction"

interface GlobalState {
  user?: {
    id: string
    name: string
    email: string
    gender: string
    organization: string
    job: string
    birthday: string
    spend_account: {
      code: string
      balance: number
      actualBalance: number
      plannedExpenditure: number
      actualExpenditure: number
    }
    transactions: Transaction[]
    template: {
      [key: string]: {
        [key: string]: {
          range: number
          data: Transaction[]
        }
      }
    }
    piggyBank: {
      goals: {
        goal_id: string
        name: string
        target: string
        current_progress: string
        create_date: number
        end_date: number
        weekly_amount: 167000
      }[]
      gameInfo: any
    }
  }
}
export const emptyUser = {
  id: "",
  name: "Unknown",
  email: "",
  gender: "",
  organization: "",
  job: "",
  birthday: "",
  spend_account: {
    code: "",
    balance: 0,
    actualBalance: 0,
    plannedExpenditure: 0,
    actualExpenditure: 0,
  },
  transactions: [],
  template: {},
  piggyBank: {
    goals: [],
    gameInfo: [],
  },
}
export const GlobalContext = React.createContext<{
  state: GlobalState
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>
}>({
  state: {
    user: emptyUser,
  },
  setGlobalState: null,
})
