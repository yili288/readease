import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView} from 'react-native';

const HomePage = ({ navigation }): JSX.Element => {

    return(
        <View style={styles.homePageContainer}>
            <View style={styles.topRowContainer}>
                <Text style={styles.homeTitleText}>Home</Text>
                <TouchableOpacity onPress={() => {}}>
                    <Image source={require('../assets/settings.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('OriginalText')}>
                    <Image style={styles.documentThumbnail} source={require('../assets/textThumbnail.png')} />
                    <Text style={styles.documentTitleText}>Neoclassicism and Early...</Text>
                </TouchableOpacity>
            </ScrollView>
            <View>
                <TouchableOpacity style={styles.uploadButton} onPress={() => {}}>
                    <Image
                        source={require('../assets/upload.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
var styles = StyleSheet.create({
    homePageContainer: {
        padding: 10,
        height: '100%',
    },
    topRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    homeTitleText: {
        fontSize: 27,
        fontFamily: 'Inter-ExtraBold',
        color: '#000000',
        paddingLeft: 10,
    },
    documentTitleText: {
        fontSize: 17,
        fontFamily: 'Inter-Black',
        color: '#000000',
        paddingHorizontal: 10
    },
    documentThumbnail: {
        width: 216,
        height: 191,
    },
    uploadButton: {
        position: 'absolute',
        bottom: 0,
        right: 5,
    },
});

export default HomePage;