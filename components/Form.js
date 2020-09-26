import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import { Picker } from '@react-native-community/picker'

const Form = ({ busqueda, setBusqueda, setConsultar }) => {

    const { pais, ciudad } = busqueda

    // ANIMATION
    const [btnAnimacion] = useState(new Animated.Value(1))

    const animationIn = () => {
        Animated.spring(btnAnimacion, {
            toValue: .8
        }).start()
    }

    const animationOut = () => {
        Animated.spring(btnAnimacion, {
            toValue: 1,
            friction: 3,
            tension: 30
        }).start()
    }

    const estiloAnimacion = {
        transform: [{ scale: btnAnimacion }]
    }

    // VALIDATE FORM
    const validateForm = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            showAlert()
            return
        }
        console.log('City: ', ciudad)
        console.log('Country: ', pais)
        setConsultar(true)
    }

    const showAlert = () => {
        Alert.alert(
            'Error',
            'Choose a city AND a country',
            [{ text: 'OK' }]
        )
    }

    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='City'
                        placeholderTextColor='#444'
                        value={ciudad}
                        onChangeText={ciudad => setBusqueda({ ...busqueda, ciudad })}
                    />
                </View>
                <View>
                    <Picker
                        style={styles.selector}
                        selectedValue={pais}
                        onValueChange={pais => setBusqueda({ ...busqueda, pais })}
                    >
                        <Picker.Item label=' - choose a country - ' value="" />
                        <Picker.Item label='U.S.A.' value="US" />
                        <Picker.Item label='ESP' value="ES" />
                        <Picker.Item label='MEX' value="MX" />
                        <Picker.Item label='ARG' value="AR" />
                        <Picker.Item label='Costa Rica' value="CR" />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={() => animationIn()}
                    onPressOut={() => animationOut()}
                    onPress={() => validateForm()}
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.txtBuscar}>
                            SEARCH WEATHER
                        </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

export default Form

const styles = StyleSheet.create({
    formulario: {
    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#EEE',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    selector: {
        height: 180,
        backgroundColor: '#EEE',
        justifyContent: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#222',
        padding: 10,
        justifyContent: 'center'
    },
    txtBuscar: {
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 18,
        color: '#EEE'
    }
})
