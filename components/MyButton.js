import { TouchableOpacity, StyleSheet, Text, SafeAreaView, Pressable} from 'react-native';

/**
 * Button component
 * onPress - Used to forward selected value to the component using ths radiobutton component
*/
export default function MyButton({backColor, text, onPress}) {

    /** Relay function for handling Button press */
    function handlePress() {
        onPress();
    }

    /** Return Button view */
    return (
        <>
        {
            <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, {backgroundColor: backColor}]}>
            <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        }
        </>
    )    
}

/** Stylesheet */
const styles = StyleSheet.create({
    buttonContainer: {
        elevation: 8,
        alignSelf: 'center',
        width: "90%",
        backgroundColor: "#6060EF",
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 10,
      },  
      buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: 'RubikBold',
        textTransform: "uppercase"
      }  
})