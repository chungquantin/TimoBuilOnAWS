/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Alert, Dimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text, Button } from "../../components"
import Style from "./EMTemplate.style"
import { useRoute } from "@react-navigation/core"
import { color } from "../../theme"
import { suggestedTemplates } from "../../constants/SUGGESTED_TEMPLATE"
import { TextInput } from "react-native-gesture-handler"
import { AutoImage } from "../../components/auto-image/auto-image"
import Slider from "@react-native-community/slider"
import { formatByUnit } from "../../utils/currency"
import { GlobalContext } from "../../constants/CONTEXT"

export const EMTemplateScreen = observer(function EMTemplateScreen() {
  const route = useRoute()
  const { state, setGlobalState } = React.useContext(GlobalContext)
  const { templateId } = route.params as any
  const template = suggestedTemplates[templateId].data
  const [formValues, setFormValues] = React.useState(
    Object.assign(
      {
        amount: 0,
      },
      templateId === "6 hũ tài chính"
        ? {
            jar1Percentage: template[Object.keys(template)[0]].percentage,
            jar2Percentage: template[Object.keys(template)[1]].percentage,
            jar3Percentage: template[Object.keys(template)[2]].percentage,
            jar4Percentage: template[Object.keys(template)[3]].percentage,
            jar5Percentage: template[Object.keys(template)[4]].percentage,
            jar6Percentage: template[Object.keys(template)[5]].percentage,
          }
        : {
            jar1Percentage: template[Object.keys(template)[0]].percentage,
            jar2Percentage: template[Object.keys(template)[1]].percentage,
            jar3Percentage: template[Object.keys(template)[2]].percentage,
          },
    ),
  )

  const handler = {
    AddTemplate: () => {
      const categories = {}
      Object.keys(template).forEach((category) =>
        Object.assign(categories, {
          [category]: {
            range:
              (formValues.amount * suggestedTemplates[templateId].data[category].percentage) / 100,
            data: [],
          },
        }),
      )

      setGlobalState({
        ...state,
        user: {
          ...state.user,
          template: {
            ...state.user.template,
            [templateId]: {
              ...categories,
            },
          },
        },
      })
      Alert.alert("Mẫu '6 lọ tài chính' được thêm thành công!")
    },
  }

  const RenderTemplate = () => (
    <View style={{ paddingHorizontal: 25 }}>
      <Text style={{ fontWeight: "bold", fontSize: 23, color: color.primary }}>{templateId}</Text>
      <Text style={{ marginTop: 10, textAlign: "justify", marginBottom: 20 }}>
        {suggestedTemplates[templateId].description}
      </Text>
      <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <AutoImage
          source={suggestedTemplates[templateId].jumbotron}
          defaultSource={suggestedTemplates[templateId].jumbotron}
          resizeMode="contain"
          style={{ height: 200, width: Dimensions.get("screen").width - 60 }}
        />
      </View>
      {Object.keys(suggestedTemplates[templateId].data).map((category, index) => (
        <View key={category} style={Style.Card}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ marginBottom: 10, fontWeight: "bold" }}>{category}</Text>
            <View>
              <Text style={{ fontSize: 14, marginBottom: 10 }}>
                {formValues[`jar${index + 1}Percentage`]}%
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, marginBottom: 10 }}>
            {suggestedTemplates[templateId].data[category].description}
          </Text>
          <Slider
            style={{ width: "100%", height: 40, marginBottom: 20 }}
            minimumValue={0}
            maximumValue={100}
            value={suggestedTemplates[templateId].data[category].percentage}
            minimumTrackTintColor={color.palette.green}
            maximumTrackTintColor={color.palette.offWhite}
          />
          <Text style={{ alignItems: "center", justifyContent: "center" }}>
            Hạn mức:{" "}
            {formatByUnit(
              (formValues.amount * suggestedTemplates[templateId].data[category].percentage) / 100,
              "VND",
            )}
          </Text>
        </View>
      ))}
    </View>
  )
  return (
    <View testID="EMTemplateScreen" style={Style.Container}>
      <Screen preset="scroll">
        <View style={{ marginBottom: 30, marginHorizontal: 20 }}>
          <Text>Mục tiêu</Text>
          <TextInput
            value={formValues.amount.toString()}
            onChangeText={(text) =>
              setFormValues({
                ...formValues,
                amount: parseInt(text.replace(/[^0-9]/g, "0")),
              })
            }
            style={{
              backgroundColor: color.palette.offWhite,
              paddingLeft: 20,
              paddingVertical: 10,
              marginTop: 10,
              borderRadius: 10,
            }}
          />
        </View>
        <RenderTemplate />
        <Button
          style={{
            backgroundColor: color.primary,
            marginBottom: 30,
            marginHorizontal: 20,
            height: 50,
          }}
          onPress={handler.AddTemplate}
        >
          <Text style={{ color: color.palette.white }}>Thêm mục</Text>
        </Button>
      </Screen>
    </View>
  )
})
