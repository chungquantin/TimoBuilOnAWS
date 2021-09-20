/* eslint-disable react/jsx-key */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Dimensions, View } from "react-native"
import { Button, Text, Screen } from "../../components"
import Style from "./PFTemplateList.style"
import { color } from "../../theme"
import { GlobalContext } from "../../constants/CONTEXT"
import { useNavigation } from "@react-navigation/core"
import { AutoImage } from "../../components/auto-image/auto-image"
import { TouchableOpacity } from "react-native-gesture-handler"
import { suggestedTemplates } from "../../constants/SUGGESTED_TEMPLATE"

const CharacterFindingMail = require("../../../assets/character/character-finding-mail.png")

export const PFTemplateListScreen = function PFTemplateListScreen() {
  const navigator = useNavigation()
  const { state } = React.useContext(GlobalContext)

  const templateKeyList = Object.keys(state.user.template)
  const handler = {
    AddNewTemplate: () => navigator.navigate("AddNewTemplate" as any),
    SelectTemplate: (id: string) =>
      (navigator as any).navigate("Template", {
        templateId: id,
      } as any),
  }
  return (
    <Screen
      unsafe={true}
      style={{ ...Style.Container, width: Dimensions.get("screen").width, paddingBottom: 100 }}
    >
      {Object.keys(suggestedTemplates).map((template) => (
        <TouchableOpacity onPress={() => handler.SelectTemplate(template)}>
          <View style={Style.Card}>
            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", color: color.palette.white, fontSize: 15 }}>
                {template}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: color.palette.white,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: color.palette.timoPurple,
                      fontSize: 11,
                      paddingHorizontal: 10,
                    }}
                  >
                    Timo Gợi Ý
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: color.palette.green,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    marginLeft: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: color.palette.timoPurple,
                      fontSize: 11,
                      paddingHorizontal: 10,
                    }}
                  >
                    {Object.keys(suggestedTemplates[template].data).length} mục
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ color: color.palette.white, marginTop: 20, fontSize: 12 }}>
              {suggestedTemplates[template].description.slice(0, 100).trim()}...
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <View>
        {templateKeyList.map((key) => (
          <View
            style={{
              ...Style.Card,
              backgroundColor: color.palette.timoYellow,
            }}
          >
            <Text style={{ fontWeight: "bold", color: color.palette.white, fontSize: 15 }}>
              {key}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <AutoImage
          source={CharacterFindingMail}
          resizeMode="cover"
          style={{ height: 200, width: 150 }}
        />
        <Text>Bạn chưa có mẫu </Text>
      </View>
      <Button
        onPress={handler.AddNewTemplate}
        style={{ width: "100%", marginTop: 20, backgroundColor: color.primary }}
      >
        <Text style={{ color: color.palette.white }}>Tạo thêm mẫu mới</Text>
      </Button>
    </Screen>
  )
}
