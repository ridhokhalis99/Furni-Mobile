import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query Query {
    getProducts {
      id
      name
      slug
      overview
      price
      mainImg
      Category {
        name
      }
    }
  }
`;

const GET_PRODUCT = gql`
  query Query($slug: String) {
    getProduct(slug: $slug) {
      name
      overview
      description
      mainImg
      price
      User {
        username
      }
    }
  }
`;

export { GET_PRODUCTS, GET_PRODUCT };
