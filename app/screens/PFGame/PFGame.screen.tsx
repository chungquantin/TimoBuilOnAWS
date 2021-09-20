/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Dimensions, ImageBackground, Modal, Pressable, View, Alert } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./PFGame.style"
import { AutoImage } from "../../components/auto-image/auto-image"
import { color } from "../../theme"
import { TouchableHighlight } from "react-native-gesture-handler"

const CharacterBaby = require("../../../assets/character/character-baby.png")
const Background = require("../../../assets/character/character-background.jpg")
const GameCurrency = require("../../../assets/icon/game-currency.png")
const QuizIcon = require("../../../assets/icon/quiz-icon.png")
const EventIcon = require("../../../assets/icon/event-icon.png")
const StoreIcon = require("../../../assets/icon/store-icon.png")
const RankIcon = require("../../../assets/icon/rank-icon.png")

export const PFGameScreen = observer(function PFGameScreen() {
  const [modal, setModal] = React.useState({
    quiz: false,
    event: false,
    store: false,
    rank: false,
  })
  const [selectedAnswer, setSelectedAnswer] = React.useState(0)
  const [isAnswered, setIsAnswer] = React.useState(false)
  const [gameInfo, setGameInfo] = React.useState({
    name: "The Seeker's baby",
    star: 0,
    money: 0,
    item: [],
  })
  const RenderGameCharacter = () => (
    <AutoImage
      source={CharacterBaby}
      defaultSource={CharacterBaby}
      resizeMode="contain"
      style={{
        height: 300,
        width: Dimensions.get("screen").width,
        position: "absolute",
        bottom: 100,
      }}
    />
  )
  const handler = {
    SubmitQuiz: () => {
      if (selectedAnswer !== 2) {
        Alert.alert("Kết quả", "Rất tiếc bạn đã trả lời sai", [
          {
            text: "Xem kết quả",
            onPress: () => setIsAnswer(true),
          },
          {
            text: "Đóng",
            onPress: () =>
              setModal({
                ...modal,
                quiz: !modal.quiz,
              }),
          },
        ])
      } else {
        Alert.alert("Kết quả", "Chúc mừng bạn đã chinh phục câu đố của hôm nay", [
          {
            text: "Tôi đã hiểu",
            onPress: () => {
              setGameInfo({
                ...gameInfo,
                money: gameInfo.money + 500,
              })
              setModal({
                ...modal,
                quiz: !modal.quiz,
              })
            },
          },
          {
            text: "Đóng",
            onPress: () =>
              setModal({
                ...modal,
                quiz: !modal.quiz,
              }),
          },
        ])
      }
    },
  }
  return (
    <View testID="PFGameScreen" style={{ ...Style.Container, margin: 0, padding: 0 }}>
      <Screen unsafe={true}>
        <ImageBackground
          source={Background}
          defaultSource={Background}
          resizeMode="contain"
          style={{ flex: 1, marginTop: -150 }}
        >
          <View
            style={{
              marginTop: 160,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                backgroundColor: color.palette.timoYellow,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 50,
                marginRight: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", color: color.palette.white, fontSize: 14 }}>
                Tin Chung's Baby
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                marginRight: 5,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: color.primary,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {gameInfo.money}
              </Text>
              <AutoImage
                source={GameCurrency}
                defaultSource={GameCurrency}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: color.primary,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {gameInfo.star} ⭐
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginTop: 20,
            }}
          >
            <View>
              <Pressable
                onPress={() =>
                  setModal({
                    ...modal,
                    quiz: true,
                  })
                }
              >
                <View>
                  <AutoImage
                    source={QuizIcon}
                    defaultSource={QuizIcon}
                    resizeMode="contain"
                    style={{
                      height: 50,
                      width: 50,
                    }}
                  />
                  <Text style={{ fontWeight: "bold" }}>Đố vui</Text>
                </View>
              </Pressable>
              <View>
                <AutoImage
                  source={EventIcon}
                  defaultSource={EventIcon}
                  resizeMode="contain"
                  style={{
                    marginTop: 20,
                    height: 50,
                    width: 50,
                  }}
                />
                <Text style={{ fontWeight: "bold" }}>Sự kiện</Text>
              </View>
            </View>
            <View>
              <View style={{ alignItems: "center" }}>
                <AutoImage
                  source={StoreIcon}
                  defaultSource={StoreIcon}
                  resizeMode="contain"
                  style={{
                    height: 50,
                    width: 50,
                  }}
                />
                <Text style={{ fontWeight: "bold" }}>Cửa hàng</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <AutoImage
                  source={RankIcon}
                  defaultSource={RankIcon}
                  resizeMode="contain"
                  style={{
                    marginTop: 20,
                    height: 50,
                    width: 50,
                  }}
                />
                <Text style={{ fontWeight: "bold" }}>Xếp hạng</Text>
              </View>
            </View>
          </View>
          <RenderGameCharacter />
        </ImageBackground>
      </Screen>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal.quiz}
        onRequestClose={() => {
          setModal(
            (modal) =>
              (modal = {
                ...modal,
                quiz: false,
              }),
          )
        }}
      >
        <View
          style={{
            marginVertical: 150,
            marginHorizontal: 30,
            borderRadius: 30,
            height: isAnswered ? 350 : 260,
            justifyContent: "center",
            padding: 15,
            paddingHorizontal: 25,
            shadowColor: color.palette.tintBlack,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            backgroundColor: color.palette.white,
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Đâu là tên của phương pháp phân bổ nguồn tiền?
            </Text>
            {isAnswered && (
              <Text style={{ fontSize: 12, textAlign: "justify", marginTop: 10 }}>
                Established by T. Harv Eker in the book Secrets of the Millionaire Mind, 6 Jars
                System will divide your money into 6 categories for specific purposes: Necessities
                (55%), Long-Term Saving (10%), Play (10%), Education (10%), Financial (10%), Give
                (5%).
              </Text>
            )}
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableHighlight onPress={() => setSelectedAnswer(1)}>
                <View
                  style={{
                    backgroundColor: selectedAnswer !== 1 ? color.palette.offWhite : color.primary,
                    borderRadius: 50,
                    width: 20,
                    height: 20,
                    marginRight: 10,
                  }}
                />
              </TouchableHighlight>
              <Text>5 lọ tài chính</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableHighlight onPress={() => setSelectedAnswer(2)}>
                <View
                  style={{
                    backgroundColor: selectedAnswer !== 2 ? color.palette.offWhite : color.primary,
                    borderRadius: 50,
                    width: 20,
                    height: 20,
                    marginRight: 10,
                  }}
                />
              </TouchableHighlight>
              <Text>6 lọ tài chính</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableHighlight onPress={() => setSelectedAnswer(3)}>
                <View
                  style={{
                    backgroundColor: selectedAnswer !== 3 ? color.palette.offWhite : color.primary,
                    borderRadius: 50,
                    width: 20,
                    height: 20,
                    marginRight: 10,
                  }}
                />
              </TouchableHighlight>
              <Text>7 lọ tài chính</Text>
            </View>
            {/* <MultipleChoice
              direction={"column"}
              choices={["Football", "Badminton", "Basketball", "Tennis"]}
            /> */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Pressable
                onPress={() =>
                  setModal({
                    ...modal,
                    quiz: !modal.quiz,
                  })
                }
                style={{ marginTop: 30 }}
              >
                <Text>Đóng</Text>
              </Pressable>
              <Pressable
                disabled={isAnswered}
                onPress={handler.SubmitQuiz}
                style={{ marginTop: 30 }}
              >
                <Text>Gửi</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
})
