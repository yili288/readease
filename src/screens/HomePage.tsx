import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView, SafeAreaView, Modal} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import uploadImage from '../utils/uploadImage';
import handleImportFiles from '../utils/handleImportFiles';
import getAllTexts from '../utils/getAllText';
import { TextDocument } from '../types';

const HomePage = ({ navigation }): JSX.Element => {
    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [documents, setDocuments] = useState<TextDocument[]>([])
    
    const onUploadButtonPressed = () => {
        launchImageLibrary({mediaType: 'photo'}, async (response) => {
            if (response.assets !== undefined && response.assets.length > 0) {
                let { text, textId } = await uploadImage(response.assets[0].uri);
                setUploadModalVisible(false);
                navigation.navigate('OriginalText', {text, textId});
            }
        });
    }
    
    useEffect(() => {
        async function getDocuments() {
            const texts = await getAllTexts();
            setDocuments(texts);
        };
        if (documents.length == 0) {
            getDocuments();
        }
    }, []);
                            
    return(
        <SafeAreaView style={styles.safeAreacontainer}>
            <View
                style={[
                    styles.homePageContainer,
                    uploadModalVisible ? { opacity: 0.5 } : {}
                ]}
            >
                <View style={styles.topRowContainer}>
                    <Text style={styles.homeTitleText}>Home</Text>
                    <TouchableOpacity onPress={() => {}}>
                        <Image source={require('../assets/settings.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                {
                    documents.map((document) => (
                        <TouchableOpacity 
                            key={document.text_id}
                            testID='originalText'
                            onPress={() => navigation.navigate('OriginalText', {textId: document.text_id})}>
                            <Image style={styles.documentThumbnail} source={require('../assets/textThumbnail.png')} />
                            <Text style={styles.documentTitleText}>{document.name}</Text>
                        </TouchableOpacity>
                    ))
                }
                </ScrollView>
                <Modal 
                    transparent={true} 
                    visible={uploadModalVisible} 
                    onRequestClose={() => setUploadModalVisible(!uploadModalVisible)}>
                    <View style={styles.centerAlignContainer}>
                        <View style={styles.modalContainer}>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={styles.uploadOptions} onPress={handleImportFiles}>
                                <Text style={styles.uploadOptionsText}>Import Files</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.uploadOptions} onPress={()=>{
                                launchCamera({mediaType: 'photo'}, (response) => {
                                    if (response.assets !== undefined && response.assets.length > 0) {
                                        uploadImage(response.assets[0].uri);
                                    }
                                });
                            }}>
                                <Text style={styles.uploadOptionsText}>Scan Pages</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.uploadOptions} onPress={onUploadButtonPressed}>
                                <Text style={styles.uploadOptionsText}>Upload Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.modalExitButtonContainer} 
                                onPress={() => setUploadModalVisible(!uploadModalVisible)}>
                                <Image
                                    style={styles.modalExitButton}
                                    source={require('../assets/exit.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </Modal>
                <View>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={() => setUploadModalVisible(true)}>
                        <Image
                            source={require('../assets/upload.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
var styles = StyleSheet.create({
    safeAreacontainer: {
        flex: 1,
    },
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
    centerAlignContainer:{
        flexDirection: 'column',
        marginTop: 400,
        marginLeft: 70,
        marginRight: 70,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    modalContainer: {
        margin: 5,
    },
    modalButtonsContainer: {
        flexDirection: 'column',
    },
    uploadOptions: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEF',
    },
    uploadOptionsText: {
        color: '#000000',
        fontFamily: 'Manrope',
        fontSize: 16,
        margin: 10,
    },
    modalExitButtonContainer: {
        margin: 5,
        alignSelf: 'flex-end',
    },
    modalExitButton: {
        width: 25,
        height: 25,
    },
});

export default HomePage;