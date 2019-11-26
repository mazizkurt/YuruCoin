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


export default class ProfilScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iban:'',
      ibanbilgi:null,
      ibantop:new Animated.Value(-200),
      ibanbilgitext:'#5F5F5F',
      ibanbilgicolor:'white',
    };
  }
  static navigationOptions = {
    header: null
}
iban=()=>{

  if(this.state.adisoyadi!=''){
    if(this.state.iban!=''){
      console.log(this.state.adisoyadi);
      console.log(this.state.iban);
      console.log(firebase.auth().currentUser.uid);
      fetch('http://appnet.team/yuru/yuru/iban_guncelle.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adi: this.state.adisoyadi,
          iban: this.state.iban,
          uid:firebase.auth().currentUser.uid
        })
  
      }).then((response) => response.json())
      .then((responseJson) => {
        //Bilgi Başarıyla Güncellendi.
        this.setState({ibanbilgi:'IBAN Bilgileri Başarıyla Güncellendi.',ibanbilgicolor:'#4BB543',ibanbilgitext:'white'})

        Animated.spring(this.state.ibantop, {
          toValue: 0,
          duration: 400,
          easing:Easing.bounce,
          friction:3
        }).start(()=>{
          Animated.timing(this.state.ibantop, {
            delay: 1000,
            toValue: -200,
            duration: 300,
            easing:Easing.back(),
          }).start()
        })
      }).catch((error) => {
        console.error(error);
      })
 
    
    
    }else{
      this.setState({ibanbilgi:'Lütfen IBAN kısmını boş geçmeyin !',ibanbilgicolor:'#d9534f',ibanbilgitext:'white'})
      Animated.spring(this.state.ibantop, {
        toValue: 0,
        duration: 400,
        easing:Easing.bounce,
        friction:3
      }).start(()=>{
        Animated.timing(this.state.ibantop, {
          delay: 1000,
          toValue: -200,
          duration: 300,
          easing:Easing.back(),
        }).start()
      })
    }
  }else{
    this.setState({ibanbilgi:'Lütfen adınızı ve soyadınızı boş geçmeyin !',ibanbilgicolor:'#d9534f',ibanbilgitext:'white'})
    Animated.spring(this.state.ibantop, {
      toValue: 0,
      duration: 400,
      easing:Easing.bounce,
      friction:3
    }).start(()=>{
      Animated.timing(this.state.ibantop, {
        delay: 1000,
        toValue: -200,
        duration: 300,
        easing:Easing.back(),
      }).start()
    })
  }
 
}
  render() {
    return (
        <ScrollView contentContainerStyle={{flex:1,backgroundColor:'#ecf0f1'}} style={{flex:1}}>
        <KeyboardAvoidingView style={{zIndex:4,flex:1,justifyContent:'center',alignItems:'center'}} behavior="padding">
         <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{position:'absolute',top:50,left:20,justifyContent:'center',alignItems:'center',zIndex:5}}><Ionicons name="ios-arrow-back" size={35} color="black" /></TouchableOpacity>
         <Image  source={require('../assets/images/profil.png')} style={{width:100,height:100}}/> 
         <TextInput style={{width:'55%',height:50,borderBottomWidth:1,borderBottomColor:'#DDDDDD',padding:10,fontSize:15,marginTop:10,textAlign:'center',fontWeight:'bold'}} onChangeText={(adisoyadi) => this.setState({adisoyadi})} placeholder="ADI VE SOYADI" keyboardAppearance="dark"   returnKeyType="previous"/>
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           <TextInput style={{width:'12%',height:50,borderBottomWidth:1,borderBottomColor:'#DDDDDD',padding:10,fontSize:15,fontWeight:'bold'}} placeholder="TR" editable={false} selectTextOnFocus={false}/>
           <View style={{width:'3%'}}></View>
           <TextInput style={{width:'40%',height:50,borderBottomWidth:1,borderBottomColor:'#DDDDDD',padding:10,fontSize:15,fontWeight:'bold'}} placeholder="IBAN" onChangeText={(iban) => this.setState({iban})} keyboardType="number-pad" keyboardAppearance="dark"/>
         </View>
         <TouchableOpacity onPress={()=>this.iban()} style={{justifyContent:'center',alignItems:'center',backgroundColor:'#d32f2f',width:100,height:40,borderRadius:10,marginTop: 30,}}><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>GÜNCELLE</Text></TouchableOpacity>
          <Text style={{marginTop:20,color:'gray',fontWeight:'bold',fontSize:15,textAlign:'center',width:'80%'}}>Not: Adı soyadı ve iban bölümünde belirtilen hesap numarasına her ayın 01 ve 15'inde para gönderimi yapılacaktır.</Text>
        <Animated.View style={{zIndex:4,width:width,height:100,backgroundColor:this.state.ibanbilgicolor,position:'absolute',top:this.state.ibantop,borderBottomLeftRadius: 20,borderBottomRightRadius:20,justifyContent: 'center',alignItems: 'center',}}>
                <Text style={{color:this.state.ibanbilgitext,fontWeight:'bold',fontSize:20,textAlign:'center',width:'80%'}}>{this.state.ibanbilgi}</Text>
            </Animated.View>
        </KeyboardAvoidingView>

        </ScrollView>
    );
  }
}
