import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { request } from '../api/ClockAsyncRequest'
import { SimpleClockInterface } from '../interfaces/ApiRequestInterface'
import TimerScreen from './TimerScreen'

const ClockScreen = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [time , setTime] = useState<SimpleClockInterface>({} as SimpleClockInterface);
    
    useEffect(() => {
        setInterval(async() => {
                const resp = await request();
                setTime(resp!);
                setIsLoading(false);
            }, 450);
    }, [request, setIsLoading]);
    
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={[time]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <View style={styles.clockContainer} >
                        <Text style={styles.time}>{item.time12}</Text>
                        <Text style={styles.text}> Dia de la semana: {item.day_of_week}</Text>
                        <Text style={styles.text}>Dia del año: {item.day_of_year}</Text>
                        <Text style={styles.text}>Region: {item.timezone}</Text>
                    </View>
                )}
            />
            <TimerScreen />
        </View>
    )
}

// Diseño del reloj 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15616d',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    clockContainer:{
        flex: 1,
        backgroundColor: '#001524',
        marginTop: 100,
        width: 300,
        height: 300,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    time: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },

})

export default ClockScreen
