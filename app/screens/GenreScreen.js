import React, {useState, useEffect} from "react";
import { FlatList, View } from "react-native";
import Screen from "../components/Screen";
import styles from "./styles";
import GenreCard from "../components/GenreCard";
import useApi from "../hooks/useApi";
import moviesApi from "../api/moviesApi";
import AppText from "../components/Text";
import Button from "../components/Button";

import ActivityIndicator from "../components/ActivityIndicator";

function GenreScreen({ navigation }) {
  const {data, error, loading, request: getGenres} = useApi(moviesApi.getGenres);
  useEffect(() => {
    getGenres();  
  }, []);
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText>Couldn't retrieve the movies.</AppText>
            <Button title="Retry" onPress={getGenres} />
          </>
        )}
        <FlatList
          data={data.genres}
          keyExtractor={(genre) => genre.id.toString()}
          renderItem={({ item }) => (
            <GenreCard
              title={item.name}
              // onPress={() => navigation.navigate(ro, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

export default GenreScreen;
