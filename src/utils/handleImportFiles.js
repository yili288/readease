import DocumentPicker from 'react-native-document-picker';

const handleImportFiles = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles], //can change depending on the file type(s) we want to import
        });
        // upload the picked file to server
        const formData = new FormData();
        formData.append('uploaded-file', {
            uri: res.uri,
            type: res.type,
            name: res.name
        });

        const response = await axios.post(apiUrl + '/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status !== 200) {
            throw new Error('Error uploading file');
        }
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker
        } else {
            throw err;
        }
    }
};

export default handleImportFiles;