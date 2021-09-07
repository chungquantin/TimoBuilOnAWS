import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./EMNewTemplate.style"

export const EMNewTemplateScreen = observer(function EMNewTemplateScreen() {
  return (
    <View testID="EMNewTemplateScreen" style={Style.Container}>
      <Screen>
        <Text>Profile</Text>
      </Screen>
    </View>
  )
})
