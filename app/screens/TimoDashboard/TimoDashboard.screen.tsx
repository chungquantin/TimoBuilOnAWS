/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from "react"
import { Dimensions, Image, View } from "react-native"
import { observer } from "mobx-react-lite"
import Style from "./TimoDashboard.style"
import { color } from "../../theme"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { Button, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { emptyUser, GlobalContext } from "../../constants/CONTEXT"

export const TimoDashboardScreen = observer(function TimoDashboardScreen() {
  const { width } = Dimensions.get("screen")
  const { transactionStore } = useStores()
  const { state, setGlobalState } = useContext(GlobalContext)
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
              {state.user.spend_account.code}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: color.primary, fontSize: 18 }}>
              {transactionStore.getTransactionBalance(state.user.transactions)}
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
              {state.user.spend_account.code}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: color.primary, fontSize: 18 }}>0</Text>
          </View>
        </View>
      </View>
      <Button style={{ backgroundColor: color.palette.timoRed }} onPress={handler.Logout}>
        <Text style={{ color: color.palette.white }}>Đăng xuất</Text>
      </Button>
    </View>
  )

  const handler = {
    OpenPersonalFinance: () => {
      navigator.navigate("PFDashboard" as any)
    },
    Logout: () => {
      setGlobalState({
        user: emptyUser,
      })
    },
  }
  return (
    <View testID="TimoDashboardScreen" style={Style.Container}>
      <RenderBanner />
      <RenderBody />
    </View>
  )
})
