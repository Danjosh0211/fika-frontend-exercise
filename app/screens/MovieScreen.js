import React, {useState, useEffect, useCallback} from "react";
import { useFocusEffect } from '@react-navigation/native';
import {debounce} from 'lodash';

import { FlatList, View } from "react-native";
import Screen from "../components/Screen";
import styles from "./styles";
import MovieCard from "../components/MovieCard";
import useApi from "../hooks/useApi";
import moviesApi from "../api/moviesApi";
import AppText from "../components/Text";
import Button from "../components/Button";

import ActivityIndicator from "../components/ActivityIndicator";
import AppTextInput from "../components/TextInput";
import useStore from "../hooks/useStore";
import { set } from "react-native-reanimated";

function MovieScreen({ navigation }) {
  const {data: pagedMovies, error, loading, request: searchMovies} = useApi(moviesApi.searchMovies); 
  const {data: genreData, request: getGenres} = useApi(moviesApi.getGenres); 

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const {getData: getOver18, storeData: storeOver18} = useStore('over18');
  const [append, setAppend] = useState(false);

  const handleTextChange = useCallback(debounce(textChangeFunction, 500), []);
  function textChangeFunction(text){resetSearch();setSearchTerm(text)};
  const [includeAdult, setIncludeAdult] = useState(false);


  async function checkOver18(){
    const x = await getOver18();
    setIncludeAdult(x);
  }

  useFocusEffect(
    useCallback(() => {
      checkOver18();
      getGenres();
    }, [])
  );
  function resetSearch(){
    setAppend(false)
    setSearchTerm("");
    setMovies([]);
    setPage(1);
  }
  function getNextPage(){
    if(!append && !loading && movies.length > 0 && page < (pagedMovies?.total_pages ?? 1)){
      setAppend(true); 
      setPage((page)=>page+1); 
    }
  }
  useFocusEffect(
    useCallback(() => {
      if(searchTerm.length > 1){
        searchMovies({page, query:searchTerm, include_adult:includeAdult});  
      }else{
        resetSearch();
      }
    }, [page, searchTerm, includeAdult])
  );
  
  useEffect(() => {
    if(append){
      setAppend(false);
      setMovies((movies) => movies.concat(pagedMovies?.results ?? []));
    }else{
      setMovies(pagedMovies?.results ?? []);
    }

  },[pagedMovies])


  return (
    <>

      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        <View>
          <AppTextInput 
          icon="magnify"       
          onChangeText={handleTextChange}/>
        </View>
        {error && (
          <>
            <AppText>Couldn't retrieve the movies.</AppText>
            <Button title="Retry" onPress={searchMovies} />
          </>
        )}
        <FlatList
          data={movies}
          keyExtractor={(movie) => movie.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} genres={genreData.genres}
              // onPress={() => navigation.navigate(ro, item)}
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={getNextPage}
          ListFooterComponent={<ActivityIndicator visible={append} useRN={true} />}
        />
        {(!!pagedMovies && pagedMovies.page) ?  
          <AppText>{`${pagedMovies?.total_results} results available. On page ${pagedMovies?.page} of ${pagedMovies?.total_pages}`}</AppText>
        :
          <AppText>{`Start typing to search for movies` }</AppText>
        }

      </Screen>
    </>
  );
}

export default MovieScreen;
