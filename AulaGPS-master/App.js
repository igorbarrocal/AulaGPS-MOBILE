import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

// Função para converter graus em radianos
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Função para calcular a distância entre dois pontos geográficos
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da Terra em km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distância em km
  return d;
}

// Componente principal do app
export default function App() {
  // Estado para armazenar os marcadores
  const [markers, setMarkers] = useState([]);
  // Estado para armazenar a distância
  const [distancia, setDistancia] = useState(0);

  // Função chamada ao clicar no mapa
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    // Limita a quantidade de marcadores a 2
    if (markers.length >= 2) {
      Alert.alert("Limite de marcadores atingido", "Clique em limpar");
      return;
    }

    // Adiciona novo marcador
    const newMarkers = [...markers, { latitude, longitude }];
    setMarkers(newMarkers);

    // Calcula a distância se houver 2 marcadores
    if (newMarkers.length === 2) {
      const dist = getDistanceFromLatLonInKm(
        newMarkers[0].latitude,
        newMarkers[0].longitude,
        newMarkers[1].latitude,
        newMarkers[1].longitude
      );
      setDistancia(dist.toFixed(2));
    }
  };

  // Função para limpar os marcadores e a distância
  const handleClear = () => {
    setMarkers([]);
    setDistancia(0);
  };

  // Função para mover marcadores e recalcular distância
  const handleDragEnd = (index, event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newMarkers = [...markers];
    newMarkers[index] = { latitude, longitude };
    setMarkers(newMarkers);

    if (newMarkers.length === 2) {
      const dist = getDistanceFromLatLonInKm(
        newMarkers[0].latitude,
        newMarkers[0].longitude,
        newMarkers[1].latitude,
        newMarkers[1].longitude
      );
      setDistancia(dist.toFixed(2));
    }
  };

  return (
    <View style={style.container}>
      <View style={style.mapContainer}>
        {distancia > 0 ? (
          <Text style={style.infoText}>Distância Calculada: {distancia} km</Text>
        ) : (
          <Text style={style.infoText}>Toque em dois pontos no mapa para calcular a distância</Text>
        )}
        <TouchableOpacity style={style.button} onPress={handleClear}>
          <Text style={style.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={style.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {/* Renderizar marcadores */}
        {markers.map((m, index) => (
          <Marker
            key={index}
            coordinate={m}
            title={`Marcador ${index + 1}`}
            pinColor={index === 0 ? "blue" : "red"}
            draggable
            onDragEnd={(e) => handleDragEnd(index, e)}
          />
        ))}
      </MapView>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  mapContainer: {
    padding: 16,
    backgroundColor: "#000012",
    borderRadius: 10,
    margin: 16,
    zIndex: 1
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#1e90ff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});