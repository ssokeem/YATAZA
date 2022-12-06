import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
import intro from "./intro.png";

export default function Main({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: "37%" }}>
        <Image source={intro} />
      </View>
      <View style={styles.intro}>
        <Text style={styles.titleText}>YATAZA</Text>
      </View>
      <View style={styles.intro2}>
        <Text style={styles.subtitleText}>
          따릉이 코스 추천 서비스 YATAZA는
        </Text>
        <Text style={styles.subtitleText}>누구나 고민 없이 떠날 수 있도록</Text>
        <Text style={styles.subtitleText}>여가의 패러다임을 전환합니다.</Text>
      </View>
      <View style={{ flex: 0.5, flexDirection: "row" }}>
        <Pressable
          onPress={() => navigation.navigate("Position")}
          style={styles.nextBtn}
        >
          <Text style={styles.nextText}>시작하기</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  intro: {
    alignItems: "center",
    justifyContent: "center",
  },
  intro2: {
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
    color: "#263238",
    fontWeight: "700",
  },
  subtitleText: {
    fontSize: 15,
    color: "#767676",
  },
  nextBtn: {
    width: "80%",
    height: "23%",
    backgroundColor: "#0DA54B",
    borderColor: "#0D9745",
    borderRadius: "12px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40%",
  },
  nextText: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
});
