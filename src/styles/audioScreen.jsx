import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121A2E',
  },
  navContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 40,
    paddingLeft: 20,
  },
  audioDetailContainer: {
    marginTop: 110,
    alignItems: 'center',
  },
  audioPlayerContainer: {
    flex: 1,
    marginTop: 20,
  },
  audioControllerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preferencesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: 25,
    height: 25,
  },
  playerButtonStyle: {
    width: 70,
    height: 70,
  },
  audioTitleStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Manrope',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 30,
    marginTop: 20,
    paddingHorizontal: 50,
  },
  playerImageStyle: {
    width: 200,
    height: 200,
  },
  sliderStyle: {
    width: 300,
    height: 40,
  },
  textStyle: {
    color: '#FFF',
    fontFamily: 'Manrope',
    fontWeight: 'bold',
  },
  subTextStyle: {
    color: '#FFF',
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 9,
    paddingTop: 5,
  },
})

export default styles;