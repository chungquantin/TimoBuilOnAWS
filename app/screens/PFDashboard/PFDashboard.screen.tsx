/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Image, View } from "react-native"
import { observer } from "mobx-react-lite"
import Style from "./PFDashboard.style"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { useStores } from "../../models"
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes"
import { ProgressChart } from "react-native-chart-kit"
import { ProgressChartData } from "react-native-chart-kit/dist/ProgressChart"
import { MOCK_USER } from "../../constants/MOCK"
import { formatByUnit } from "../../utils/currency"

const chartConfig: ChartConfig = {
  backgroundGradientFrom: color.background,
  backgroundGradientTo: color.background,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 255) => `rgba(91, 66, 154, ${opacity})`,
  labelColor: (opacity = 255) => `rgba(91, 66, 154, ${opacity})`,
  style: {
    alignItems: "center",
    borderRadius: 16,
  },
  propsForDots: {
    r: "2.8",
    strokeWidth: "5.5",
    stroke: color.primary,
  },
}

const colorList = [
  color.palette.timoBlue,
  color.palette.orange,
  color.palette.timoYellow,
  color.palette.timoPurple,
  color.palette.green,
  color.palette.timoRed,
]
export const PFDashboardScreen = observer(function PFDashboardScreen() {
  const { transactionStore } = useStores()
  const data: ProgressChartData = {
    labels: Object.keys(MOCK_USER.template.Sheet1), // optional
    data: Object.keys(MOCK_USER.template.Sheet1).map(
      (category) =>
        MOCK_USER.template.Sheet1[category].data
          .map((transaction) =>
            transaction.type === "IN" ? transaction.amount : transaction.amount,
          )
          .reduce((a, b) => a + b) / MOCK_USER.template.Sheet1[category].range,
    ),
    colors: colorList,
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
            <Text>Available Balance</Text>
            <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 5, color: color.primary }}>
              {transactionStore.transactionBalance}
            </Text>
          </View>
        </View>
        <View style={{ ...Style.Card, paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold" }}>Template</Text>
            <Text style={{ color: color.palette.offGray }}>
              {Object.keys(MOCK_USER.template)[0]}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
              paddingBottom: 20,
              borderBottomColor: color.palette.offWhite,
              borderBottomWidth: 1,
            }}
          >
            <ProgressChart
              withCustomBarColorFromData
              data={data}
              width={300}
              height={200}
              strokeWidth={10}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={true}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            {Object.keys(MOCK_USER.template.Sheet1).map((category, index) => (
              <View
                key={category}
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: colorList[index],
                      borderRadius: 50,
                      width: 20,
                      height: 10,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ fontWeight: "bold" }}>{category}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text style={{ color: color.palette.timoPurple, fontWeight: "bold" }}>
                    {formatByUnit(MOCK_USER.template.Sheet1[category].range, "VND")}
                  </Text>
                  <Text style={{ marginTop: 5, fontSize: 12, color: color.palette.offGray }}>
                    {formatByUnit(
                      MOCK_USER.template.Sheet1[category].data
                        .map((transaction) =>
                          transaction.type === "IN" ? transaction.amount : transaction.amount,
                        )
                        .reduce((a, b) => a + b),
                      "VND",
                    )}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Screen>
    </View>
  )
})
