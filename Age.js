import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState, useMemo } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Age({ navigation, route }) {
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const stationNum = route.params.stationNum;

  const [isAgeSelect, setIsAgeSelect] = useState(false);
  const ageArr = [
    { id: "0", age: "10대" },
    { id: "1", age: "20대" },
    { id: "2", age: "30대" },
    { id: "3", age: "40대" },
    { id: "4", age: "50대" },
    { id: "5", age: "60대" },
  ];

  const handleClick = (idx) => {
    const newArr = Array(ageArr.length).fill(false);
    newArr[idx] = true;
    setIsAgeSelect(newArr);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.4, backgroundColor: "#E8FBE8" }}></View>
      <View
        style={{
          flex: 0.4,
          backgroundColor: "#E8FBE8",
          justifyContent: "center",
        }}
      >
        <AntDesign
          onPress={() => navigation.navigate("Gender")}
          name="arrowleft"
          size={24}
          color="#263238"
          style={{ paddingLeft: "6%" }}
        />
      </View>
      <View
        style={{
          flex: 0.8,
          backgroundColor: "#E8FBE8",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>연령대를 선택해주세요.</Text>
      </View>
      <View style={styles.ageDiv}>
        {ageArr.map((array, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleClick(index);
              }}
              activeOpacity={0.7}
              style={isAgeSelect[index] ? styles.ageBtn2 : styles.ageBtn}
            >
              <Text
                style={{
                  fontSize: 17,
                }}
              >
                {array.age}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          flex: 1.5,
          backgroundColor: "#E8FBE8",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingHorizontal: "4%",
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("Emotion", {
              latitude: latitude,
              longitude: longitude,
              stationNum: stationNum,
            })
          }
          style={styles.nextBtn}
        >
          <Text style={styles.nextText}>다음</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    color: "#263238",
    fontWeight: "700",
  },
  ageDiv: {
    flex: 4.2,
    backgroundColor: "#E8FBE8",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ageBtn: {
    width: "80%",
    height: "13%",
    marginTop: "3.5%",
    backgroundColor: "white",
    borderColor: "#4BC68D",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: "35px",
    justifyContent: "center",
    alignItems: "center",
  },
  ageBtn2: {
    width: "80%",
    height: "13%",
    marginTop: "3.5%",
    backgroundColor: "#4BC68D",
    borderColor: "#0DA54B",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: "35px",
    justifyContent: "center",
    alignItems: "center",
  },
  nextBtn: {
    width: "27%",
    height: "23%",
    backgroundColor: "#0DA54B",
    borderColor: "#0D9745",
    borderRadius: "12px",
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
});
