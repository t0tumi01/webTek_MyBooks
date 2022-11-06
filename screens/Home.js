import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Text, Image, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import styles from '../Styles';
import imgMinus from '../assets/Minus.png';
import imgPlus from '../assets/Plus.png';
import imgScan from '../assets/ScanBC.png';

export default function Home({navigation, route}){
    const [books, setBooks] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(()=> {
        // Check post values and add books if necessary 
        // Note that Expo fails sometimes with these post parameters!
        if(route.params?.postISBN && route.params?.postName) {           
            const cisbn = route.params?.postISBN;
            const cname = route.params?.postName;
            if (books.filter(b => b.isbn === cisbn).length > 0)
            {
                ToastAndroid.show('ISBN Already exists! Book not added!', ToastAndroid.SHORT);
            }
            else     
            {
                // Add book
                const newBooks = [...books, {isbn: cisbn, name: cname}];
                setBooks(newBooks);
                saveBooks(newBooks);               
                ToastAndroid.show('Book ' + cname + " added", ToastAndroid.SHORT)
            }
        }

        if (!loaded)
        {
            // Load books from storage
            loadBooks();
            setLoaded(true);
        }
    }, [route.params?.postISBN], [route.params?.postName])

    /* Save books to the local file (Next version: cloud DB) */
    const saveBooks = async (sbooks) => {
        console.log("save");
        try {
            await AsyncStorage.setItem('@MyBooksDB:key', JSON.stringify(sbooks));
        } 
        catch (error) {
            console.log(error);
        }
    }

    /* Load books from the local file (Next version: cloud DB) */
    const loadBooks = async() => {
        console.log("load");
        try {
            const myArray = await AsyncStorage.getItem('@MyBooksDB:key');
            if (myArray !== null) { 
              setBooks(JSON.parse(myArray));
            }
        } 
        catch (error) {
            console.log(error);
        }
    }

    /* Table header */
    const tableHeader = {
        title: ['ISBN', 'Title', ''],
        widthArr: [120, 200, 30]
    }

    /** Remove book */
    const RemoveAtIndex = (index) => {
        const dISBN = books[index].isbn;
        const dName = books[index].name;
        Alert.alert('Delete Book', dName + '?', [
            {
              text: 'Cancel',
              onPress: () => ToastAndroid.show('Canceled', ToastAndroid.SHORT),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => {
                const newBooks = books.filter(b => b.isbn !== dISBN);
                setBooks(newBooks);
                saveBooks(newBooks);
                ToastAndroid.show(dName + ' deleted', ToastAndroid.LONG)
            } },
          ]);
    };

    /* Navigate to scanner or manual add screen */
    const AddManualRow = () => {
        navigation.navigate('Add Book');
    };

    const AddScannedRow = () => {
        navigation.navigate('Scanner');
    };

    /* Table remove button object */
    const removeButton = (index) => ( 
        <TouchableOpacity onPress={() => RemoveAtIndex(index)}>
        <Image source={imgMinus} style={styles.imgMinus} />
        </TouchableOpacity>
    );

    /* Home screen */
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>My Books</Text>
            <SafeAreaView style={styles.addIcons}>
                <TouchableOpacity onPress={() => AddScannedRow()}>
                    <Image source={imgScan} style={styles.imgScan} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => AddManualRow()}>
                    <Image source={imgPlus} style={styles.imgPlus} />
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView horizontal={true}>
                <SafeAreaView>
                    <Table borderStyle={styles.tableBorderStyle}>
                        <Row 
                          data={tableHeader.title} 
                          widthArr={tableHeader.widthArr} 
                          style={styles.tableHeadStyle} 
                          textStyle={styles.tableHeadText}
                        />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={styles.tableBorderStyle}>
                        {
                            books.map((dataRow, idx) => {
                                const rowData = [dataRow.isbn, dataRow.name, dataRow.id];
                                return (
                                    <TableWrapper key={idx} style={styles.row}>
                                    {
                                        rowData.map((cellData, cIdx) => (
                                            <Cell 
                                                key={cIdx}   
                                                width={tableHeader.widthArr[cIdx]}   
                                                data= {cIdx === 2 ? removeButton(idx) : cellData}
                                                style={[styles.tableRowStyle, idx % 2 && {backgroundColor: '#F0F0FA'}]}
                                                textStyle={styles.tableRowText}
                                            />
                                        ))
                                    }
                                    </TableWrapper>
                                );
                            })
                        }
                        </Table>
                    </ScrollView>
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    )
}