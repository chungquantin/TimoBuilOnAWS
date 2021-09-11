import { StyleSheet } from "react-native"
import { color } from "../../theme"

const Style = StyleSheet.create({
  Card: {
			backgroundColor: color.background,
			padding: 20,
			paddingVertical: 30,
			borderRadius: 10,
			shadowColor: color.palette.lightGrey,
			shadowOffset: {
					width: 0,
					height: 5,
			},
			shadowOpacity: 0.15,
			shadowRadius: 6.68,
			marginBottom: 25,
			elevation: 5,
	},
		Container: {
    backgroundColor: color.background,
    flex: 1,
  },
})

export default Style
