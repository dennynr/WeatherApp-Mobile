import { Box, Input, InputField, Pressable, InputIcon, InputSlot, Heading, Image, HStack, VStack } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'react-native';
import { Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Clock from 'react-live-clock';
const Home = () => {
  const [cuaca, setCuaca] = useState(null);
  const [kota, setKota] = useState('Jakarta');
  const insets = useSafeAreaInsets();
  useEffect(() => {
    fetchData();

  }, []);

  const ApiKey = "YourApisKey"

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${ApiKey}&units=metric`);
      const data = await response.json();
      console.log(data)
      if (data.cod && data.cod !== 200) {
        setCuaca(null); // Reset cuaca to null if there's an error
      } else {
        setCuaca(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const weatherImages = {
    'Clear': require('../assets/weather/cerah.png'),
    'Clouds': require('../assets/weather/berawan.png'),
    'Rain': require('../assets/weather/hujan.png'),
    'Haze': require('../assets/weather/haze.png'),

  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <LinearGradient
        colors={['#2F80ED', '#56CCF2']}
        style={{ flex: 1 }}
      >
        <Box p={20}>
          <Box>
            <Input
              variant="outline"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              bgColor='white'
              rounded={10}
              borderWidth={0}
            >
              <InputSlot pl="$3">
                <Ionicons name="location-outline" size={24} color="#b5b5b5" />
              </InputSlot>
              <InputField placeholder="Cari Kota Disini" onChangeText={(text) => setKota(text)} onSubmitEditing={fetchData} />
            </Input>
          </Box>

          {cuaca ? (
            <Box alignItems='center' marginTop={50} >
              <Image w={100} h={100} alt='cuaca' source={weatherImages[cuaca.weather[0].main]} />
              <Box>
                <Text style={{ color: 'white', fontSize: 70, fontWeight: 'bold' }}>{cuaca.main.temp}°</Text>
              </Box>
              <Box>
                <Text style={{ color: 'white', fontSize: 20 }}>{cuaca.weather[0].main}</Text>
              </Box>
              <Box mt={30}>
                <Text style={{ color: 'white', fontSize: 35 }}>{cuaca.name}</Text>
              </Box>

              <Box bgColor='white' w={'100%'} height={130} rounded={20} p={20} mt={200} hardShadow >
                <Box alignItems='center' flex={1} >
                  <HStack space='4xl' mt={10}>
                    <VStack alignItems='center' space='m'>
                      <Text style={{ fontSize: 20, color: '#6f6f6f' }}>{cuaca.wind.speed}m/s</Text>
                      <Text style={{ fontSize: 12, color: '#6f6f6f' }}>Angin</Text>
                    </VStack>

                    <VStack alignItems='center' space='m'>
                      <Text style={{ fontSize: 20, color: '#6f6f6f' }}>  {cuaca.main.humidity}%</Text>
                      <Text style={{ fontSize: 12, color: '#6f6f6f' }}>Kelembapan</Text>
                    </VStack>
                    <VStack alignItems='center' space='m'>
                      <Text style={{ fontSize: 20, color: '#6f6f6f' }}>  {cuaca.main.temp_max}°</Text>
                      <Text style={{ fontSize: 12, color: '#6f6f6f' }}>Puncak</Text>
                    </VStack>
                  </HStack>
                  <Box mt={30}>
                    <Text style={{ fontSize: 10, color: '#6f6f6f' }}>WeatherApp by DennyDR</Text>
                  </Box>
                </Box>

              </Box>
            </Box>
          ) : (
            <Text>Kota tidak ditemukan</Text>
          )}
        </Box>
        <Box justifyContent='center' alignItems='center' mt={30}>
          {/* <Clock element={Text} format='HH:mm' interval={1000} ticking={true} style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }} /> */}
        </Box>
      </LinearGradient>
    </SafeAreaView>

  );
};

export default Home;
