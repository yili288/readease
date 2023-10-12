import React, { useState} from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import saveAudioFile from '../utils/saveAudioFile';
import AudioPlayer from '../components/AudioPlayer';

const Home = (): JSX.Element => {
  const textToAudio = () => {
    // send file text to server
    const response = {
      "audioContent": "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cEAdBcKCQoGL//6aKf//8rinZ4aILjHnVLEVvY6rtiFnT9ROLiAYZSaClIQHyW34xf3Fq+b/UJX6g5FLqGCbPYXERuTEWo3PYMprtMG2XMM//2V3//NExDkRMSKoANIScDf///57/QZIC4fWUec3oUAxa7Yowq4FWhVnOYtf+X7+//8tSgMAQtzG6lylZLl/////////6N/03k3V9S7q/VyqjKRhBjucXQQHEWgnEBS4pKhw//NExEcSAxasAMFKuHYvITAEeJA3YvIqav/f////////////+ndE/rWlvbV7L0R29ZqIRzIdZTmspUGkMkxh41A4LOIIMUqiAgKh0PRwRFhUPEliz8t46IcN+hkFD146//NExFIRMxqkAGhKvR1f4AM+c7p+1foRtRdCaN+p+hCESf/////1X//6////R6dHuWu9kZDV6G5lZQ6hqlGDxIDD2FpcNn5scPy+pbEQA7oikpBwgEsKg4iZCtD+ZlbQ//NExGAQ6xaoAHlKuSHnswNZnTBHspzaKlAFhcWolgAkMX0NLb6HB8F46zSi1oWRP20f3Grkq////rWJyMdc76E1XBzUyOISLC6QvA4ZqM0yo5k3J80DW+UL9x74uvVu//NExG8UGRqkANRYcPs7c2pTWFAngWpQetUoTXk3UlOYeEuqP/+3p30YqsVcoCHHg+f//+n5ZiSVCli2tOgcts2p2urFR5V7HYEUCbYowDCz82VS9qqbmN9BIeXN9HlU//NExHESmaaoAMrUlLR9BRab///9W5S3MZylR9SqVkUpdQpagISeHdRWIhCWdPfkpWoizisTZGYebHCyxnIY3rxOUy2reiMZjU9TRGT2SQUQGyR6JVPxRvT/q3/9zaL2//NExHkSkhqYAMFEmLA9awWwHeUnBzk+syhV7aVxbXUpJkoESzITCZu6d6/lLJA+XPubp/3dAzGQTPIdA+hE+Dlj2Qeru/HPN0DNP1TNNNPMyHls6MuQe/00LoXKYuci//NExIEQGFJgAVsAAGQciZXT7u7u29FWs2QFxknFxk0VCKbu///XyKE4kKQFKBigMUDIDGClCfAVf//oWW7/+OUJ8DLY+hcAXVjPCcBmyLm4j8vGigvA2O1BvLcxJR1X//NExJMh2ypwAZqIAHBf5L303Pjkcz+Uf//n+/P4+O1frfW7/uujC8l/udj/xtfI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raRZ0dRUgshjOUVy/iUuS+0x1KKMNnqds1rorUME/VBFC04M//NExA0Soj6oAMFEuARuitQxZ16h9+r6nTrNO7LJZyjgOKDmfIhC57USys6df/+m66GWnlreYyGzKWutWM6FoaoVjw92sNLEXT66eT8ZUYQqWc5RsLNj0vzLM6SF5f4n//NExBUSAxakAMnEuCnHCT7Pqj57cociOBAAobKUHW0Pajmpnmyjste3///9isf////////989iN/t9aetVDi4zzdcxmfO9tLVBaRc3AUW//ru/n//MIaIL+r++v//////NExCARwxaoAMBKuf3/////k5i30v6W6FlldmcUAjijigiBxjMYdZTB8xB4gCHHCYIPDxnCoBLPNzn//////nP/5f///+3//Rv/fe/3zO6KYYxIwwg7/a61IGmRuVHJ//NExCwRsxqwADhOvVG44xo0Q4dcw8eLlSYkONigpBcJISBEKBQaMhcn//////+uc/5T5/////9///+7fvey0n6mDhIbChjlSfmj58cNJIPHscQJuonKlR0m5hAfPHEH//NExDgRCxq0AAhOvcIxHGpM8SkHxWJjhVUTv70f/////+UsX/F//////LW/3bTUi5ldmtYy3mKhSDBEhhodSVi0dioHjNEhY1AGDyB4xjGMYxRxjB4WuHTB4aHQ6BZN//NExEYRcw6wABBKuAJsXMXzenrdaLK///P////+TytNVvr//9a38v+sykMqKXM8SMY1ylYxpTCQGFqtNuUsoqJFUpSo5Wl0Uu2UrOVGEQ6Cy9UFn4uuRD4SA7zyWAon//NExFMRYwKAAIhKuS+MYyyxznMrw15ek202IgfE6d/YvrJgexXv+etW5GoRDjzqcWDvQRwoWYRU0aHRLF4iHAYi5kylhI6hGkOThicYCahg+EEOcsNBGTAQs3UVMsyN//NExGAR8EpMAVwYAOStcsBQc/j5HJSK5JFDpkgXSmMAZIGZQUgaLjjHGOFMlzMhEqS5IbtQA8zRjU0HuXAU0OWO0HEHRvyQLpuany+XxOydJh0ul26ab+I2cJMvKpps//NExGsg8r6IAZtoABzRLBzJqTOd+n+lPGCT/arR///+5v932ll0MsspsLAiie5UumEbh2MCiMV135XJ///r8/9P9vQf0PmaqTnRYmykUSaNIe0EC8mMObpskdGHUg7r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3i1FjDf0DKxOUt6M5XpeaEDLcODh/Rv///NExBYQ8bKcANHWlFf6/z///2VjludRIETOYx6w7npnjuQZbPwnV39rS/6Wbe5rnmlX///60u//YFlva/dwASxNJM6TPKHTQCG586IBm87enzp6m+z+dPIVIE0eTHEB//NExCUSYbakAMFalPxxhYGDGjoiW3N6i4jQyezpJ1FjKWmmtaLzBky8hf//////3oVxcuY1BhEXgbXHC20gxB45aM4kGP7f/X9/6/+2124fx0pTbgOAnnT7Wmoeic7t//NExC4SMaagAMlWlIbNrrmqqabN3MIqMZlpPKi6nf6f/6tH1/rQOYTluowgUlCJZBdlzORCMDlpFw7HAnan/937f/rbSk0cp5TmpOBOhKkTi3NUW6Oj61O6klPepFFq//NExDgSqbKUAMialEdHqUVhJKXel6NP/1FfZr9bnVpOu5TyAucW2AhXMm41KnaASHrKaQlTa0O81vq9VfzPz/szp0uN0LHATJYNh17WbK/Vh1Q9ZGeI/hu6Wt4q78XG//NExEARqRJwAMKGcEqRhXlmj10Io4pu+Tzcx/Y5M5BjQsn2QY4TolaOBtkuAyGiQtiVEN/BZ4GkjVD2NKveNaZraGDidL+4/l+CAYE5APnEVVq/s//76rIOXjUKDVk+//NExEwSGKJsAHmeTD0BcgLsrSrUceA4zQCrLshSEblkqq1Ka6EAuD6F1IcQQu6YaFi1Y9P/mJBxqV0G03G//+yD54ekgAw9/////+uiLjq1sOAGFezlRzLpfWBifRkb//NExFYQ8LqYAEveTHe5YWWBFcU8WafOQ/1wkRcVU0708xjOc1piNPg2RPg0+PcxCRTp/2qNlhKo82Ps9n///R9q6mg2OwaIvDaPZY86/gsyOw2bM7MMryWJXoa8QQSO//NExGUR0MqYAGPecEs1DSJiE2RS5eJ5iL8XI6mKr3D58HaipFqw10VPEACEHd4ScJxYk7//Z/9/1U64vK2VjqoWLv3ClfmS3GMGwy48FGCJB4zRigA4glGkdFwgMyL0//NExHASeKaMAM6eTNTcq3UaH9SH////1vIUeV1Ols2r6ChqgIQYkV////7bKkxoetyQKJilDvr4jRkscEFi936iYONhYTqy2DZ80TLoESgfxCxHlFwVHUQx+k3Qf/////NExHkRwY6YANTK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"
    }
    saveAudioFile(response)
  }
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const displayText = () => {
    //const url = ""
    //const textJson = loadParseJson(url);
    //hardcoded json file for now until can use fetch to get texts from server
    const textJson = {'title': "Text Title", 'content': "This is a paragraph of text, I'm making this longer to see what happens when it reaches the edge of the phone screen, spoiler it wraps. \n\nThis is a second paragraph.", 'audio_file_id':"1"}
    setTitle(textJson.title);
    setContent(textJson.content);
  }

  return (
    <View> 
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.baseText}>{content}{'\n'}</Text>
      <Button
        title= 'Display Text'
        onPress={displayText}
       />
      <Button
        title='Save audio'
        onPress={textToAudio}
      />
      <AudioPlayer/>
    </View>
  );
};

//not sure where I should put this will leave here for now 
var styles = StyleSheet.create({
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    paddingLeft:10,
    paddingRight: 10,
  },
  baseText: {
    fontSize: 12,
    color: 'black',
    paddingLeft:5,
    paddingRight:5,
    //to set font would need fonts in assets folder
    //fontFamily: 'Arial',
  },
});

export default Home;