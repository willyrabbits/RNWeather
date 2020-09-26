import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Weather = ({ res }) => {

    const { name, main } = res
    if (!name) return null

    // grados kelvin
    const K = 273.15

    return (
        <View style={styles.clima}>
            <Text style={[styles.texto, styles.actual]}>{parseInt(main.temp - K)}
                <Text style={styles.temp}>&#x2103;</Text>
                <Image
                    style={{ width: 66, height: 58 }}
                    source={{ uri: `http://openweathermap.org/img/w/${res.weather[0].icon}.png` }}
                />
            </Text>
            <View></View>
        </View>
    )
}

export default Weather

const styles = StyleSheet.create({
    clima: {
        marginBottom: 20
    },
    texto: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temp: {
        fontSize: 20,
        fontWeight: 'normal'
    }
})
