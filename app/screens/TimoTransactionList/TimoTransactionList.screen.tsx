/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { SectionList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./TimoTransactionList.style"
import { color } from "../../theme"
import { TransactionItem } from "../TransactionItem"
import { useStores } from "../../models"
import { useIsFocused, useNavigation } from "@react-navigation/core"
import { GlobalContext } from "../../constants/CONTEXT"
import { formatByUnit } from "../../utils/currency"
import { AutoImage } from "../../components/auto-image/auto-image"

const ChartIcon = require("../../../assets/icon/chart-icon.png")

export const TimoTransactionListScreen = observer(function TimoTransactionListScreen() {
  const isFocused = useIsFocused()
  const navigator = useNavigation()
  const { transactionStore } = useStores()
  const { state } = React.useContext(GlobalContext)
  const handler = {
    OpenTransactionDetail: (item) => {
      console.log(item)
    },
    AddNewTransaction: () => navigator.navigate("TransactionCreation" as any),
  }
  const transactionList = transactionStore.getGroupTransactionByMonthAndYear(
    state.user.transactions,
  )
  React.useEffect(() => {
    transactionStore.fetchTransactions()
  }, [isFocused])
  return (
    <View testID="TimoTransactionListScreen" style={Style.Container}>
      <Screen
        unsafe={true}
        style={{
          backgroundColor: color.palette.offWhite,
          paddingBottom: state.user.transactions.length > 20 ? 100 : 0,
        }}
        preset="scroll"
      >
        <View style={{ ...Style.Container, paddingTop: 20 }}>
          <View style={{ ...Style.Card, marginHorizontal: 20 }}>
            <View style={{ alignItems: "center", marginBottom: 25 }}>
              <Text>Số dư khả dụng</Text>
              <Text
                style={{ fontSize: 25, marginTop: 5, fontWeight: "bold", color: color.primary }}
              >
                {transactionStore.getTransactionBalance(state.user.transactions)}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>Thu nhập</Text>
                <Text
                  style={{ fontSize: 18, marginTop: 5, fontWeight: "bold", color: color.primary }}
                >
                  {formatByUnit(
                    state.user.transactions.length !== 0
                      ? state.user.transactions
                          .filter((transaction) => transaction.type === "IN")
                          .map((transaction) => transaction.amount)
                          .reduce((a, b) => a + b)
                      : 0,
                    "VND",
                  )}
                </Text>
              </View>
              <View style={{ height: "100%", width: 1, backgroundColor: color.palette.offWhite }} />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>Chi tiêu</Text>
                <Text
                  style={{ fontSize: 18, marginTop: 5, fontWeight: "bold", color: color.primary }}
                >
                  {formatByUnit(
                    state.user.transactions.length !== 0
                      ? state.user.transactions
                          .filter((transaction) => transaction.type === "OUT")
                          .map((transaction) => transaction.amount)
                          .reduce((a, b) => a + b)
                      : 0,
                    "VND",
                  )}
                </Text>
              </View>
            </View>
          </View>
          {state.user.transactions.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                marginBottom: 250,
                paddingHorizontal: 20,
                marginTop: 50,
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AutoImage
                  source={ChartIcon}
                  resizeMode="cover"
                  style={{ height: 150, width: 100, marginBottom: 30 }}
                />
              </View>
              <Text>Bạn chưa có giao dịch</Text>
              <Button
                onPress={handler.AddNewTransaction}
                style={{
                  backgroundColor: color.primary,
                  width: "100%",
                  marginTop: 20,
                  paddingVertical: 10,
                }}
              >
                <Text style={{ color: color.palette.white }}>Tạo giao dịch mới</Text>
              </Button>
            </View>
          ) : (
            <SectionList
              style={Style.BottomContainer}
              sections={transactionList.reverse()}
              renderSectionHeader={({ section: { month, year } }) => (
                <View style={Style.BottomTransactionLabelContainer}>
                  <Text style={Style.BottomTransactionLabelText}>{month}</Text>
                  <Text style={Style.BottomTransactionLabelText}>{year}</Text>
                </View>
              )}
              renderItem={({ item }) => (
                <TransactionItem
                  transaction={item}
                  onPressHandler={() => handler.OpenTransactionDetail(item)}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </Screen>
    </View>
  )
})
