import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./EMTemplate.style"

export const EMTemplateScreen = observer(function EMTemplateScreen() {
  return (
    <View testID="EMTemplateScreen" style={Style.Container}>
      <Screen>
        <Text>Profile</Text>
      </Screen>
    </View>
  )
})
