import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Linking from "expo-linking";
import { FontAwesome5 } from "@expo/vector-icons";

export default function RecommendationScreen({ navigation, route }) {
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const stationNum = route.params.stationNum;

  const cafe = route.params.cafe;
  const food = route.params.food;
  const park = route.params.park;
  const subway = route.params.subway;
  const attraction = route.params.attraction;
  const culture = route.params.culture;
  const humidity = route.params.humidity;
  const temperature = route.params.temperature;
  const precipitation = route.params.precipitation;

  const [resultJson, setResultJson] = useState();
  const [resultArr, setResultArr] = useState([]);

  const link = () => {
    Linking.openURL("https://map.kakao.com");
  };

  const getResult = async () => {
    try {
      console.log(
        `http://127.0.0.1:8000/api/recommendation/?cafe=${cafe}&food=${food}&park=${park}&subway=${subway}&attraction=${attraction}&culture=${culture}&humidity=${humidity}&precipitation=${precipitation}&temperature=${temperature}&start_num=${stationNum}`
      );
      const response = await fetch(
        `http://127.0.0.1:8000/api/recommendation/?cafe=${cafe}&food=${food}&park=${park}&subway=${subway}&attraction=${attraction}&culture=${culture}&humidity=${humidity}&precipitation=${precipitation}&temperature=${temperature}&start_num=${stationNum}`
      );
      const json = await response.json();
      setResultJson(json);
      setResultArr(Object.keys(json));
    } catch (e) {}
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.8, backgroundColor: "white" }}></View>
      <View
        style={{
          flex: 0.8,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, color: "#4BC68D", fontWeight: "700" }}>
          추천 목적지입니다!
        </Text>
      </View>
      <View
        style={{
          flex: 4.2,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        {resultArr.length === 0 ? (
          <ActivityIndicator
            color="black"
            style={{ marginTop: "60%" }}
            size="large"
          />
        ) : (
          resultArr.map((array, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={styles.resultList}
              >
                <TouchableOpacity
                  style={{
                    width: "75%",
                    // height: "30%",
                    // backgroundColor: "#FBF453",
                    // borderRadius: "100px",
                    // marginTop: "3%",
                    justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 17, color: "white", fontWeight: "800" }}
                  >
                    {array}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => link()}
                  style={{
                    width: "25%",
                    // height: "30%",
                    // backgroundColor: "#FBF453",
                    // borderRadius: "100px",
                    // marginTop: "3%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5
                    name="map-marked-alt"
                    size={26}
                    color="#FBF453"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })
        )}
      </View>
      <View
        style={{
          flex: 1.5,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingHorizontal: "4%",
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("Main")}
          style={{
            width: "27%",
            height: "23%",
            backgroundColor: "#8C8C8C",
            borderRadius: "12px",
            borderColor: "#767676",
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
            처음으로
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultList: {
    justifyContent: "center",
    paddingLeft: 24,
    width: "92%",
    height: "17.5%",
    marginTop: "3%",
    backgroundColor: "#4BC68D",
    borderRadius: "20px",
    flexDirection: "row",
  },

  recommendationList: {
    fontSize: 12,
    color: "#037603",
    fontWeight: "600",
    marginTop: 10,
  },
});
