/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Image, View } from "react-native"
import { observer } from "mobx-react-lite"
import Style from "./PFDashboard.style"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { useStores } from "../../models"
import moment from "moment"
import { formatByUnit } from "../../utils/currency"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/core"
import { GlobalContext } from "../../constants/CONTEXT"
import { AutoImage } from "../../components/auto-image/auto-image"

const CharacterFindingStuff = require("../../../assets/character/charater-finding-stuff.png")

export const PFDashboardScreen = observer(function PFDashboardScreen() {
  const { transactionStore } = useStores()
  const { state } = React.useContext(GlobalContext)
  const navigator = useNavigation()

  const handler = {
    AddNewGoal: () => {
      navigator.navigate("AddNewGoal" as any)
    },
  }

  return (
    <View testID="PFDashboardScreen" style={{ ...Style.Container, paddingBottom: 100 }}>
      <Screen preset="scroll" backgroundColor={color.transparent} unsafe={true}>
        <View style={{ ...Style.Card, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 2 }}>
            <Image
              style={{ width: 120, height: 120 }}
              source={{
                uri: "https://timo.vn/wp-content/uploads/Webp.net-resizeimage-8.png",
              }}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ fontWeight: "bold", color: color.primary }}>Piggy Bank 🐷</Text>
            <Text>Số dư khả dụng</Text>
            <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 5, color: color.primary }}>
              {transactionStore.getTransactionBalance(state.user.transactions)}
            </Text>
          </View>
        </View>
        {state.user.piggyBank?.goals.length === 0 ? (
          <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <AutoImage
              source={CharacterFindingStuff}
              defaultSource={CharacterFindingStuff}
              resizeMode="cover"
              style={{ height: 150, width: 150, marginBottom: 10 }}
            />
            <Text>Bạn chưa có mục tiêu tiết kiệm </Text>
          </View>
        ) : (
          state.user.piggyBank?.goals.map((goal) => (
            <View key={goal.goal_id} style={{ ...Style.Card }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    color: color.palette.timoPurple,
                  }}
                >
                  Từ {moment.unix(goal.create_date).format("DD-MM-YY")}
                </Text>
                <Text
                  style={{
                    color: color.palette.timoPurple,
                  }}
                >
                  Đến {moment.unix(goal.end_date).format("DD-MM-YY")}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {goal.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text>Tiến trình: </Text>
                <Text
                  style={{
                    color: color.palette.timoPurple,
                    fontWeight: "bold",
                  }}
                >
                  {formatByUnit(goal.current_progress, "VND")} /
                </Text>
                <Text
                  style={{
                    color: color.palette.green,
                    fontWeight: "bold",
                  }}
                >
                  {" " + formatByUnit(goal.target, "VND")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <Text>Chi tiêu hàng tuần: </Text>
                <Text
                  style={{
                    color: color.palette.timoPurple,
                    fontWeight: "bold",
                  }}
                >
                  {formatByUnit(goal.weekly_amount, "VND")}
                </Text>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity onPress={handler.AddNewGoal}>
          <View
            style={{
              ...Style.Card,
              paddingVertical: 20,
              backgroundColor: color.primary,
              alignItems: "center",
            }}
          >
            <Text style={{ color: color.palette.white, fontWeight: "bold" }}>
              + Tạo mục tiêu mới
            </Text>
          </View>
        </TouchableOpacity>
      </Screen>
    </View>
  )
})
