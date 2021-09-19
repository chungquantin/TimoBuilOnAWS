/* eslint-disable react/jsx-key */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Dimensions, View } from "react-native"
import { Button, Text } from "../../components"
import Style from "./PFTemplateList.style"
import { color } from "../../theme"
import { GlobalContext } from "../../constants/CONTEXT"
import { useNavigation } from "@react-navigation/core"

export const PFTemplateListScreen = function PFTemplateListScreen() {
  const navigator = useNavigation()
  const { state } = React.useContext(GlobalContext)
  const suggestedTemplates = {
    "6 hũ tài chính": {
      description:
        "Phương pháp quản lý tiền với 6 cái lọ được đánh giá cao bởi mức độ phù hợp với đại đa số, dễ áp dụng và chi tiết. Có thể hiểu, quản lý tiền với nguyên tắc 6 cái lọ, bạn sẽ chia nhỏ thu nhập của mình thành 6 khoản với những mức tỷ lệ khác nhau, phụ thuộc vào mức độ cần thiết. ",
      data: {
        "Lọ 1 - Nhu cầu cần thiết": {},
        "Lọ 2 - Quỹ tự do tài chính": {},
        "Lọ 3 - Quỹ giáo dục": {},
        "Lọ 4 - Quỹ tiết kiệm dài hạn": {},
        "Lọ 5 - Quỹ hưởng thụ": {},
        "Lọ 6 - Quỹ cho đi": {},
      },
    },
    "Quy tắc 50/30/20": {
      description:
        "Quản lí ngân sách không chỉ đơn giản là thanh toán các hóa đơn đúng hạn mà là việc xác định xem số tiền cần phải chi tiêu và phải chi tiêu cho những khoản mục nào. Quy tắc 50/20/30 là một hướng dẫn phân chia tỷ lệ, theo đó bạn có thể có kế hoạch chi tiêu phù hợp với mục tiêu tiết kiệm của mình.",
      data: {
        "Các yếu tố cần thiết": {},
        "Mục tiêu tài chính": {},
        "Chi tiêu cá nhân": {},
      },
    },
  }

  const templateKeyList = Object.keys(state.user.template)
  const handler = {
    AddNewTemplate: () => navigator.navigate("AddNewTemplate" as any),
  }
  return (
    <View
      testID="PFTemplateListScreen"
      style={{ ...Style.Container, width: Dimensions.get("screen").width }}
    >
      {Object.keys(suggestedTemplates).map((template) => (
        <View style={Style.Card}>
          <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", color: color.palette.white, fontSize: 15 }}>
              {template}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: color.palette.white,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: color.palette.timoPurple,
                    fontSize: 11,
                    paddingHorizontal: 10,
                  }}
                >
                  Timo Gợi Ý
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: color.palette.green,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  marginLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: color.palette.timoPurple,
                    fontSize: 11,
                    paddingHorizontal: 10,
                  }}
                >
                  {Object.keys(suggestedTemplates[template].data).length} mục
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ color: color.palette.white, marginTop: 20, fontSize: 12 }}>
            {suggestedTemplates[template].description.slice(0, 100).trim()}...
          </Text>
        </View>
      ))}
      <View>
        {templateKeyList.map((key) => (
          <View
            style={{
              ...Style.Card,
              backgroundColor: color.palette.timoYellow,
            }}
          >
            <Text style={{ fontWeight: "bold", color: color.palette.white, fontSize: 15 }}>
              {key}
            </Text>
          </View>
        ))}
      </View>
      <Text>Không có mẫu</Text>
      <Button
        onPress={handler.AddNewTemplate}
        style={{ width: "100%", marginTop: 20, backgroundColor: color.primary }}
      >
        <Text style={{ color: color.palette.white }}>Tạo thêm mẫu mới</Text>
      </Button>
    </View>
  )
}
