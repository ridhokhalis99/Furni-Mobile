import { Layout, Text, Divider, Button, Spinner } from "@ui-kitten/components";
import { Image, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../config/queries";
import rupiahFormat from "../helpers/rupiahFormat";

function ProductDetail({ route }) {
  const { slug } = route.params;
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      slug,
    },
  });

  if (loading) {
    return (
      <Layout
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner size="giant" />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text category="h6">There's an error</Text>
      </Layout>
    );
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        paddingTop: "7.5%",
        paddingHorizontal: "5%",
      }}
    >
      <Image
        style={{
          width: "100%",
          aspectRatio: 1,
          resizeMode: "contain",
        }}
        source={{ uri: data.getProduct.mainImg }}
      />
      <Text category="h3">{data.getProduct.name}</Text>
      <Text style={{ marginTop: 5 }}>{data.getProduct.overview}</Text>
      <Divider style={{ marginVertical: 15 }} />
      <Text category="h5">Product Detail</Text>
      <Text
        category="p1"
        style={{ marginTop: 5, textAlign: "justify", lineHeight: 20 }}
      >
        {data.getProduct.description}
      </Text>
      <Text style={{ marginTop: 3 }}>
        Added By: {data.getProduct.User.username}
      </Text>
      <Text category="h2" style={{ fontWeight: "700", marginTop: 5 }}>
        {rupiahFormat(data.getProduct.price)}
      </Text>
      <Button size="large" style={{ marginTop: 20, marginBottom: 100 }}>
        Add to Cart
      </Button>
    </ScrollView>
  );
}

export default ProductDetail;
