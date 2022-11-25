import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Tags from "react-native-tags";
import Text from "./Text";
import colors from "../config/colors";

function MovieCard({ movie, genres, onPress }) {
  const [myGenres, setMyGenres] = useState([])
  const {original_title:title, overview, poster_path, genre_ids, adult}= movie;
  const imageUrl=poster_path ? "https://image.tmdb.org/t/p/w500/"+poster_path : null;
  // console.log(genre_ids);
  // console.log(genres);
  useEffect(() => {
    if(genres){
      let thisMovieGenres = genres.filter(genre => genre_ids.includes(genre.id));
      let names = thisMovieGenres.map(genre => genre.name);
      setMyGenres(names);
    }
  }, [genres])
  
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image resizeMode={"contain"} style={styles.image} source={{ uri: imageUrl }} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}      
            {!!adult && <View style={styles.nsfwtag}><Text style={styles.nsfwtagLabel}>NSFW!</Text></View>}
          </Text>
          <Text style={styles.subTitle} numberOfLines={6}>
            {overview}
          </Text>
          <View>
            {!!myGenres && myGenres.length > 0 &&
              <Tags
                initialTags={myGenres}
                onTagPress={(index, tagLabel, event) =>
                  console.log(index, tagLabel, event)
                }
                readonly
              />
            }
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    padding: 10,
    flexDirection: "row"
  },
  detailsContainer: {
    padding: 20,
    flex: 2,

  },
  image: {
    flex: 1,
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 15,

  },
  title: {
    marginBottom: 7,
    fontWeight: "bold",
    fontSize: 18,
  },
  nsfwtag: {
    backgroundColor: "#f00",
    borderRadius: 16,
    paddingHorizontal:8,
    paddingVertical:4,
    margin: 4,
    marginLeft: 12,
    textAlign: "right",
    justifyContent: 'flex-end'
    
  },
  nsfwtagLabel: {
    justifyContent: "center",
    color: "000",
    fontSize: 12
  },
});

export default MovieCard;
