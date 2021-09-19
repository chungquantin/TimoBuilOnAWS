/* eslint-disable react/display-name */
import React from "react"
import { observer } from "mobx-react-lite"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Style from "./Tabs.style"
import { color } from "../theme"
import { View } from "react-native"
import { Text } from "../components"
import { Ionicons } from "@expo/vector-icons"
import { PFDashboardScreen, PFGameScreen } from "../screens"
import { PFTemplateScreen } from "../screens/PFTemplateScreen/PFTemplate.screen"

const Tab = createBottomTabNavigator()

interface Props {
  iconStyle?: {
    inactiveColor: string
    activeColor: string
    size: number
  }
}

const TabItems = (
  props?: Props,
): Partial<{
  key: string
  name: string
  component: any
  layout: React.FunctionComponent<any>
  buttonLayout: any
  headerShown: boolean
}>[] => [
  {
    headerShown: false,
    key: "home-tab",
    name: "Piggy Bank",
    component: PFDashboardScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <Ionicons
          name="cash"
          color={focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor}
          size={props.iconStyle.size}
        />
        <Text
          style={{
            color: focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor,
            ...Style.TabItemsLabel,
          }}
        >
          Piggy Bank
        </Text>
      </View>
    ),
  },
  {
    headerShown: false,
    key: "template-tab",
    name: "Mẫu quản lý tài chính",
    component: PFTemplateScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <Ionicons
          name="stats-chart"
          color={focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor}
          size={props.iconStyle.size}
        />
        <Text
          style={{
            color: focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor,
            ...Style.TabItemsLabel,
          }}
        >
          Mẫu
        </Text>
      </View>
    ),
  },
  {
    headerShown: false,
    key: "game-tab",
    name: "Trò chơi",
    component: PFGameScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <Ionicons
          name="game-controller"
          color={focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor}
          size={props.iconStyle.size}
        />
        <Text
          style={{
            color: focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor,
            ...Style.TabItemsLabel,
          }}
        >
          Trò chơi
        </Text>
      </View>
    ),
  },
]

export const PFTabs = observer(function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          ...Style.Header,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: color.text,
        },
        tabBarStyle: {
          ...Style.Container,
        },
        tabBarShowLabel: false,
      }}
    >
      {TabItems({
        iconStyle: {
          inactiveColor: color.palette.lightGray,
          activeColor: color.primary,
          size: 20,
        },
      }).map((tab) => (
        <Tab.Screen
          key={tab.key}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: tab.headerShown,
            tabBarIcon: tab.layout,
            tabBarButton: tab.buttonLayout,
          }}
        />
      ))}
    </Tab.Navigator>
  )
})
