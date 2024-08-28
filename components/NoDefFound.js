import { View, Text, StyleSheet, ScrollView, Pressable, Image, Linking } from 'react-native';

const NoDefFound = ({selectedFont, theme}) => {
    return(
    <View style={[styles.container, { fontFamily: selectedFont, backgroundColor: theme.background }]}>
        <Image source={require('../assets/images/confused-face.png')} style={{height: 45, width: 45, }}/>
        <Text style={[styles.bigText, {color: theme.text}]} testID='no-def-found'>No Definitions Found</Text>
        <Text style={styles.smallText}>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 1, 
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bigText:{
        fontSize: 18,
        marginTop: 20,
    },
    smallText:{
        fontSize: 14,
        color: '#757575',
        textAlign: 'center',
        marginTop: 20,
    }
})

export default NoDefFound;