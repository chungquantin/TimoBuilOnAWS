/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { SectionList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./TimoTransactionList.style"
import { color } from "../../theme"
import { TransactionItem } from "../TransactionItem"
import { useStores } from "../../models"
import { useIsFocused } from "@react-navigation/core"

export const TimoTransactionListScreen = observer(function TimoTransactionListScreen() {
  const isFocused = useIsFocused()
  const { transactionStore } = useStores()
  const handler = {
    OpenTransactionDetail: (item) => {
      console.log(item)
    },
  }
  const transactionList = transactionStore.groupTransactionByMonthAndYear
  React.useEffect(() => {
    transactionStore.fetchTransactions()
  }, [isFocused])
  return (
    <View testID="TimoTransactionListScreen" style={Style.Container}>
      <Screen
        style={{ backgroundColor: color.palette.offWhite, paddingBottom: 100 }}
        preset="scroll"
      >
        <View style={{ ...Style.Container, paddingTop: 20 }}>
          <View style={{ ...Style.Card, marginHorizontal: 20 }}>
            <View style={{ alignItems: "center", marginBottom: 25 }}>
              <Text>Available balance</Text>
              <Text
                style={{ fontSize: 25, marginTop: 5, fontWeight: "bold", color: color.primary }}
              >
                {transactionStore.transactionBalance}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>Remaining</Text>
                <Text
                  style={{ fontSize: 18, marginTop: 5, fontWeight: "bold", color: color.primary }}
                >
                  {transactionStore.transactionBalance}
                </Text>
              </View>
              <View style={{ height: "100%", width: 1, backgroundColor: color.palette.offWhite }} />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>Pending</Text>
                <Text
                  style={{ fontSize: 18, marginTop: 5, fontWeight: "bold", color: color.primary }}
                >
                  0
                </Text>
              </View>
            </View>
          </View>
          <SectionList
            style={Style.BottomContainer}
            sections={transactionList}
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
        </View>
      </Screen>
    </View>
  )
})
