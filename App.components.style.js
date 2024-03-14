import { StyleSheet } from 'react-native'
import color from './contains/color';
color
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    alignContent: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 18
  },
  header: {
    fontSize: 24,
    color: color.primary,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 20
  },
  centerText: {
    textAlign: 'center',
    marginTop: 250
  },
})
export default styles;