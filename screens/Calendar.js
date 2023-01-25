import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Calendar = () => (
  <Screen>
    <Text>Calendar</Text>
  </Screen>
);
export default Calendar;

const Screen = styled.View`
  flex: 1;
  justify-content: "center";
  align-items: "center";
`;
