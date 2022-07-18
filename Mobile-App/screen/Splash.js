import { Layout, Text, Button } from "@ui-kitten/components";
import { ImageBackground } from "react-native";

function Splash({ navigation }) {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Layout
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffcc00",
        }}
      >
        <ImageBackground
          source={require("../assets/images/splash.jpeg")}
          style={{ width: "120%", height: "120%", position: "absolute" }}
        />
      </Layout>
      <Layout
        style={{
          justifyContent: "center",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 40,
          paddingBottom: 32,
          width: "100%",
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#003399",
            textAlign: "center",
          }}
          category="h1"
        >
          Furni
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 6,
            paddingHorizontal: 32,
          }}
          category="p1"
        >
          Your sweet home deserves everything in comfort. As all our furniture.
        </Text>
        <Button
          style={{ marginTop: 40, paddingHorizontal: 80 }}
          onPress={() => navigation.navigate("Home")}
        >
          Discover
        </Button>
      </Layout>
    </Layout>
  );
}

export default Splash;
