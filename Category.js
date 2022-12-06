import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState, useMemo, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function CategoryScreen({ navigation, route }) {
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const stationNum = route.params.stationNum;

  const [isCategorySelect, setIsCategorySelect] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const categoryArr = ["카페", "맛집", "공원", "지하철", "관광지", "문화시설"];

  const [cafe, setCafe] = useState(+false);
  const [food, setFood] = useState(+false);
  const [park, setPark] = useState(+false);
  const [subway, setSubway] = useState(+false);
  const [attraction, setAttraction] = useState(+false);
  const [culture, setCulture] = useState(+false);

  useEffect(() => {
    setCafe(+isCategorySelect[0]);
    setFood(+isCategorySelect[1]);
    setPark(+isCategorySelect[2]);
    setSubway(+isCategorySelect[3]);
    setAttraction(+isCategorySelect[4]);
    setCulture(+isCategorySelect[5]);
  }, [isCategorySelect]);

  const handleClick = (idx) => {
    const newArr = [...isCategorySelect];
    newArr[idx] = !newArr[idx];
    setIsCategorySelect(newArr);
  };

  const [rain_result, setRain] = useState(0);
  const [snow_result, setSnow] = useState(0);
  const [hum_result, setHumidity] = useState(0);
  const [temp_result, setTemperature] = useState(0);
  const [prec_result, setPrec] = useState(0);

  const ask = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setOk(false);
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });

      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
      );
      const json = await response.json();
      const temp = parseFloat(json.current.temp).toFixed(0);
      const hum = json.current.humidity;
      const rain = json.daily.rain;
      const snow = json.daily.snow;

      if (rain === undefined || rain === "undefined") {
        setRain(0);
      } else {
        setRain(rain);
      }

      if (snow === undefined || snow === "undefined") {
        setSnow(0);
      } else {
        setSnow(snow);
      }

      const prec = rain_result + snow_result;
      setPrec(prec);

      setHumidity(hum);
      setTemperature(temp);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    ask();
  }, []);

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
          onPress={() => navigation.navigate("Emotion")}
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
        <Text style={styles.titleText}>선호하는 목적지</Text>
        <Text style={styles.titleText}>카테고리를 선택해주세요.</Text>
      </View>
      <View style={styles.categoryDiv}>
        {categoryArr.map((array, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleClick(index);
              }}
              activeOpacity={0.7}
              style={
                isCategorySelect[index]
                  ? styles.categoryBtn2
                  : styles.categoryBtn
              }
            >
              <Text
                style={{
                  fontSize: 17,
                }}
              >
                {array}
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
            navigation.navigate("Recommendation", {
              latitude: latitude,
              longitude: longitude,
              stationNum: stationNum,
              cafe: cafe,
              food: food,
              park: park,
              subway: subway,
              attraction: attraction,
              culture: culture,
              humidity: hum_result,
              temperature: temp_result,
              precipitation: prec_result,
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
  categoryDiv: {
    flex: 4.2,
    backgroundColor: "#E8FBE8",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryBtn: {
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
  categoryBtn2: {
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
