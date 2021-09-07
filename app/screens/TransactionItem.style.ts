import { Dimensions, StyleSheet } from "react-native"
import { color } from "../theme"

const { width, height } = Dimensions.get("screen")

export const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.transparent,
    borderBottomColor: color.palette.lighterGrey,
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    marginTop: height / 55,
    paddingBottom: height / 55,
    paddingHorizontal: width / 13,
  },
  Header: {
    color: color.text,
    fontSize: 13,
    marginBottom: 3,
  },
  MiddleContainer: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  Subheader: {
    color: color.palette.offGray,
    fontSize: 9,
  },
  TransactionAmount: {
    fontSize: 15,
    fontWeight: "bold",
  },
})
