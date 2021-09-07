// import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetTransactionsResult } from "./api.types"
// import { getGeneralApiProblem } from "./api-problem"
import { Transaction } from "../../models/transaction/Transaction"
import { getUnixMinLater, getUnixMonthAgo, getUnixNow } from "../../utils/date"
import { MOCK_USER } from "../../constants/MOCK"

// const API_PAGE_SIZE = 50

export class TransactionApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getTransactions(): Promise<GetTransactionsResult> {
    try {
      // make the api call
      // const response: ApiResponse<any> = await this.api.apisauce.get(
      //  "https://raw.githubusercontent.com/infinitered/ignite/master/data/rick-and-morty.json",
      //  { amount: API_PAGE_SIZE },
      // )

      const response: { ok: string; problem: any; data: any[] } = {
        ok: "ok",
        problem: null,
        data: MOCK_USER.transactions.map((transaction) => ({
          ...transaction,
          currency: "VND",
        })),
      }

      // the typical ways to die when calling an api
      // if (!response.ok) {
      //  const problem = getGeneralApiProblem(response)
      //  if (problem) return problem
      // }

      const transactions = response.data

      return { kind: "ok", transactions }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
