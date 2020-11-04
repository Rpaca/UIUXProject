import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, Platform, Animated, TouchableOpacity} from 'react-native';
import { DefaultTheme, Dialog, Paragraph, Portal, Button, Provider as PaperProvider } from 'react-native-paper';
import { gestureHandlerRootHOC, LongPressGestureHandler, PanGestureHandler } from 'react-native-gesture-handler' ; 
import { NavigationContainer, DrawerActions  } from '@react-navigation/native';
import { Fontisto, Ionicons, FontAwesome5, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import GestrueScreen from './src/screens/GestureScreen';
import { render } from 'react-dom';
// mac에서는 safeAreaView 사용

const theme = {
  ...DefaultTheme,  
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: 'green',
  },
};

//StackScreen
function TimerSettingScreen({navigation}){
    return(
    <View style={styles.container}>
      <Button>원정대 편성</Button>
      <Button onPress={() => navigation.navigate('Timer')}>Start</Button>
    </View>
    );
}


function TimerScreen({navigation}){
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const LongPressButton = () => (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          Alert.alert("I'm being pressed for so long");
        }
      }}
      minDurationMs={100} maxDist={10}>
      <View style={styles.box} />
    </LongPressGestureHandler>
  );
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
      <Image source={ {uri: 'https://media3.giphy.com/media/3oz8xRQiRlaS1XwnPW/giphy.gif', width: 790, height: 1500} } resizeMode="contain" />
      <Text style={{ 
      height: 100,
      position : 'absolute',
      bottom : 40,
      fontSize : 70
      }}>00:25:00</Text>
        <Button onPress={showDialog} style={{position : 'absolute',top:40}}>포기하기</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>경고</Dialog.Title>
            <Dialog.Content>
              <Paragraph>포기하면 보상을 획득할 수 없습니다.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => navigation.navigate('Setting')}>확인</Button>
              <Button onPress={hideDialog}>취소</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

//DrawerScreen
function SettingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  );
}

function RecordScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  );
}

function CollectionScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  );
}

function DrawerHomeScreen({navigation}){
  return(
  <View style={styles.container}>
    <MaterialCommunityIcons name="menu" size={30} color="gray"
        style ={{
          position : 'absolute',
          top : 45, left : 30}}
        onPress={() => navigation.openDrawer()}/>
    <Image source={require('./resources/money.png')} style ={{ width : 130,
          position : 'absolute',
          top : 10, right : 15}} resizeMode="contain"/>
    <Fontisto name="island" size={300} color="gray"
        style ={{
          position : 'absolute',
          bottom : 80, left : 70}}
        onPress={() => navigation.openDrawer()}/>     
  </View>
  );
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

//DialogScreen


//NonStackScreen
function HomeScreen({}){
    return(
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="뒤로" component={DrawerHomeScreen} />
        <Drawer.Screen name="설정" component={SettingScreen} />
        <Drawer.Screen name="기록" component={RecordScreen} />
        <Drawer.Screen name="수집품" component={CollectionScreen} />
      </Drawer.Navigator>
    );
}

class BuildScreen extends React.Component {
  translateX = new Animated.Value(0)
  translateY = new Animated.Value(0)
     handleGesture = Animated.event([{nativeEvent: {translationX: this.translateX,translationY:this.translateY}}], { useNativeDriver: true });
     render() {
         let circleTransformStyle 
         circleTransformStyle = {
                 transform:[
                     {
                         translateY : this.translateY
                     },
                     {
                         translateX : this.translateX
                     }
                 ]
             }
         
         return (
             <View style={[styles.container]}>
             <PanGestureHandler onGestureEvent={this.handleGesture}>
             <Animated.View style={[styles.item,circleTransformStyle]}>
             <Entypo name="home" size={150} color="black" />
             </Animated.View>
             </PanGestureHandler>
             </View>
         )
     }
 }

function QeustListScreen({}){
    return(
    <PaperProvider theme={theme}>
        <View style={styles.container}>
        <Text>QeustListScreen</Text>
        </View>
    </PaperProvider>
    );
}

function MarketScreen({}){
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Button onPress={showDialog} style={{position : 'absolute', bottom:120}}>구입하기</Button>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>경고</Dialog.Title>
              <Dialog.Content>
                <Paragraph>골드가 부족합니다.</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>확인</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </PaperProvider>
  );
}

const TimerStack = createStackNavigator();

function TimerStackScreen() {
    return(
       <TimerStack.Navigator>
          <TimerStack.Screen name="Setting" component={TimerSettingScreen}/>
          <TimerStack.Screen name="Timer" component={TimerScreen}/>
      </TimerStack.Navigator>
    );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <SafeAreaView style={styles.safeAreaContainer}>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Fontisto
                  name={focused? 'island': 'island'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Build') {
              return (
                <FontAwesome
                  name={focused ? 'building' : 'building-o'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'TimerSetting') {
              return (
                <MaterialCommunityIcons
                  name={focused ? 'ship-wheel' : 'ship-wheel'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'QuestList') {
              return (
                <FontAwesome5
                  name={focused ? 'exclamation' : 'exclamation'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Market') {
              return (
                <Entypo
                  name={focused ? 'shopping-cart' : 'shopping-cart'}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'skyblue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Build" component={BuildScreen} />
        <Tab.Screen name="TimerSetting" component={TimerStackScreen} />
        <Tab.Screen name="QuestList" component={QeustListScreen} />
        <Tab.Screen name="Market" component={MarketScreen} />
      </Tab.Navigator>

      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}



//resizeMode = cover : 종횡비 유지하고 안보이는건 자름, container : 비율 유지해서 축소, strecth: 그냥 출력
// js code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  safeAreaContainer:{
    flex : 1,
    flexDirection : 'row',
    backgroundColor: 'white', 
    paddingTop:Platform.OS =='android' ? 24 : 0
  },
  button: {
    fontSize: 32
  },
  item: {
    position : 'absolute',
    bottom : 40,
    left : 20,
    width: 150,
    height: 150,
    borderRadius: 100
  },
  title:{
    fontSize:20,
    textAlign:"center"
},
separator: {
  width: "100%",
  height: 1,
  backgroundColor: "#ccc"
},
leftItem: {
  flex: 1,
  backgroundColor: "#76a21e",
  justifyContent: "center"
}
});
