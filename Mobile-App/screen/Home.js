import { useState, useEffect } from "react";
import { Layout, Text, Button, Spinner } from "@ui-kitten/components";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../config/queries";
import { FlatList } from "react-native";
import ProductCard from "../components/ProductCard";

function Home() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    if (data) {
      if (Object.keys(data)) {
        if (!filterBy) {
          setProducts(data.getProducts);
        } else {
          const filteredProducts = data.getProducts.filter(
            (product) => product.Category.name === filterBy
          );
          setProducts(filteredProducts);
        }
      }
    }
  }, [filterBy, data]);

  function changeFilterHandler(category) {
    setFilterBy(category);
  }

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
    <Layout
      style={{
        backgroundColor: "#fff",
        paddingTop: "7.5%",
        paddingHorizontal: "5%",
      }}
    >
      <Text category="h2" style={{ marginVertical: 30 }}>
        Our {"\n"}Products
      </Text>
      <Layout style={{ flexDirection: "row", marginBottom: 20 }}>
        <Button
          style={{ margin: 3 }}
          appearance={!filterBy ? "filled" : "outline"}
          onPress={() => changeFilterHandler("")}
        >
          All
        </Button>
        <Button
          style={{ margin: 3 }}
          appearance={filterBy === "Table" ? "filled" : "outline"}
          onPress={() => changeFilterHandler("Table")}
        >
          Table
        </Button>
        <Button
          style={{ margin: 3 }}
          appearance={filterBy === "Chair" ? "filled" : "outline"}
          onPress={() => changeFilterHandler("Chair")}
        >
          Chair
        </Button>
        <Button
          style={{ margin: 3 }}
          appearance={filterBy === "Storage" ? "filled" : "outline"}
          onPress={() => changeFilterHandler("Storage")}
        >
          Storage
        </Button>
      </Layout>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListFooterComponent={<Layout style={{ marginBottom: 250 }} />}
      ></FlatList>
    </Layout>
  );
}

export default Home;
