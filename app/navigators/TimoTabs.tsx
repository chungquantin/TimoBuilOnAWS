/* eslint-disable react/display-name */
import React from "react"
import { observer } from "mobx-react-lite"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  TimoTransactionListScreen,
  TimoDashboardScreen,
  TransactionCreationScreen,
} from "../screens"
import Style from "./Tabs.style"
import { color } from "../theme"
import { View } from "react-native"
import { Text } from "../components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { GlobalContext } from "../constants/CONTEXT"

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ children, onPress }) => (
  <TouchableOpacity style={Style.TabBarCustomButton} onPress={onPress}>
    <LinearGradient
      colors={[color.palette.timoPurple, color.palette.timoPurple]}
      style={Style.TabBarCustomButtonInner}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
)

interface Props {
  iconStyle?: {
    inactiveColor: string
    activeColor: string
    size: number
  }
}

export const TimoTabs = observer(function Tabs() {
  const { state } = React.useContext(GlobalContext)
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
      headerShown: true,
      key: "home-tab",
      name: state.user?.name,
      component: TimoDashboardScreen,
      layout: ({ focused }) => (
        <View style={Style.TabItemsView}>
          <Ionicons
            name="md-home"
            color={focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor}
            size={props.iconStyle.size}
          />
          <Text
            style={{
              color: focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor,
              ...Style.TabItemsLabel,
            }}
          >
            Trang chủ
          </Text>
        </View>
      ),
    },
    // Center Button
    {
      headerShown: true,
      key: "transfer-code",
      name: "Tạo giao dịch mới",
      component: TransactionCreationScreen,
      layout: () => <Ionicons name="add" color={color.palette.offWhite} size={25} />,
      buttonLayout: (props) => <TabBarCustomButton {...props} />,
    },
    {
      headerShown: true,
      key: "history-tab",
      name: "Lịch sử giao dịch",
      component: TimoTransactionListScreen,
      layout: ({ focused }) => (
        <View style={Style.TabItemsView}>
          <Ionicons
            name="md-list"
            color={focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor}
            size={props.iconStyle.size}
          />
          <Text
            style={{
              color: focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor,
              ...Style.TabItemsLabel,
            }}
          >
            Lịch sử giao dịch
          </Text>
        </View>
      ),
    },
  ]
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
