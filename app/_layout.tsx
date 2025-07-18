import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // 5 font statis
    lato: require("../assets/fonts/Lato-Regular.ttf"),
    opensans: require("../assets/fonts/OpenSans-Bold.ttf"),
    bebasneue: require("../assets/fonts/BebasNeue-Regular.ttf"),
    poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    playfair: require("../assets/fonts/PlayfairDisplay-Regular.ttf"),

    // 5 variable font
    winkyrough: require("../assets/fonts/WinkyRough-VariableFont_wght.ttf"),
    roboto: require("../assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
    montserrat: require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
    merriweather: require("../assets/fonts/Merriweather-VariableFont_opsz,wdth,wght.ttf"),
    josefinsans: require("../assets/fonts/JosefinSans-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  return <Stack />;
}
