/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useContext } from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef } from "./navigation-utilities"
import { TimoTabs } from "./TimoTabs"
import Style from "./Tabs.style"
import { color } from "../theme"
import { PFTabs } from "./PFTabs"
import { PFAddNewGoalScreen } from "../screens/PFAddNewGoal/PFAddNewGoal.screen"
import { GlobalContext } from "../constants/CONTEXT"
import {
  AccountDashboardScreen,
  EMNewTemplateScreen,
  PFTemplateListScreen,
  TransactionCreationScreen,
} from "../screens"

export type NavigatorParamList = {
  AccountDashboard: undefined
  TimoDashboard: undefined
  PFDashboard: undefined
  TemplateList: undefined
  AddNewGoal: undefined
  TransactionCreation: undefined
  AddNewTemplate: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const screenOptions: any = {
  headerShown: true,
  headerStyle: {
    ...Style.Header,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: color.text,
  },
}

const AppStack = () => {
  const { state } = useContext(GlobalContext)
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}
      initialRouteName="TimoDashboard"
    >
      {state.user.id !== "" ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="TimoDashboard"
            component={TimoTabs}
          />
          <Stack.Screen
            options={{ headerTitle: "Tài chính cá nhân" }}
            name="PFDashboard"
            component={PFTabs}
          />
          <Stack.Screen
            options={{ headerTitle: "Thêm mục tiêu mới" }}
            name="AddNewGoal"
            component={PFAddNewGoalScreen}
          />
          <Stack.Screen
            options={{ headerTitle: "Thêm giao dịch mới" }}
            name="TransactionCreation"
            component={TransactionCreationScreen}
          />
          <Stack.Screen
            options={{ headerShown: true, headerTitle: "Thêm mẫu mới" }}
            name="AddNewTemplate"
            component={EMNewTemplateScreen}
          />
          <Stack.Screen
            options={{ headerShown: true, headerTitle: "Mẫu" }}
            name="TemplateList"
            component={PFTemplateListScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: true, headerTitle: "Tài khoản" }}
            name="AccountDashboard"
            component={AccountDashboardScreen}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["TimoDashboard"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
