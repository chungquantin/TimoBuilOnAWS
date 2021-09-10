/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./AccountDashboard.style"
import { color } from "../../theme"
import { MOCK_USER } from "../../constants/RICH_USER"
import { BLANK_USER } from "../../constants/BLANK_USER"
import { useStores } from "../../models"
import { GlobalContext } from "../../constants/CONTEXT"

export const AccountDashboardScreen = observer(function AccountDashboardScreen() {
  const { transactionStore } = useStores()
  const { setGlobalState } = useContext(GlobalContext)
  const handler = {
    SelectAccount: (user) =>
      setGlobalState({
        user,
      }),
  }
  return (
    <View testID="AccountDashboardScreen" style={{ ...Style.Container, paddingHorizontal: 25 }}>
      <Screen unsafe={false} backgroundColor={color.transparent}>
        <View style={Style.Card}>
          <Text style={{ fontWeight: "bold", color: color.primary }}>{MOCK_USER.name}</Text>
          <Text style={{ marginTop: 5 }}>Email: {MOCK_USER.email}</Text>
          <Text style={{ marginTop: 5 }}>
            Spend Account: {transactionStore.getTransactionBalance(MOCK_USER.transactions as any)}
          </Text>
          <Text style={{ marginTop: 5 }}>
            Number of transactions: {MOCK_USER.transactions.length}
          </Text>
          <Button
            onPress={() => handler.SelectAccount(MOCK_USER)}
            style={{ marginTop: 20, backgroundColor: color.primary }}
          >
            <Text style={{ color: color.palette.white }}>Select</Text>
          </Button>
        </View>
        <View style={Style.Card}>
          <Text style={{ fontWeight: "bold", color: color.primary }}>{BLANK_USER.name}</Text>
          <Text style={{ marginTop: 5 }}>Email: {BLANK_USER.email}</Text>
          <Text style={{ marginTop: 5 }}>
            Spend Account: {transactionStore.getTransactionBalance(BLANK_USER.transactions as any)}
          </Text>
          <Text style={{ marginTop: 5 }}>
            Number of transactions: {BLANK_USER.transactions.length}
          </Text>
          <Button
            onPress={() => handler.SelectAccount(BLANK_USER)}
            style={{ marginTop: 20, backgroundColor: color.primary }}
          >
            <Text style={{ color: color.palette.white }}>Select</Text>
          </Button>
        </View>
      </Screen>
    </View>
  )
})
