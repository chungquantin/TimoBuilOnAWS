import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./TimoTransactionDetail.style"

export const TimoTransactionDetail = observer(function TimoTransactionDetail() {
  return (
    <View testID="TimoTransactionDetail" style={Style.Container}>
      <Screen>
        <Text>Profile</Text>
      </Screen>
    </View>
  )
})
