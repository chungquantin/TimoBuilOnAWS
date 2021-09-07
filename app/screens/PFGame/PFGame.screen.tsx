import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./PFGame.style"

export const PFGameScreen = observer(function PFGameScreen() {
  return (
    <View testID="PFGameScreen" style={Style.Container}>
      <Screen>
        <Text>Profile</Text>
      </Screen>
    </View>
  )
})
