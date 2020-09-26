import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import Form from './components/Form'
import Weather from './components/Weather'

const App = () => {

    const [busqueda, setBusqueda] = useState({ ciudad: '', pais: '' })
    const [consultar, setConsultar] = useState(false)
    const [resultado, setResultado] = useState({})
    const [bgcolor, setBGColor] = useState('rgb(71,149,212)')

    useEffect(() => {
        const consultarClima = async () => {

            if (consultar) {
                const appID = '8df6b02a7263c788c4d7c229f84c9d16'
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${busqueda.ciudad},${busqueda.pais}&appid=${appID}`
                console.log(url)
                try {
                    const respuesta = await fetch(url)
                    const resultado = await respuesta.json()
                    console.log(resultado)
                    setResultado(resultado)
                    setConsultar(false)

                    //modify bgcolo according to temp
                    const { main } = resultado
                    const K = 273.15 // grados kelvin
                    const actual = main.temp - K
                    if (actual < 10) {
                        setBGColor('rgb(105,108,149)')
                    } else if (actual >= 10 && actual < 25) {
                        setBGColor('rgb(71,149,212))')
                    } else {
                        setBGColor('rgb(178,28,61)')
                    }

                } catch (error) {
                    showAlert()
                }
            }
        }
        consultarClima()
    }, [consultar])


    const showAlert = () => {
        Alert.alert(
            'Error',
            'City not found for that country',
            [{ text: 'Sorry' }]
        )
    }

    // hide Keyboard when tapping anywhere in the screen
    const hideKebouard = () => {
        Keyboard.dismiss()
    }

    // change bg app color
    const bgColorApp = {
        backgroundColor: bgcolor
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={() => hideKebouard()}>
                <View style={[styles.app, bgColorApp]}>
                    <View style={styles.contenido}>
                        <Weather
                            res={resultado}
                        />
                        <Form
                            busqueda={busqueda}
                            setBusqueda={setBusqueda}
                            setConsultar={setConsultar}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: 'center'
    },
    contenido: {
        marginHorizontal: '2.5%'
    }
});

export default App;
