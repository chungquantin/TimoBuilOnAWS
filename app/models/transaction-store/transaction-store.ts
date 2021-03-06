import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Transaction, TransactionModel, TransactionSnapshot } from "../transaction/transaction"
import { TransactionApi } from "../../services/api/transaction-api"
import { withEnvironment } from "../extensions/with-environment"
import _ from "underscore"
import { getMonthFromUnix, getYearFromUnix, monthList } from "../../utils/date"
import { formatByUnit } from "../../utils/currency"

export const TransactionStoreModel = types
  .model("TransactionStore")
  .props({
    transactions: types.optional(types.array(TransactionModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    getTransactionBalance(transactions) {
      if (transactions.length === 0) return 0
      return formatByUnit(
        transactions
          .map((transaction) =>
            transaction.type === "IN" ? transaction.amount : transaction.amount * -1,
          )
          .reduce((a, b) => a + b),
        "VND",
      )
    },
    get transactionBalance() {
      return formatByUnit(
        self.transactions
          .map((transaction) =>
            transaction.type === "IN" ? transaction.amount : transaction.amount * -1,
          )
          .reduce((a, b) => a + b),
        "VND",
      )
    },
    getGroupTransactionByMonthAndYear(
      transactions,
    ): {
      month: string
      year: string
      data: Transaction[]
    }[] {
      const transactionGroupedByAllMonth = _.groupBy(transactions, (item) => {
        return `${getMonthFromUnix(item.createdAt) + 1}-${getYearFromUnix(item.createdAt)}`
      })
      const transactionList: {
        month: string
        year: string
        data: Transaction[]
      }[] = Object.keys(transactionGroupedByAllMonth).map((transactionKey) => {
        return {
          month: monthList[Number(transactionKey.split("-")[0]) - 1],
          year: transactionKey.split("-")[1],
          data: transactionGroupedByAllMonth[transactionKey],
        }
      })
      return transactionList
    },
    get groupTransactionByMonthAndYear(): {
      month: string
      year: string
      data: Transaction[]
    }[] {
      const transactionGroupedByAllMonth = _.groupBy(self.transactions, (item) => {
        return `${getMonthFromUnix(item.createdAt) + 1}-${getYearFromUnix(item.createdAt)}`
      })
      const transactionList: {
        month: string
        year: string
        data: Transaction[]
      }[] = Object.keys(transactionGroupedByAllMonth).map((transactionKey) => {
        return {
          month: monthList[Number(transactionKey.split("-")[0]) - 1],
          year: transactionKey.split("-")[1],
          data: transactionGroupedByAllMonth[transactionKey],
        }
      })
      return transactionList
    },
  }))
  .actions((self) => ({
    saveTransactions: (transactionSnapshots: TransactionSnapshot[]) => {
      self.transactions.replace(transactionSnapshots)
    },
  }))
  .actions((self) => ({
    fetchTransactions: flow(function* () {
      const transactionApi = new TransactionApi(self.environment.api)
      const result = yield transactionApi.getTransactions()

      if (result.kind === "ok") {
        self.saveTransactions(result.transactions)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

type TransactionStoreType = Instance<typeof TransactionStoreModel>
export interface TransactionStore extends TransactionStoreType {}
type TransactionStoreSnapshotType = SnapshotOut<typeof TransactionStoreModel>
export interface TransactionStoreSnapshot extends TransactionStoreSnapshotType {}
export const createTransactionStoreDefaultModel = () => types.optional(TransactionStoreModel, {})
