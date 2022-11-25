import React, {useState, useEffect} from "react";
import { FlatList, View } from "react-native";
import Screen from "../components/Screen";
import styles from "./styles";
import Card from "../components/MovieCard";
import useApi from "../hooks/useApi";
import moviesApi from "../api/moviesApi";
import AppText from "../components/Text";
import Button from "../components/Button";

import ActivityIndicator from "../components/ActivityIndicator";
import AppTextInput from "../components/TextInput";
import useStore from "../hooks/useStore";
function AccountScreen({ navigation }) {
  const {getData: getOver18, storeData: storeOver18} = useStore('over18');
  const [includeAdult, setIncludeAdult] = useState();
  function toggleAdult(){
    //TODO Should probably ask for age verification...
    setIncludeAdult((i)=>!i);
    
  }
 
  useEffect(() => {
    if(includeAdult != null){
      storeOver18(includeAdult);
    }
    checkOver18();
  },[includeAdult])
  
  async function checkOver18(){
    const x = await getOver18();
    if(includeAdult == null){
      setIncludeAdult(x);
    }

  }
  return (
    <>
      <Screen style={styles.screen}>
        <View>
          <AppText>
            {`You have safesearch turned ${!!includeAdult ? "off":"on"}`}
          </AppText>
          <Button title={`Toggle 18+ ${!!includeAdult ? "off":"on"}`} onPress={toggleAdult} />
        </View>
      </Screen>
    </>
  );
}

export default AccountScreen;
