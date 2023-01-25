import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Dimensions } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  changeMonth,
  getDaysRange,
  getFirstDate,
  getLastDate,
  getNextSatur,
  getPrevSun,
  isSameDate,
  isSameMonth,
} from "../utils";
import { saturday, sunday, workDays } from "../libs";
const CalendarComponent = () => {
  const [dateViewed, setDateViewed] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(null);
  const fistDate = getPrevSun(getFirstDate(dateViewed));
  const lastDate = getNextSatur(getLastDate(dateViewed));
  const handlePressLeft = () => {
    setDateViewed((cur) => changeMonth(cur)(-1));
  };
  const handlePressRight = () => {
    setDateViewed((cur) => changeMonth(cur)(+1));
  };
  const handlePressDate = (date) => () => {
    setDateSelected(date);
  };
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressLeft} style={styles.arrow}>
          <Ionicons name="chevron-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text>
          {dateViewed.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </Text>
        <TouchableOpacity onPress={handlePressRight} style={styles.arrow}>
          <Ionicons name="chevron-forward" size={24} color="#333333" />
        </TouchableOpacity>
      </View>
      <View style={styles.days}>
        <View style={styles.day}>
          <Text style={styles.sun}>{sunday[0]}</Text>
        </View>
        {workDays.map((day) => (
          <View key={day} style={styles.day}>
            <Text>{day}</Text>
          </View>
        ))}
        <View style={styles.day}>
          <Text style={styles.sat}>{saturday[0]}</Text>
        </View>
      </View>
      <View style={{ height: 400 }}>
        <FlatList
          keyExtractor={(item) => item.getTime()}
          data={getDaysRange(fistDate, lastDate)}
          style={styles.body}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10, width: 10 }} />
          )}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.date}
              onPress={handlePressDate(item)}
            >
              <View
                style={
                  dateSelected
                    ? isSameDate(item, dateSelected)
                      ? styles.selected
                      : styles.null
                    : styles.null
                }
              >
                <Text
                  style={
                    isSameMonth(item, dateViewed)
                      ? styles.dateInMonth
                      : styles.dateOutMonth
                  }
                >
                  {item.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={7}
        />
      </View>
    </>
  );
};

export default CalendarComponent;
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("window").width,
    height: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  days: {
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "row",
    height: 30,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  day: {
    flex: 0.13,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    flex: 0.13,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "#309bff",
  },
  null: {},
  sun: {
    color: "#eb4481",
  },
  sat: {
    color: "#446eeb",
  },
  dateInMonth: {
    color: "#333333",
  },
  dateOutMonth: {
    color: "#aaaaaa",
  },
  body: {
    width: Dimensions.get("window").width,
    height: 300,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  arrow: {
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
