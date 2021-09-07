import { Dimensions, StyleSheet } from "react-native"
import { color } from "../../theme"

const { width } = Dimensions.get("screen")

const Style = StyleSheet.create({
  BottomContainer: {
    backgroundColor: color.background,
    width: "100%",
  },
  BottomTransactionLabelContainer: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: width / 16,
    paddingVertical: 15,
    justifyContent: "space-between",
    backgroundColor: color.palette.offWhite,
  },
  BottomTransactionLabelText: {
    color: color.palette.offGray,
    fontSize: 15,
    fontWeight: "bold",
  },
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
    backgroundColor: color.palette.offWhite,
    flex: 1,
  },
})

export default Style
