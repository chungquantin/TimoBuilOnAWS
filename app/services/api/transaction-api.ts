// import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetTransactionsResult } from "./api.types"
// import { getGeneralApiProblem } from "./api-problem"
import { Transaction } from "../../models/transaction/Transaction"
import { getUnixMinLater, getUnixMonthAgo, getUnixNow } from "../../utils/date"
import { MOCK_USER } from "../../constants/RICH_USER"

// const API_PAGE_SIZE = 50

export class TransactionApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getTransactions(): Promise<GetTransactionsResult> {
    try {
      const response: { ok: string; problem: any; data: any[] } = {
        ok: "ok",
        problem: null,
        data: MOCK_USER.transactions.map((transaction) => ({
          ...transaction,
          currency: "VND",
        })),
      }

      const transactions = response.data

      return { kind: "ok", transactions }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
