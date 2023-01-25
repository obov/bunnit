import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import CalendarComponent from "../components/Calendar";
const Calendar = () => (
  <View style={styles.layout}>
    <CalendarComponent />
  </View>
);
export default Calendar;
const styles = StyleSheet.create({
  layout: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 90,
  },
});
