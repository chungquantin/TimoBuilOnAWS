/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { View, ViewStyle, GestureResponderEvent } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../theme"
import { Text } from "../components"
import { Transaction } from "../models/transaction/transaction"
import { formatUnixDate } from "../utils/date"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Style } from "./TransactionItem.style"
import { formatByUnit } from "../utils/currency"

interface Props {
  transaction: Partial<Transaction>
  style?: ViewStyle
  onPressHandler?: (event: GestureResponderEvent) => void
}

export const TransactionItem = observer(function TransactionItem({
  transaction,
  style,
  onPressHandler,
}: Props) {
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View key={transaction.id} testID="TransactionItem" style={{ ...Style.Container, ...style }}>
        <View style={{ flex: 3 }}>
          <Text style={Style.Header}>{transaction.description}</Text>
          <Text>
            <Text style={Style.Subheader}>Date</Text>
            <Text style={Style.Subheader}>: {formatUnixDate(transaction.createdAt)}</Text>
          </Text>
        </View>
        <View style={{ flex: 1.5, ...Style.MiddleContainer, alignItems: "center" }}>
          {/* TODO add select category button */}
          {<Text style={{ fontSize: 10 }}>{transaction.category}</Text>}
        </View>
        <View style={{ flex: 2, ...Style.MiddleContainer, alignItems: "flex-end" }}>
          <Text>
            {transaction.type === "IN" ? (
              <Text style={{ ...Style.TransactionAmount, color: color.palette.timoYellow }}>
                +{formatByUnit(transaction.amount, "VND")}
              </Text>
            ) : (
              <Text style={{ ...Style.TransactionAmount, color: color.palette.timoBlue }}>
                -{formatByUnit(transaction.amount, "VND")}
              </Text>
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})
