import React from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DevCard from "../components/DevCard";

const profiles = [
  {
    name: "Gabi Macedo",
    username: "gabimaced0",
    image: require("../assets/gabimacedo-pic.png"),
    linkedin: "https://www.linkedin.com/in/gabrielly-macedo-b6138027b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/gabimaced0",
  },
  {
    name: "Fernando Aguiar",
    username: "fernando1211",
    image: require("../assets/fernandoaguiar-pic.jpg"),
    linkedin: "https://www.linkedin.com/in/fernando-henrique-vilela-aguiar-322aa2301/",
    github: "https://github.com/fernando1211",
  },
  
];
export default function Devs() {    
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={{ marginVertical: 64, alignSelf: "center" }}
        />

        <View>
          {profiles.map((profile, index) => (
            <DevCard key={index} {...profile} />
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black"
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  
});