import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Gender({ navigation, route }) {
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const stationNum = route.params.stationNum;

  const [isGenderSelect, setIsGenderSelect] = useState(false);
  const genderArr = [
    { id: "0", gender: "남자" },
    { id: "1", gender: "여자" },
  ];

  const handleClick = (idx) => {
    const newArr = Array(genderArr.length).fill(false);
    newArr[idx] = true;
    setIsGenderSelect(newArr);
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
          onPress={() => navigation.navigate("Position")}
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
        <Text style={styles.titleText}>성별을 선택해주세요.</Text>
      </View>
      <View style={styles.genderDiv}>
        {genderArr.map((array, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleClick(index);
              }}
              activeOpacity={0.7}
              style={
                isGenderSelect[index] ? styles.genderBtn2 : styles.genderBtn
              }
            >
              <Text
                style={{
                  fontSize: 17,
                }}
              >
                {array.gender}
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
            navigation.navigate("Age", {
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
  genderDiv: {
    flex: 4.2,
    backgroundColor: "#E8FBE8",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  genderBtn: {
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
  genderBtn2: {
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
