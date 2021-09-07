import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./PFAddNewGoal.style"

export const PFAddNewGoalScreen = observer(function PFAddNewGoalScreen() {
  return (
    <View testID="PFAddNewGoalScreen" style={Style.Container}>
      <Screen>
        <Text>Profile</Text>
      </Screen>
    </View>
  )
})
