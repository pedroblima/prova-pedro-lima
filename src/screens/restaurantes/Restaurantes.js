import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../services/Api';
import { Avatar, Card, IconButton } from 'react-native-paper';
export default function Restaurantes(props) {

    const navigation = props.navigation
    const [restaurante, setRestaurantes] = useState([]);

    useEffect(() => {
        Api.get('/restaurantes')
            .then(dados => {
                setRestaurantes(dados.data)
            })
    }, []);

    return (
        <View>
            <FlatList
                style={{ padding: 20 }}
                data={restaurante}
                renderItem={({ item }) => {
                    return (
                        <Card
                            style={{ borderWidth: 2, marginVertical: 10, padding: 5 }}
                            onPress={() => {
                                navigation.navigate('Restaurante', { id: item.id });
                            }}
                        >
                            <Card.Title
                                title={item.nome}
                                subtitle={item.tipo_cozinha}
                                left={() => <Avatar.Image size={52} source={{ uri: item.imagem }} />}
                                right={() => <IconButton icon="chevron-right" />}
                            />
                        </Card>
                    );
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})