import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import EnviromentButton from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface IEnviromentProps {
  key: string,
  title: string,
};

interface IPlantsProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }

};

export function PlantSelect(){
  const [enviroments, setEnviroments] = useState<IEnviromentProps[]>([]);
  const [plants, setPlants] = useState<IPlantsProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<IPlantsProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('All');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);
  
  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order=asc_page=${page}&_limit=8`);
    if (!data) return setLoading(true);
    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data])
      setFilteredPlants((oldValue) => [...oldValue, ...data])
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoading(false);
    setLoadMore(false);
  };

  function handleSelectedEnviroment(enviroment: string) {
    setEnviromentSelected(enviroment);
    if(enviroment === 'All') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter((plant) => (
      plant.environments.includes(enviroment)
    ));

    setFilteredPlants(filtered);
  };

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }
    setLoadMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  useEffect(()=> {
    async function fetchEnviroment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc&');
      setEnviroments([
        {
          key: 'All',
          title: 'Todos',
        },
        ...data]);
    };
    fetchEnviroment();
  },[]);

  useEffect(()=> {
    fetchPlants();
  },[]);

    if(loading) return <Load />
    return (
      <SafeAreaView style={ styles.container }>
        <View style={ styles.container }>
          <View style={ styles.header }>
            <Header />
            <Text style={ styles.title }>
              Em qual ambiente
            </Text>
            <Text style={ styles.subtitle}>
              você quer colocar sua planta?
            </Text>
          </View>
          <FlatList
            data={enviroments}
            renderItem= {({item}) => (
              <EnviromentButton
                title={item.title}
                key={item.key}
                active={ enviromentSelected === item.key}
                onPress={ () => handleSelectedEnviroment(item.key)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.enviromentList}
          />
        </View>
        <View style={ styles.plants }>
              <FlatList
                data={filteredPlants}
                renderItem={({item}) => (
                  <PlantCardPrimary
                    data={ item }
                  />
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onEndReachedThreshold={0.1}
                onEndReached={({distanceFromEnd}) => (
                  handleFetchMore(distanceFromEnd)
                )}
                ListFooterComponent={
                  loadMore ?
                  <ActivityIndicator color={ colors.green} />
                  : <></>
                }
              />
          </View>
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header:{
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})