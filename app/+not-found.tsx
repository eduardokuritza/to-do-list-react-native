import { Link, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";

import React, { Fragment } from "react";

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Link href="/" style={styles.link}>
        <Text>Go to home screen!</Text>
      </Link>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
