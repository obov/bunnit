import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Calendar from "../screens/Calendar";
import Library from "../screens/Library";
import MyPage from "../screens/MyPage";
import { CALENDAR, HOME, LIBRARY, MY_PAGE, TAB_TINT_COLOR } from "../libs";
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName={HOME}
    screenOptions={{
      tabBarActiveTintColor: TAB_TINT_COLOR,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name={HOME}
      component={Home}
      options={{
        tabBarIcon: ({ focused, color }) => {
          return focused ? (
            <Ionicons name="home" size={24} color={color} />
          ) : (
            <Ionicons name="home-outline" size={24} color={color} />
          );
        },
      }}
    />
    <Tab.Screen
      name={CALENDAR}
      component={Calendar}
      options={{
        tabBarIcon: ({ focused, color }) => {
          return focused ? (
            <Ionicons name="calendar" size={24} color={color} />
          ) : (
            <Ionicons name="calendar-outline" size={24} color={color} />
          );
        },
      }}
    />
    <Tab.Screen
      name={LIBRARY}
      component={Library}
      options={{
        tabBarIcon: ({ focused, color }) => {
          return focused ? (
            <Ionicons name="happy" size={24} color={color} />
          ) : (
            <Ionicons name="happy-outline" size={24} color={color} />
          );
        },
      }}
    />
    <Tab.Screen
      name={MY_PAGE}
      component={MyPage}
      options={{
        tabBarIcon: ({ focused, color }) => {
          return focused ? (
            <Ionicons name="person" size={24} color={color} />
          ) : (
            <Ionicons name="person-outline" size={24} color={color} />
          );
        },
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
