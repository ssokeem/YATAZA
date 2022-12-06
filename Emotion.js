import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function EmotionScreen({ navigation, route }) {
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const stationNum = route.params.stationNum;

  const [isEmotionSelect, setIsEmotionSelect] = useState(false);
  const emotionsArr = [
    { face: "😙", word: "즐거워요" },
    { face: "😊", word: "행복해요" },
    { face: "😍", word: "설레요" },
    { face: "😭", word: "슬퍼요" },
    { face: "😡", word: "화나요" },
    { face: "😆", word: "기뻐요" },
    { face: "😨", word: "무서워요" },
    { face: "🥱", word: "졸려요" },
    { face: "😞", word: "우울해요" },
    { face: "😮‍💨", word: "무기력해요" },
    { face: "😉", word: "기대돼요" },
    { face: "🤯", word: "힘들어요" },
  ];

  const handleClick = (idx) => {
    const newArr = Array(emotionsArr.length).fill(false);
    newArr[idx] = true;
    setIsEmotionSelect(newArr);
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
          onPress={() => navigation.navigate("Age")}
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
        <Text style={styles.titleText}>현재 기분이 어떠신가요?</Text>
      </View>
      <View style={{ flex: 4.2, backgroundColor: "#E8FBE8" }}>
        <View style={styles.innerDiv}>
          {emotionsArr.slice(0, 3).map((array, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleClick(index);
                }}
                activeOpacity={0.7}
                style={
                  isEmotionSelect[index]
                    ? styles.emotionBtn2
                    : styles.emotionBtn
                }
              >
                <Text style={{ fontSize: 50, marginBottom: 3 }}>
                  {array.face}
                </Text>
                <Text style={{ fontSize: 13 }}>{array.word}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.innerDiv}>
          {emotionsArr.slice(3, 6).map((array, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleClick(index + 3);
                }}
                activeOpacity={0.7}
                style={
                  isEmotionSelect[index + 3]
                    ? styles.emotionBtn2
                    : styles.emotionBtn
                }
              >
                <Text style={{ fontSize: 50, marginBottom: 3 }}>
                  {array.face}
                </Text>
                <Text style={{ fontSize: 13 }}>{array.word}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.innerDiv}>
          {emotionsArr.slice(6, 9).map((array, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleClick(index + 6);
                }}
                activeOpacity={0.7}
                style={
                  isEmotionSelect[index + 6]
                    ? styles.emotionBtn2
                    : styles.emotionBtn
                }
              >
                <Text style={{ fontSize: 50, marginBottom: 3 }}>
                  {array.face}
                </Text>
                <Text style={{ fontSize: 13 }}>{array.word}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.innerDiv}>
          {emotionsArr.slice(9, 12).map((array, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleClick(index + 9);
                }}
                activeOpacity={0.7}
                style={
                  isEmotionSelect[index + 9]
                    ? styles.emotionBtn2
                    : styles.emotionBtn
                }
              >
                <Text style={{ fontSize: 50, marginBottom: 3 }}>
                  {array.face}
                </Text>
                <Text style={{ fontSize: 13 }}>{array.word}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
            navigation.navigate("Category", {
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
  innerDiv: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "4%",
    marginHorizontal: "5%",
  },
  emotionBtn: {
    width: "30%",
    backgroundColor: "white",
    borderColor: "#4BC68D",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: "16px",
    justifyContent: "center",
    alignItems: "center",
  },
  emotionBtn2: {
    width: "30%",
    backgroundColor: "#4BC68D",
    borderColor: "#0DA54B",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: "16px",
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
