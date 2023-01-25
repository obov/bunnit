import React from "react";
import { View, Text } from "react-native";

const MyPage = () => (
  <Screen>
    <Text>My Page</Text>
  </Screen>
);
export default MyPage;
const Screen = styled.View`
  flex: 1;
  justify-content: "center";
  align-items: "center";
`;
