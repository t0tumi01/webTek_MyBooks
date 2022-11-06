import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, TextInput, ToastAndroid } from 'react-native'
import MyButton from '../components/MyButton';
import styles from '../Styles';

export default function AddBook({ navigation, route }) {
    const [isbn, setISBN] = useState('');
    const [name, setName] = useState('');

    const ISBNAPI = 'https://openlibrary.org/api/books?format=json&details=true&bibkeys=ISBN:';

    /* Check possible scanned isbn value */
    useEffect(()=> {
        if(route.params?.postISBN) checkSetISBN(route.params?.postISBN)
    }, [route.params?.postISBN])

    /* Try to get title name using open library api */
    const getNameUsingAPI = (isbn) => {
        fetch(ISBNAPI + isbn)
        .then((response) => response.json())
        .then((json) => {
            if (json['ISBN:' + isbn] !== undefined) setName(json['ISBN:' + isbn].details.title);
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show('Error getting data from OpenLibrary', ToastAndroid.short);
        })
    }

    /* Check entered isbn value and set it to the isbn property */
    const checkSetISBN = (value) => {
        var err = isNaN(+value);
        if (!err) setISBN(value); 
        if (!err && (value.length === 10 || value.length === 13)) getNameUsingAPI(value);
    }

    /* Add pressed: Check values, Navigate home and post values */
    const addPressed = () => {
        if ((isbn.toString().length === 10 || isbn.toString().length === 13) && name !== "" ) {
            navigation.navigate({
                name: 'Home',
                params: { postISBN: isbn, postName: name},
                merge: true,
            })
        }
        else ToastAndroid.show('Cannot add, please check values (ISBN lenght must be 10 or 13 characters!)', ToastAndroid.LONG);
    }

    /* Return add book view */
    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.label}>ISBN:</Text>
        <TextInput style={styles.input} value={isbn} onChangeText={text => checkSetISBN(text)} placeholder='Enter ISBN' keyboardType='numeric'></TextInput>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={text => setName(text)} placeholder='Enter book name' keyboardType='default'></TextInput>
        <MyButton backColor='#df0000' text={'Cancel'} onPress={() => navigation.goBack()}></MyButton>
        <MyButton backColor='#00df00' text={'Add'} onPress={addPressed}></MyButton>

    </SafeAreaView>
    );
}