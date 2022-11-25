import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function GenreCard({ title, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.secondary,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    marginBottom: 7,
  },
});

export default GenreCard;
