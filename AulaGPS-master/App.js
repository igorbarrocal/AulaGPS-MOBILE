import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

function deg2rad(deg){
  return deg * (Math.PI/180);
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2){
  const R = 6371; // Raio da Terra em km
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distância em km
  return d;
}
  export default function App() {
    const[markers,setMarkers] = useState([]);

    const[distancia,setDistancia] = useState(0);

    const handleMapPress = (event) => {
      const{latitude,longitude} = event.nativeEvent.coordinate;

      if(markers.length>=2){
        Alert.alert("Limite de marcadores atingido","Clique em limpar");
        return
      };
      const newMarkers = [...markers,{latitude,longitude}];
      setMarkers(newMarkers);
  }
}  