import React from "react";
import { View, Text } from "react-native";

export default function Index() {
  // Daftar nama dari total 10 orang
  const allNames = [
    { name: "Yusran", font: "lato" },              // Static
    { name: "Haikal", font: "opensans" },          // Static
    { name: "Nurmisba", font: "bebasneue" },       // Static
    { name: "Alviansyah Burhani", font: "poppins" }, // Static
    { name: "Majeri", font: "playfair" },          // Static
    { name: "Hamdani", font: "winkyrough" },       // Variable
    { name: "Muliana", font: "roboto" },           // Variable
    { name: "Indira", font: "montserrat" },        // Variable
    { name: "Ilham", font: "merriweather" },       // Variable
    { name: "Agung", font: "josefinsans" },        // Variable
  ];

  // Misalnya posisi stambuk kamu adalah ke-3 (index ke-2)
  const stambukIndex = 2;

  // Fungsi mengambil 5 nama sebelum dan 5 nama setelah posisi stambuk (termasuk stambuk)
  function getNamesAround(data, centerIndex) {
    const result = [];
    const total = data.length;

    for (let i = -5; i < 5; i++) {
      let idx = (centerIndex + i + total) % total;
      result.push(data[idx]);
    }

    return result;
  }

  const namesToDisplay = getNamesAround(allNames, stambukIndex);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {namesToDisplay.map((item, index) => (
        <Text
          key={index}
          style={{
            fontFamily: item.font,
            fontSize: 20,
            marginVertical: 5,
            color: "#333",
          }}
        >
          {item.name}
        </Text>
      ))}
    </View>
  );
}
