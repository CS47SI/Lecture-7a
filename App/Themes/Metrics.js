import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')
const calculateHeight = function () {
  if(Platform.OS === 'ios' && width === 375 && height === 812) return 83;
  if(Platform.OS === 'ios') return 59;
  return 0;
}

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  bottomBarHeight: calculateHeight(),
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export default metrics
