/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Dimensions, Image, View } from "react-native"
import { observer } from "mobx-react-lite"
import Style from "./TimoDashboard.style"
import { color } from "../../theme"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { MOCK_USER } from "../../constants/MOCK"
import { useStores } from "../../models"

export const TimoDashboardScreen = observer(function TimoDashboardScreen() {
  const { width } = Dimensions.get("screen")
  const { transactionStore } = useStores()
  const navigator = useNavigation()
  const RenderBanner = () => (
    <FlatList
      data={[
        {
          id: 2,
          url:
            "https://timo.vn/wp-content/uploads/2021/01/Website-share-link-preview_photo_VN-1200x675.jpg",
        },
        {
          id: 3,
          url:
            "https://media.vneconomy.vn/w800/images/upload/2021/04/20/1-16128669532411801893324-67-0-424-636-crop-1612866958710789248733.jpg",
        },
      ]}
      horizontal
      renderItem={({ item }) => (
        <View
          key={item.id}
          style={{
            width: width,
            height: 175,
            padding: 10,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              height: "100%",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.url }} />
          </View>
        </View>
      )}
    />
  )
  const RenderBody = () => (
    <View style={{ flex: 50, padding: 5, paddingHorizontal: 20 }}>
      <View style={Style.Card}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: color.text, fontSize: 16, fontWeight: "bold" }}>
              Spend Account
            </Text>
            <Text style={{ color: color.palette.offGray, fontSize: 13, marginTop: 1 }}>
              {MOCK_USER.spend_account.code}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: color.primary, fontSize: 18 }}>
              {transactionStore.transactionBalance}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handler.OpenPersonalFinance}>
        <View style={Style.Card}>
          <Text style={{ color: color.text, fontSize: 16, fontWeight: "bold" }}>
            Personal Finance
          </Text>
        </View>
      </TouchableOpacity>
      <View style={Style.Card}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: color.text, fontSize: 16, fontWeight: "bold" }}>
              Term Deposit
            </Text>
            <Text style={{ color: color.palette.offGray, fontSize: 13, marginTop: 1 }}>
              {MOCK_USER.spend_account.code}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: color.primary, fontSize: 18 }}>0</Text>
          </View>
        </View>
      </View>
    </View>
  )

  const handler = {
    OpenPersonalFinance: () => {
      navigator.navigate("PFDashboard" as any)
    },
  }
  return (
    <View testID="TimoDashboardScreen" style={Style.Container}>
      <RenderBanner />
      <RenderBody />
    </View>
  )
})
