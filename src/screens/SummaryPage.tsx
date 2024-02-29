import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import getTextSummary from '../utils/getTextSummary'
import getPictureSummary from '../utils/getPictureSummary';

const KeywordsTab = () => {
  return <View style={{flex: 1, backgroundColor: '#9BD3DD'}}></View>
}

const SummaryPage = ({textId, title, content}): JSX.Element => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    // Keywords tab is disabled
    // { key: 'keywords', title: 'Keywords' },
    { key: 'points', title: 'Points' },
  ]);

  const [summaryBulletPoints, setSummaryBulletPoints] = useState("");
  const [summaryPictureUrls, setSummaryPictureUrls] = useState([]);

  useEffect(() => {
    getTextSummary(textId, content).then((result) => {
      if (result) {
        setSummaryBulletPoints(result);
      }
    });
    getPictureSummary(textId).then((result) => {
      if (result) {
        setSummaryPictureUrls(result);
      }
    });
  }, [content]);

  // render Tab content
  const renderScene = (route) => {
    if (route.key == 'keywords') {
      return <KeywordsTab/>;
    }else if (route.key == 'points') {
      return (
        <ScrollView>
          <Text style={styles.titleText}>{title}</Text>
          {
            summaryBulletPoints ? 
            <Text style={styles.baseText}>{summaryBulletPoints}</Text>
            : <Text style={styles.baseText}>Loading...</Text>
          }
          {
            summaryPictureUrls.map((url, index) => {
              return (
                <View key={index}>
                  <Image 
                  source={{ uri: summaryPictureUrls[index]}}
                  style={{width: 400, height: 400}} 
                />
                </View>
              );
            })
          }
        </ScrollView>
      );
    }
  }

  // render Tab navigation bar
  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}  // pass down parameters from TabView
        style={styles.tabBar}
        gap={14}
        tabStyle={styles.tabItem}
        labelStyle={styles.tabLabelStyle}
        indicatorStyle={styles.tabIndicator} // underline label
      />
    )
  }

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={({route}) => renderScene(route)}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <View style={styles.lineBreak}/>
    </>
  );
}

export default SummaryPage;

const styles = StyleSheet.create({
  lineBreak: {
    backgroundColor: '#E2E2E2',
    height: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
  },
  tabIndicator: {
    backgroundColor: '#000'
  },
  tabItem: {
    width: 'auto',
    // overwrite library's default styling
    padding: 0, 
    minHeight: 0,
  },
  tabLabelStyle: {
    color: "#000",
    fontFamily: 'Manrope',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: "700",
    lineHeight: 30,
    // overwrite library's default styling
    textTransform: 'none',
  },
  titleText: {
    position: 'relative',
    fontSize: 30,
    textAlign: 'left',
    color: 'black',
    paddingVertical: 10,
    lineHeight: 35,
    fontFamily: 'Lexend Bold',
  },
  baseText: {
    fontSize: 20,
    color: 'black',
    paddingVertical: 10,
    lineHeight: 35,
    fontFamily: 'Lexend Black',
  },
});
