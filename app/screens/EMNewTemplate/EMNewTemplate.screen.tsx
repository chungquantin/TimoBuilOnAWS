/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Alert, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./EMNewTemplate.style"
import { color } from "../../theme"
import { GlobalContext } from "../../constants/CONTEXT"
import { TextInput } from "react-native-gesture-handler"
import { formatByUnit } from "../../utils/currency"

export const EMNewTemplateScreen = observer(function EMNewTemplateScreen() {
  const { state, setGlobalState } = React.useContext(GlobalContext)
  const [categories, setCategories] = React.useState({})
  const [formValues, setFormValues] = React.useState({
    category: "",
    range: "",
    name: "",
  })
  React.useEffect(() => {
    // Alert.alert(
    //  "Notice",
    //  "The shared information won't be send to any 3rd party and only used for analytics purpose that can help us to bring you smarter Goal Save.",
    //  [
    //    {
    //      text: "Agree",
    //    },
    //    {
    //      text: "Ask app not to track",
    //    },
    //  ],
    // )
  }, [])
  const handler = {
    AddNewCategory: () => {
      if (formValues.category === "" || formValues.range === "") {
        return Alert.alert("Category and range cannot be empty")
      }
      setCategories({
        ...categories,
        [formValues.category]: {
          data: [],
          range: parseInt(formValues.range),
        },
      })
      setFormValues({
        ...formValues,
        category: "",
        range: "",
      })
    },
    AddNewTemplate: () => {
      if (formValues.name === "") {
        return Alert.alert("Template name cannot be empty")
      }
      setGlobalState({
        ...state,
        user: {
          ...state.user,
          template: {
            ...state.user.template,
            [formValues.name]: {
              ...categories,
            },
          },
        },
      })
      setFormValues({
        ...formValues,
        name: "",
      })
      setCategories({})
      Alert.alert("Template added successfully!")
    },
  }
  return (
    <View testID="EMNewTemplateScreen" style={Style.Container}>
      <Screen
        style={{ paddingHorizontal: 20, backgroundColor: color.background, paddingBottom: 100 }}
        preset="scroll"
      >
        <View>
          <Text>Template name</Text>
          <TextInput
            value={formValues.name.toString()}
            onChangeText={(text) =>
              setFormValues({
                ...formValues,
                name: text,
              })
            }
            style={{
              backgroundColor: color.palette.offWhite,
              paddingLeft: 20,
              paddingVertical: 10,
              marginTop: 10,
              borderRadius: 10,
            }}
            placeholder="Enter template name"
          />
        </View>
        {Object.keys(categories).map((category) => (
          <View
            key="category"
            style={{ ...Style.Card, flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>{category}</Text>
            <Text>{formatByUnit(categories[category].range, "VND")}</Text>
          </View>
        ))}
        <View style={{ ...Style.Card, marginTop: 10 }}>
          <View>
            <Text>Category</Text>
            <TextInput
              value={formValues.category}
              onChangeText={(text) =>
                setFormValues({
                  ...formValues,
                  category: text,
                })
              }
              style={{
                backgroundColor: color.palette.offWhite,
                paddingLeft: 20,
                paddingVertical: 10,
                marginTop: 10,
                borderRadius: 10,
              }}
              placeholder="Enter category name"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>Range</Text>
            <TextInput
              value={formValues.range}
              onChangeText={(text) =>
                setFormValues({
                  ...formValues,
                  range: text.replace(/[^0-9]/g, "0"),
                })
              }
              style={{
                backgroundColor: color.palette.offWhite,
                paddingLeft: 20,
                paddingVertical: 10,
                marginTop: 10,
                borderRadius: 10,
              }}
              placeholder="Enter range"
            />
          </View>
          <Button
            style={{ backgroundColor: color.primary, marginTop: 20 }}
            onPress={handler.AddNewCategory}
          >
            <Text style={{ color: color.palette.white }}>Add category</Text>
          </Button>
        </View>
        <Button style={{ backgroundColor: color.primary }} onPress={handler.AddNewTemplate}>
          <Text style={{ color: color.palette.white }}>Add Template</Text>
        </Button>
      </Screen>
    </View>
  )
})
