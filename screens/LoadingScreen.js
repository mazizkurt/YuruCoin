import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
  NetInfo,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  AppState
} from 'react-native';
import { LinearGradient,Pedometer,AdMobRewarded,PublisherBanner,Permissions,Notifications } from 'expo';
import { Ionicons,MaterialIcons,FontAwesome } from '@expo/vector-icons';
const height=Dimensions.get("window").height
const width=Dimensions.get("window").width
import firebase from 'firebase';


export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width:new Animated.Value(100),
      height:new Animated.Value(100),
      radius:new Animated.Value(100),
      opacity:new Animated.Value(1),
      borderWidth:new Animated.Value(2),
    };
  }
  static navigationOptions = {
    header: null,
  };
  componentDidMount = () => {
    Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(this.state.width, {
              toValue: 150,
              duration: 700,
             easign:Easing.bounce
              
            }),
          
            Animated.timing(this.state.height, {
              toValue: 150,
              duration: 700,
              easign:Easing.bounce
  
  
            }),
            Animated.timing(this.state.radius, {
              toValue: 150,
              duration: 700,
              easign:Easing.bounce
  
            }),
            Animated.timing(this.state.opacity, {
              toValue: 0.4,
              duration: 700,
              easign:Easing.bounce
  
            }),
            Animated.timing(this.state.borderWidth, {
              toValue: 10,
              duration: 700,
              easign:Easing.bounce
  
             
            }),
          ]),
          Animated.parallel([
            Animated.timing(this.state.height, {
              toValue: 100,
              duration: 500,
            
            }),
            Animated.timing(this.state.width, {
              toValue: 100,
              duration: 500,
            
            }),
            Animated.timing(this.state.radius, {
              toValue: 100,
              duration: 500,
            
            }),
            Animated.timing(this.state.opacity, {
              toValue: 1,
              duration: 500,
             
            }),
            Animated.timing(this.state.borderWidth, {
              toValue: 2,
              duration: 500,
             
            }),
          ])
        ]),
        {
          iterations: 3
        }
      ).start(()=>{
        firebase.auth().onAuthStateChanged(user => {
            if(!user){
                this.componentDidMount()
            }else{
                Animated.parallel([
                    Animated.timing(this.state.width, {
                      toValue: 0,
                      duration: 200,
                     easign:Easing.bounce
                      
                    }),
                  
                    Animated.timing(this.state.height, {
                      toValue: 0,
                      duration: 200,
                      easign:Easing.bounce
          
          
                    }),
                    Animated.timing(this.state.radius, {
                      toValue: 0,
                      duration: 200,
                      easign:Easing.bounce
          
                    }),
                   
                  ]).start(()=>{
                        this.props.navigation.navigate('Yeni')
                  });
               
            }
           
          })
      })
  };
  
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <Animated.View style={{width:this.state.width,height:this.state.height,borderRadius:this.state.radius,opacity:1,backgroundColor:'transparent',borderColor:'#353535',borderWidth:this.state.borderWidth,justifyContent:'center',alignItems:'center',backgroundColor:'#353535'}}>
        </Animated.View>
      </View>
    );
  }
}
