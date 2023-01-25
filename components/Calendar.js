import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
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
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay,
} from "react-native-reanimated";

const CalendarBody = ({ dateSelected, setDateSelected, dateViewed }) => {
  const handlePressDate = (date) => () => {
    setDateSelected(date);
  };
  const fistDate = getPrevSun(getFirstDate(dateViewed));
  const lastDate = getNextSatur(getLastDate(dateViewed));
  return (
    <FlatList
      keyExtractor={(item) => item.getTime()}
      scrollEnabled={false}
      data={getDaysRange(fistDate, lastDate)}
      style={styles.body}
      ItemSeparatorComponent={() => <View style={{ height: 10, width: 10 }} />}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.date} onPress={handlePressDate(item)}>
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
  );
};
const CalendarComponent = () => {
  const [dateViewed, setDateViewed] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(null);
  const dateViewedChangeMonth = changeMonth(dateViewed);
  const changeMonthOnJS = (val) => {
    setDateViewed((cur) => changeMonth(cur)(val));
  };
  const INIT_HEIGHT = 300;
  const END_POSITION_Y = INIT_HEIGHT - 50;
  const END_POSITION_X = Dimensions.get("window").width;
  const isWeeklyView = useSharedValue(false);
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (isWeeklyView.value) {
        positionY.value =
          END_POSITION_Y - e.translationY > INIT_HEIGHT
            ? INIT_HEIGHT
            : END_POSITION_Y - e.translationY;
      } else {
        positionY.value = -e.translationY;
      }

      positionX.value = e.translationX;
    })
    .onTouchesUp((e) => {
      if (positionY.value > END_POSITION_Y / 2) {
        positionY.value = withTiming(END_POSITION_Y, { duration: 100 });
        isWeeklyView.value = true;
      } else {
        positionY.value = withTiming(0, { duration: 100 });
        isWeeklyView.value = false;
      }
      if (Math.abs(positionX.value) > END_POSITION_X / 2) {
        positionX.value = withTiming(
          Math.sign(positionX.value) * END_POSITION_X,
          { duration: 500 },
          () => {
            runOnJS(changeMonthOnJS)(Math.sign(positionX.value) * -1);
          }
        );
      } else {
        positionX.value = withTiming(0, { duration: 500 });
      }
    });
  const animatedStyle = useAnimatedStyle(() => ({
    height: INIT_HEIGHT - positionY.value,
    transform: [{ translateX: positionX.value }],
  }));

  const handlePressLeft = () => {
    setDateViewed((cur) => changeMonth(cur)(-1));
  };
  const handlePressRight = () => {
    setDateViewed((cur) => changeMonth(cur)(+1));
  };
  useEffect(() => {
    positionX.value = 0;
  }, [dateViewed]);
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
      <GestureDetector gesture={panGesture}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={[
              {
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                width: Dimensions.get("window").width * 3,
              },
              animatedStyle,
            ]}
          >
            <View
              style={{
                width: Dimensions.get("window").width,
                height: 300,
                backgroundColor: "#555555",
              }}
            >
              <CalendarBody
                dateSelected={dateSelected}
                setDateSelected={setDateSelected}
                dateViewed={dateViewedChangeMonth(-1)}
              />
            </View>
            <View
              style={{
                width: Dimensions.get("window").width,
                height: 300,
                backgroundColor: "#777777",
              }}
            >
              <CalendarBody
                dateSelected={dateSelected}
                setDateSelected={setDateSelected}
                dateViewed={dateViewed}
              />
            </View>
            <View
              style={{
                width: Dimensions.get("window").width,
                height: 300,
                backgroundColor: "#111111",
              }}
            >
              <CalendarBody
                dateSelected={dateSelected}
                setDateSelected={setDateSelected}
                dateViewed={dateViewedChangeMonth(1)}
              />
            </View>
          </Animated.View>
        </View>
      </GestureDetector>
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
    paddingTop: 5,
    backgroundColor: "#eeeeee",
  },
  arrow: {
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
