import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { graphql, ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { SchemaLink } from "apollo-link-schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

import executableSchema from "./schema";

const link = new SchemaLink({ schema: executableSchema });
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const AuthorsListContainer = ({ data: { loading, authors, error } }) => {
  if (loading) return <Text style={styles.outer}>Loading</Text>;
  if (error) return <Text>{error.message}</Text>;
  return (
    <View style={styles.outer}>
      {authors.map(({ id, firstName, lastName }) => (
        <View
          key={id}
          style={{
            backgroundColor: "#cccccc",
            margin: 10,
            padding: 10,
            borderRadius: 10
          }}
        >
          <Text>
            {firstName} {lastName}
          </Text>
        </View>
      ))}
    </View>
  );
};

const AuthorsList = graphql(gql`
  query {
    authors {
      firstName
      lastName
      id
    }
  }
`)(AuthorsListContainer);

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <AuthorsList />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
