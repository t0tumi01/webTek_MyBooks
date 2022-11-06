import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../Styles';

export default function Scanner({ navigation, route }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    /* Check barcode scanner permission */
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        /* Validate scanned data. */
        if (!isNaN(+data) && (data.toString().length === 10 || data.toString().length === 13)) {
            /* Navigate to add book and post scanned isbn */
            navigation.navigate({
                name: 'Add Book',
                params: { postISBN: data, postName: '' },
                merge: true,
            })
        }
        else {
            ToastAndroid.show('Error! ISBN lenght must be 10 or 13 characters!', ToastAndroid.LONG);
        }
    };

    /* Check camera permissions */
    if (hasPermission === null){
        return <Text>Requesting for Camera Permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No Access to Camera</Text>
    }

    /* Return scanner view*/
    return(
        <View style={styles.container}>
            <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned }
                style = {StyleSheet.absoluteFillObject}
            />
            { scanned && <Button title='Tap to Scan Again' onPress={() => setScanned(false)} /> }
        </View>
    )
}