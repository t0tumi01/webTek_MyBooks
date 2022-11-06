import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        paddingLeft: 5,
    },
    heading: {
        alignSelf: 'center',
        fontSize: 40,
        fontFamily: 'RubikBold',
        color: '#6060EF',
        marginTop: 20,
        marginBottom: 10,
    },
    addIcons: {
        flexDirection:'row', 
        alignSelf: 'center',
    },
    label: {
        fontSize: 20,
        fontFamily: 'RubikBold',
        paddingLeft: 20,
        marginTop: 20,
    },
    input: {
        fontSize: 18,
        fontFamily: 'Rubik',
        paddingLeft: 15,
    },
    tableBorderStyle: {
        borderWidth: 1, 
        borderColor: '#C1C0B9',
    },
    tableHeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#537791',
      },
    tableHeadText: { 
        margin: 10,
        fontFamily: 'RubikBold',
        fontSize: 18,
    },
    dataWrapper: {
        marginTop: -1,
    },
    row: { 
        flexDirection: 'row', 
        backgroundColor: '#F7F8FA' 
    },
    tableRowStyle: { 
        backgroundColor: '#F7F8FA',
    },
    tableRowText: { 
        padding: 5,
        fontFamily: 'Rubik',
    },
    imgPlus: { 
        width: 50, 
        height: 50,
        margin: 20,
    },
    imgMinus: {
        width: 20, 
        height: 20,
        margin: 5,
    },
    imgScan: {
        width: 50,
        height: 100,
        margin: 5,
        marginRight: 50
    }
});