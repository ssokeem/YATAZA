import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";

export default function Position({ navigation }) {
  const API_KEY = "7e1f3ae809fd623334fa8d4323e8edfc";

  const [isLocationSelect, setIsLocationSelect] = useState(false);
  const [locationArr, setLocationArr] = useState([]);
  const [locationJson, setLocationJson] = useState();
  const [stationNum, setStationNum] = useState();

  const [ok, setOk] = useState(true);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const [complete, setComplete] = useState(0);

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    // console.log(latitude);
    // console.log(longitude);

    setLat(latitude);
    setLong(longitude);
  };

  const getJson = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/location/?latitude=${lat}&longitude=${long}`
    );
    const result = await response.json();
    setLocationJson(result);
    setLocationArr(Object.keys(result));
  };

  useEffect(() => {
    ask();
  }, []);

  useEffect(() => {
    setComplete(1);
    // console.log(complete);
  }, [long]);

  useEffect(() => {
    {
      complete === 1 ? getJson() : null;
    }
  }, [long]);

  const handleClick = async (idx) => {
    const newArr = Array(locationArr.length).fill(false);
    newArr[idx] = true;
    setIsLocationSelect(newArr);
    let trueIndex = newArr.indexOf(true);
    let choice = Object.keys(locationJson)[trueIndex];
    await setStationNum(locationJson[choice].station_num);
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
          onPress={() => navigation.navigate("Main")}
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
        <Text style={styles.titleText}>근처 대여소를 선택해주세요.</Text>
      </View>
      <View style={styles.locationDiv}>
        {locationArr.length === 0 ? (
          <ActivityIndicator
            color="black"
            style={{ marginTop: 10 }}
            size="large"
          />
        ) : (
          locationArr.map((array, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleClick(index);
                }}
                activeOpacity={0.7}
                style={
                  isLocationSelect[index]
                    ? styles.locationBtn2
                    : styles.locationBtn
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
          })
        )}
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
          onPress={() => {
            {
              isLocationSelect === false
                ? Alert.alert("대여소를 선택하세요.")
                : navigation.navigate("Gender", {
                    latitude: lat,
                    longitude: long,
                    stationNum: stationNum,
                  });
            }
          }}
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
  locationDiv: {
    flex: 4.2,
    backgroundColor: "#E8FBE8",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  locationBtn: {
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
  locationBtn2: {
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
