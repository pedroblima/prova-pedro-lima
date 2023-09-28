import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Api from '../../services/Api';

export default function Restaurante(props) {

    const resId = props.route.params.id;

    const [restaurante, setRestaurante] = useState(null);
    const [pratos, setPratos] = useState([]);
    const [bebidas, setBebidas] = useState([]);

    useEffect(() => {

        Api.get(`/restaurantes/${resId}`)
            .then(dados => {
                setRestaurante(dados.data);
            })
            .catch(error => {
                console.error("Erro ao buscar detalhes do restaurante:", error);
            });


        Api.get(`/pratos?restaurante_id=${resId}`)
            .then(dados => {
                setPratos(dados.data);
            })
            .catch(error => {
                console.error("Erro ao buscar pratos do restaurante:", error);
            });


        Api.get(`/bebidas?restaurante_id=${resId}`)
            .then(dados => {
                setBebidas(dados.data);
            })
            .catch(error => {
                console.error("Erro ao buscar bebidas do restaurante:", error);
            });
    }, [resId]);

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 25 }}>Restaurante</Text>
            {restaurante && (
                <Card style={{borderWidth: 1}} >
                    <Card.Title
                        title={restaurante.nome}
                        subtitle={restaurante.descricao}
                        titleStyle={{ fontSize: 20 }} 
                    />
                    <Card.Cover source={{ uri: restaurante.imagem }} style={{width: 400}}  />
                    <Card.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                            <Text variant="titleLarge" style={{ fontSize: 15, fontWeight: 'bold' }}>Nome:</Text>
                            <Text variant="titleLarge">{restaurante.nome}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                            <Text variant="titleLarge" style={{ fontSize: 15, fontWeight: 'bold' }}>Tipo de cozinha:</Text>
                            <Text variant="titleLarge">{restaurante.tipo_cozinha}</Text>
                        </View>
                        <View style={{ flexDirection: 'content', justifyContent: 'space-between', padding: 5 }}>
                            <Text variant="titleLarge" style={{ fontSize: 15, fontWeight: 'bold' }}>Endereço:</Text>
                            <Text variant="titleLarge" style={{ padding: 5 }}>{restaurante.endereco}</Text>
                        </View>
                        <View style={{ flexDirection: 'content', justifyContent: 'space-around', padding: 5 }}>
                            <Text variant="titleLarge" style={{ fontSize: 15, fontWeight: 'bold' }}>Horário de Funcionamento:</Text>
                            <Text variant="titleLarge" style={{ padding: 5 }}>{restaurante.horario_funcionamento}</Text>
                        </View>
                    </Card.Content>
                </Card>
            )}


            <Text style={{ textAlign: 'center', fontSize: 25 }}>Cardápio</Text>
            <Card style={{borderWidth: 1}}>
                <Card.Content>
                    <Text style={{ textAlign: 'center', fontSize: 15 }}>Pratos</Text>
                    {pratos.map(prato => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }} key={prato.id}>
                            <Text variant="titleLarge">Nome do Prato: {prato.nome}</Text>
                            <Text variant="titleLarge">Descrição: {prato.preco}</Text>
                        </View>
                    ))}

                    <Text style={{ textAlign: 'center', fontSize: 15, marginBottom: 10 }}>Bebidas</Text>
                    {bebidas.map(bebida => (
                        <View key={bebida.id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text variant="titleLarge">Nome da Bebida: {bebida.nome}</Text>
                            <Text variant="titleLarge" style={{ textAlign: 'right' }}>Preço: {bebida.preco}</Text>
                        </View>
                    ))}
                </Card.Content>
            </Card>
        </View>
    );
}
