import React, { useState } from 'react';
import { View, useWindowDimensions, Text, StyleSheet, ScrollView } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import getTextSummary from '../utils/getTextSummary'

const KeywordsTab = () => {
  return <View style={{flex: 1, backgroundColor: '#9BD3DD'}}></View>
}

const PointsTab = ({title, content}) => {
  // Change to text summary api when it is done
  // const summaryBulletPoints = getTextSummary(null, content);
  const summaryBulletPoints = content; 

  return (
    <ScrollView /*style={{borderWidth: 2, borderColor: 'pink'}}*/>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.baseText}>{summaryBulletPoints}</Text>
    </ScrollView>
  )
}

const SummaryPage = ({title, content}): JSX.Element => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    // Keywords tab is disabled
    // { key: 'keywords', title: 'Keywords' },
    { key: 'points', title: 'Points' },
  ]);

  const renderScene = (route) => {
    if (route.key == 'keywords') {
      return <KeywordsTab/>;
    }else if (route.key == 'points') {
      return <PointsTab title={title} content={content}/>;
    }
  }

  const renderTabBar = (props) => {
    return (
        <TabBar
          {...props}  // parameters from TabView
          style={styles.tabBar}
          gap={14}
          tabStyle={styles.tabItem}
          labelStyle={styles.tabLabelStyle}
          indicatorStyle={{backgroundColor: "black"}}
          contentContainerStyle={{margin: 0}}
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