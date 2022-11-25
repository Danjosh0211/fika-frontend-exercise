import React from "react";
import LottieView from "lottie-react-native";
import { ActivityIndicator as RNActivityIndicator, Platform } from "react-native";

function ActivityIndicator({ visible = false, useRN=false }){
  if (!visible) return null;

  return (
    <>
      {/* Lottie doesn't work well with web. */}
      {Platform.OS != 'web' && !useRN ?
        <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
        />
        : <RNActivityIndicator animating={true}/> 
      }
    </>
    );
}

export default ActivityIndicator;
