# AulaGPS-MOBILE

Este projeto é um aplicativo React Native que permite ao usuário marcar dois pontos em um mapa, visualizar a distância entre eles e mover os marcadores para recalcular a distância em tempo real.

## Funcionalidades

- Marque até dois pontos no mapa.
- Veja a distância calculada entre os pontos em quilômetros.
- Mova os marcadores e veja a distância ser atualizada automaticamente.
- Limpe os marcadores e comece uma nova medição.

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps)

## Como rodar o projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Instale o react-native-maps:**
   ```bash
   npm install react-native-maps
   ```
   Ou, se estiver usando Expo:
   ```bash
   expo install react-native-maps
   ```

3. **Execute o projeto:**
   ```bash
   npx react-native run-android
   ```
   ou
   ```bash
   npx react-native run-ios
   ```
   ou, se estiver usando Expo:
   ```bash
   expo start
   ```
## Estrutura do código

- `App.js`: Componente principal, lógica dos marcadores e cálculo de distância.
- `README.md`: Este arquivo.

## Autor

Projeto desenvolvido para fins didáticos na disciplina de GPS Mobile.
