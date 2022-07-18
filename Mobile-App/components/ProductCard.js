import { Text, Button, Layout } from "@ui-kitten/components";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import rupiahFormat from "../helpers/rupiahFormat";

function ProductCard({ product }) {
  const navigation = useNavigation();
  function overviewEllipsis() {
    if (product.overview.length > 30) {
      return product.overview.substring(0, 30) + "...";
    } else {
      return product.overview;
    }
  }

  return (
    <Layout
      style={{
        width: "45%",
        borderRadius: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: "#ECECEC",
        padding: 10,
      }}
    >
      <Image
        style={{
          width: "100%",
          aspectRatio: 1,
          resizeMode: "contain",
        }}
        source={{ uri: product.mainImg }}
      />
      <Text
        category="h6"
        onPress={() => {
          navigation.navigate("ProductDetail", { slug: product.slug });
        }}
      >
        {product.name}
      </Text>
      <Text style={{ minHeight: 38 }}>{overviewEllipsis()}</Text>
      <Text style={{ fontWeight: "700", marginTop: 5 }}>
        {rupiahFormat(product.price)}
      </Text>
      <Button size="small" style={{ marginTop: 12 }}>
        Add to Cart
      </Button>
    </Layout>
  );
}

export default ProductCard;
