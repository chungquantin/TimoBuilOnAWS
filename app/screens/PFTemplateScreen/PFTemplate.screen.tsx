/* eslint-disable spaced-comment */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./PFTemplate.style"
import { color } from "../../theme"
import { formatByUnit } from "../../utils/currency"
import { MOCK_USER } from "../../constants/RICH_USER"
import { ProgressChartData } from "react-native-chart-kit/dist/ProgressChart"
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes"
import { ProgressChart } from "react-native-chart-kit"
import { GlobalContext } from "../../constants/CONTEXT"

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

export const PFTemplateScreen = observer(function PFTemplateScreen() {
  const { state } = React.useContext(GlobalContext)
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
  const TEMPLATE = state.user.template?.[Object.keys(state.user.template)[0]] || {}
  return (
    <View testID="PFTemplateScreen" style={Style.Container}>
      <Screen unsafe={true} preset="scroll">
        <View style={{ ...Style.Card, paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold" }}>Template</Text>
            <Text style={{ color: color.palette.offGray }}>
              {Object.keys(state.user.template)[0]}
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
            {Object.keys(state.user.template).length !== 0 ? (
              <></>
            ) : (
              <View style={{ alignItems: "center", width: "100%" }}>
                <Text>No template</Text>
                <Button style={{ width: "100%", marginTop: 20, backgroundColor: color.primary }}>
                  <Text style={{ color: color.palette.white }}>Add new template</Text>
                </Button>
              </View>
            )}
            {/*<ProgressChart
              withCustomBarColorFromData
              data={data}
              width={300}
              height={200}
              strokeWidth={10}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={true}
            /> */}
          </View>
          <View style={{ marginTop: 10 }}>
            {Object.keys(TEMPLATE).map((category, index) => (
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
                    {state.user.template && formatByUnit(TEMPLATE[category].range, "VND")}
                  </Text>
                  <Text style={{ marginTop: 5, fontSize: 12, color: color.palette.offGray }}>
                    {state.user.template &&
                      formatByUnit(
                        TEMPLATE[category].data
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
