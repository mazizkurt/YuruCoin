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

const REWARDED_ID = `ca-app-pub-5888738492049923/6092023370`;
AdMobRewarded.setTestDeviceID("EMULATOR");
AdMobRewarded.setAdUnitID(REWARDED_ID);
import firebase from 'firebase';


export default class HomeScreen extends React.Component {
 
  constructor(props){

    super(props);
    this.state={
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: -1,
      width:new Animated.Value(200),
      height:new Animated.Value(200),
      radius:new Animated.Value(100),
      opacity:new Animated.Value(1),
      borderWidth:new Animated.Value(2),
      cekTop:new Animated.Value(-800),
      para:null,
      video:false,
      netinfo:new Animated.Value(-200),
      yukleniyor:true,
      yurucoin:0,
      profilTop:new Animated.Value(50),
      profilWidth:new Animated.Value(40),
      profilHeight:new Animated.Value(40),
      profilRight:new Animated.Value(30),
      profilRadius:new Animated.Value(20),
      profilTiklandi:false,
      adisoyadi:'',
      iban:'',
      ibanbilgi:null,
      ibantop:new Animated.Value(-200),
      ibanbilgitext:'#5F5F5F',
      ibanbilgicolor:'white',
      reklamTop:new Animated.Value(-600),
      hakkindaTop:new Animated.Value(50),
      hakkindaWidth:new Animated.Value(40),
      hakkindaHeight:new Animated.Value(40),
      hakkindaLeft:new Animated.Value(30),
      hakkindaRadius:new Animated.Value(20),
      shop_right:new Animated.Value(-width),
      liderlik_left:new Animated.Value(width),
      appState: AppState.currentState,
      token:''
    }
    
  }
  static navigationOptions = {
    header: null
}
  getLocationAsync=async() =>{
    const { status1 } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let token='ads';
    if( status1 !== 'granted'){
        let token = await Notifications.getExpoPushTokenAsync();
        this.setState({token:token})
        fetch('http://azizcoder.info.tr/yuru/veri_guncelle.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            uid: firebase.auth().currentUser.uid,

            token: token,


          })

        }).then((response) => response.json())
              .then((responseJson) => {

        //Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });
    }else{
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if(status !=='granted'){
        let token = await Notifications.getExpoPushTokenAsync();
        fetch('http://azizcoder.info.tr/yuru/veri_guncelle.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            uid: firebase.auth().currentUser.uid,

            token: token,

          })

        }).then((response) => response.json())
              .then((responseJson) => {

        //Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });
      }else{
        Alert.alert("Yeniliklerden haberdar olmak istemiyor musun ?")
      }
    }
   
  
 
  }
vericek = async()=>{
 
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      
      fetch('http://azizcoder.info.tr/yuru/kayit.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          uid: uid,
          token:this.state.token
          
      
        })
      
      }).then((response) => response.json())
            .then((responseJson) => {
              //İlk kayıt
      
            }).catch((error) => {
              //Daha önce bu kullanıcı kayıtlıysa
          
              fetch('http://azizcoder.info.tr/yuru/uye_bilgiler.php')
              .then((response) => response.json())
              .then(responseJson => {
                for (var i = 0; i < Object.keys(responseJson).length; i++) {
                  if (uid == responseJson[i].uid) {
                      this.setState({para:parseInt(responseJson[i].yurucoin),yurucoin:parseInt(responseJson[i].adim),yukleniyor:false})
                    
                  }
                }
              
              })
          
              
              .catch((error) => {
                console.log(error)
              });
            
            });
            setTimeout(() => {
              Animated.spring(this.state.reklamTop, {
                toValue: height/2-200,
                duration: 400,
                easing:Easing.bounce,
                friction:3
              }).start()
            }, 2000);
            
   
    } else {
   
    }

  });
  this.getLocationAsync();

}
internetKontrol(){
  NetInfo.getConnectionInfo().then((connectionInfo) => {
    if(connectionInfo.type=='none'){
      Animated.spring(this.state.netinfo, {
        toValue: 0,
        duration: 400,
        easing:Easing.bounce,
        friction:3
      }).start()
    }else{
      Animated.timing(this.state.netinfo, {
        toValue: -200,
        duration: 300,
        easing:Easing.back(),
      }).start()
    }
  });
  
}
  componentDidMount = async () =>{
    this.vericek()
    AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',
    () => {
     
      this.setState({ video: false })
      fetch('http://azizcoder.info.tr/yuru/uye_bilgiler.php')
        .then((response) => response.json())
        .then(responseJson => {
          for (var i = 0; i < Object.keys(responseJson).length; i++) {
            if (firebase.auth().currentUser.uid == responseJson[i].uid) {
                coin=parseInt(responseJson[i].yurucoin)+1
                this.arttir(coin);
            }
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
);
AdMobRewarded.addEventListener('rewardedVideoDidLoad',
    () => console.log('Hazır')
);
AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad',
    () => this.componentDidMount()
);
AdMobRewarded.addEventListener('rewardedVideoDidOpen',
    () => console.log('Video Açıldı')
);
AdMobRewarded.addEventListener('rewardedVideoDidClose',
    () =>   {this.setState({ video: false })
    this.componentDidMount()}
);
AdMobRewarded.addEventListener('rewardedVideoWillLeaveApplication',
    () => console.log('interstitialDidLoad')
);
    await AdMobRewarded.requestAdAsync();
    
    
    setInterval(()=>{
      this.internetKontrol()
    },1000)
 
   


    this._subscribe();

   
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.width, {
            toValue: 250,
            duration: 700,
           easign:Easing.bounce
            
          }),
        
          Animated.timing(this.state.height, {
            toValue: 250,
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
            toValue: 200,
            duration: 500,
          
          }),
          Animated.timing(this.state.width, {
            toValue: 200,
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
        iterations: 10000
      }
    ).start()
  }
 arttir(coin){
  fetch('http://azizcoder.info.tr/yuru/coin_guncelle.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid: firebase.auth().currentUser.uid,
      coin: coin,
    })

  }).then(()=>{
    this.setState({video:false,para:coin})
      this.componentDidMount()
  })
 }
  showRewarded=async()=> {
    console.log("Merhba");


    this.setState({ video: true })
    await AdMobRewarded.showAdAsync();
   
    

    
   
    {/*
       fetch('http://azizcoder.info.tr/yuru/uye_bilgiler.php')
        .then((response) => response.json())
        .then(responseJson => {
          for (var i = 0; i < Object.keys(responseJson).length; i++) {
            if (firebase.auth().currentUser.uid == responseJson[i].uid) {
                coin=parseInt(responseJson[i].yurucoin)+1
                fetch('http://azizcoder.info.tr/yuru/coin_guncelle.php', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    uid: firebase.auth().currentUser.uid,
                    coin: coin,
                  })
            
                }).then(()=>{
                    this.componentDidMount()
                })
            }
          }
        })
        .catch((error) => {
          console.log(error)
        });
    */}
  
    
   

}


  componentWillUnmount() {
    this._unsubscribe();
    AdMobRewarded.removeAllListeners();
   
  }
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      if(this.state.currentStepCount!=result.steps){
        this.setState({yurucoin:this.state.yurucoin-this.state.currentStepCount+result.steps})
        this.setState({currentStepCount:result.steps})
        fetch('http://azizcoder.info.tr/yuru/puan_guncelle.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: firebase.auth().currentUser.uid,
            adim: this.state.yurucoin,
          })
    
        })
      }
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  paracek(){
    
    if(this.state.currentStepCount<1000){
      Animated.spring(this.state.cekTop, {
        toValue: height/2-200,
        duration: 400,
        easing:Easing.bounce
      }).start()

    }
  }
  parakapat(){
    Animated.timing(this.state.cekTop, {
      toValue: -800,
      duration: 200,
      easing:Easing.back()
    
    }).start()

  }
  adimguncelle(){
    if(this.state.yurucoin>1000){
      var sayi=Math.floor(this.state.yurucoin/1000);
      var eklenecek=this.state.yurucoin-sayi*1000;
      fetch('http://azizcoder.info.tr/yuru/coin_guncelle.php', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  uid: firebase.auth().currentUser.uid,
                  coin: this.state.para+sayi,
                })
          
              }).then(()=>{
                fetch('http://azizcoder.info.tr/yuru/puan_guncelle.php', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    uid: firebase.auth().currentUser.uid,
                    adim: eklenecek,
                  })
            
                }).then(()=>{
                  this.componentDidMount()
                })
                 
              })
    }else{
      Alert.alert("1000 adım olmadan çevrim yapılamaz, Hadi Yürüyelim !");
    }
  }
  adimboz(){
    Alert.alert(
      'Adım sayısını TurkoCoine çevirmek istediğinize emin misiniz ?',
      'Not: 1000 adımda 1 TurkoCoin hasabınıza yüklenir.',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => this.adimguncelle()},
      ],
      {cancelable: false},
    );
  }
  profil(){
    
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.profilTop, {
            toValue: 0,
            duration: 200,
           easign:Easing.bounce,
           friction:3
            
          }),
        
          Animated.timing(this.state.profilRight, {
            toValue: 0,
            duration: 200,
            easign:Easing.bounce,
            friction:3


          }),
       
        ]),
        
        Animated.parallel([
          Animated.timing(this.state.profilHeight, {
            toValue: height,
            duration: 200,
          
          }),
          Animated.timing(this.state.profilWidth, {
            toValue: width,
            duration: 200,
          
          }),
          Animated.timing(this.state.profilRadius, {
            toValue: 0,
            duration: 200,
          
          }),
         
        ])
      ]).start(()=>{    this.setState({profilTiklandi:true})})
  
  }
  profilkapat(){
    this.setState({profilTiklandi:false})
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.profilHeight, {
          toValue: 40,
          duration: 200,
        
        }),
        Animated.timing(this.state.profilWidth, {
          toValue: 40,
          duration: 200,
        
        }),
        Animated.timing(this.state.profilRadius, {
          toValue: 20,
          duration: 200,
        
        }),
       
      ]),
      Animated.parallel([
       
          Animated.timing(this.state.profilTop, {
            toValue: 50,
            duration: 100,
            
          }),
        
          Animated.timing(this.state.profilRight, {
            toValue: 30,
            duration: 100,
  
  
          }),
       
    

     
      ]),
 
    ]).start(()=>this.setState({profilTiklandi:false}))
  }
  iban=()=>{

      if(this.state.adisoyadi!=''){
        if(this.state.iban!=''){
          console.log(this.state.adisoyadi);
          console.log(this.state.iban);
          console.log(firebase.auth().currentUser.uid);
          fetch('http://azizcoder.info.tr/yuru/iban_guncelle.php', {
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
  reklamKapat(){
    Animated.timing(this.state.reklamTop, {
      toValue: -600,
      duration: 400,
      easing:Easing.back(),
    }).start()
  }
  paracekme(){
    if(this.state.para<5000){
      Alert.alert("Yetersiz TurkoCoin !");
    }else{

      fetch('http://azizcoder.info.tr/yuru/para_istegi.php', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    uid: firebase.auth().currentUser.uid,
                    istek: 1,
                  })
            
                }).then(()=>{
                  Alert.alert("Tebrikler ! TurkoCoin işleminiz yetkililer tarafından incelenip en kısa zamanda belirtilen IBAN numarasına gönderilecektir. Eğer iban belirtmeyi unuttuysanız güncellemek için profil sayfasını ziyaret edebilirsiniz.")
                  this.componentDidMount()
                })
    }
  }
  hakkinda(){
  
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.hakkindaTop, {
          toValue: 110,
          duration: 50,
    
     
          
        }),
  
      ]),
      
      Animated.parallel([
        Animated.timing(this.state.hakkindaHeight, {
          toValue: 400,
          duration: 200,
      

        
        }),
        Animated.timing(this.state.hakkindaWidth, {
          toValue: width-60,
          duration: 200,
    
         

        }),
        Animated.timing(this.state.hakkindaRadius, {
          toValue: 5,
          duration: 200,
          

        }),
       
      ])
    ]).start(()=>{this.setState({hakkinda:true})})
    
  }
  hakkindaKapat(){
    this.setState({hakkinda:false})
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.hakkindaHeight, {
          toValue: 40,
          duration: 400,
          easing:Easing.back()
        
        }),
        Animated.timing(this.state.hakkindaWidth, {
          toValue: 40,
          duration: 400,
          easing:Easing.back()

        }),
        Animated.timing(this.state.hakkindaRadius, {
          toValue: 20,
          duration: 200,
          easing:Easing.back()

        }),
       
      ]),
      Animated.parallel([
        Animated.timing(this.state.hakkindaTop, {
          toValue: 50,
          duration: 100,
    
     
          
        }),
  
      ]),
      
   
    ]).start()
  }
  shop_ac(){
  
    
        Animated.timing(this.state.shop_right, {
          toValue: 0,
          duration: 1000,
          easing:Easing.bounce,
          friction:1
    
     
          
        }).start()
    
  }
  shop_kapa(){
  
    console.log("asdasd")
    Animated.timing(this.state.shop_right, {
      toValue: -width,
      duration: 500,
      easing:Easing.back(),

 
      
    }).start()

  }
  liderlik_tablosu(){
  
    
    Animated.timing(this.state.liderlik_left, {
      toValue: 0,
      duration: 1000,
      easing:Easing.bounce,
      friction:1

 
      
    }).start()

}
liderlik_tablosu_kapa(){

Animated.timing(this.state.liderlik_left, {
  toValue: width,
  duration: 500,
  easing:Easing.back(),


  
}).start()

}
  urun_incele(adi){
    
  }
  render() {
    return (
      <Animated.View style={styles.container}>
      {this.state.profilTiklandi?null: <StatusBar backgroundColor="white" barStyle="light-content" />}
      
      
          <LinearGradient
            colors={['#eb3349','#f45c43']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: height+100,
              
            }}
          />
        <TouchableOpacity onPress={()=>this.hakkinda()} style={{zIndex:2,position:'absolute',top:50,left:30,width:40,height:40,borderRadius:20,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}> 
              <Ionicons name="md-information" size={35} color="black"/>   
          </TouchableOpacity>
            <Animated.View style={{zIndex:1,position:'absolute',top:this.state.hakkindaTop,left:this.state.hakkindaLeft,width:this.state.hakkindaWidth,height:this.state.hakkindaHeight,borderRadius:this.state.hakkindaRadius,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
              {this.state.hakkinda?<View><TouchableOpacity style={{position:'absolute',top:-120,left:200}} onPress={()=>this.hakkindaKapat()}><Ionicons name="ios-close" size={60} color="black" /></TouchableOpacity>
                <Text style={{textAlign:'center',color:'gray',fontWeight:'bold',fontSize:25,textAlign:'center'}}>Kampanya</Text>
                <Text style={{textAlign:'center',color:'gray',fontWeight:'bold',fontSize:20,marginTop: 30,}}>★ 1000 TurkoCoin 10 TL</Text>
                <Text style={{textAlign:'center',color:'gray',fontWeight:'bold',fontSize:20,}}>★ 5000 TurkoCoin 50 TL</Text>
                <Text style={{textAlign:'center',color:'gray',fontWeight:'bold',fontSize:20,}}>★ 6000 TurkoCoin 100 TL</Text>
                <Text style={{textAlign:'center',color:'gray',fontWeight:'bold',fontSize:20}}>★ 7000 TurkoCoin 200 TL</Text>


              </View>:<View></View>}
            </Animated.View>





          <TouchableOpacity onPress={()=>this.paracek()} style={{position:'absolute',top:50,width:150,height:40,borderRadius:10,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}> 
          <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Image source={require('../assets/images/cash.png')} style={{width:50,height:50 }}/>
                <View style={{width:30}}></View>
                {
                  this.state.yukleniyor ? <ActivityIndicator/>: <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{this.state.para}</Text>
                }
               
            </View>
          </TouchableOpacity>


          <Animated.View style={{zIndex:3,position:'absolute',right:this.state.profilRight,top:this.state.profilTop,width:this.state.profilWidth,height:this.state.profilHeight,borderRadius:this.state.profilRadius,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
              
          {
            this.state.profilTiklandi?
<ScrollView contentContainerStyle={{flex:1}} style={{flex:1}}>
               <KeyboardAvoidingView style={{zIndex:4,flex:1,justifyContent:'center',alignItems:'center'}} behavior="padding">
               
                <TouchableOpacity onPress={()=>this.profilkapat()} style={{position:'absolute',top:50,right:20,justifyContent:'center',alignItems:'center',zIndex:5}}><Ionicons name="ios-close" size={60} color="black" /></TouchableOpacity>
                <Image  source={require('../assets/images/profil.png')} style={{width:100,height:100}}/> 
                <TextInput style={{width:'55%',height:50,borderBottomWidth:1,borderBottomColor:'#DDDDDD',padding:10,fontSize:15,marginTop:10,textAlign:'center',fontWeight:'bold'}} onChangeText={(adisoyadi) => this.setState({adisoyadi})} placeholder="ADI VE SOYADI" keyboardAppearance="dark"   returnKeyType="previous"/>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <TextInput style={{width:'12%',height:50,borderBottomWidth:1,borderBottomColor:'#DDDDDD',padding:10,fontSize:15,fontWeight:'bold'}} placeholder="TR" editable={false} selectTextOnFocus={false}/>
                  <View style={{width:'3%'}}></View>
                  <TextInput style={{width:'40%',height:50,borderBottomWidth:1,borderBottomColor:'#DDDDDD',padding:10,fontSize:15,fontWeight:'bold'}} placeholder="IBAN" onChangeText={(iban) => this.setState({iban})} keyboardType="number-pad" keyboardAppearance="dark"/>
                </View>
                <TouchableOpacity onPress={()=>this.iban()} style={{justifyContent:'center',alignItems:'center',backgroundColor:'#d32f2f',width:100,height:40,borderRadius:10,marginTop: 30,}}><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>GÜNCELLE</Text></TouchableOpacity>
               
               </KeyboardAvoidingView>
               <Text style={{color:'gray',fontWeight:'bold',fontSize:15,marginBottom:30}}>Not: Adı soyadı ve iban bölümünde belirtilen hesap numarasına her ayın 01 ve 15'inde para gönderimi yapılacaktır.</Text>

               </ScrollView>
            :<TouchableOpacity onPress={()=>this.profil()} style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}> 
      

            <Ionicons name="md-person" size={25} color="black"/>   

             </TouchableOpacity>
          }
        
          </Animated.View>
          
          
          
          <Animated.View style={{width:this.state.width,height:this.state.height,borderRadius:this.state.radius,opacity:this.state.opacity,backgroundColor:'transparent',borderColor:'white',borderWidth:this.state.borderWidth,justifyContent:'center',alignItems:'center'}}>
     
            {
                  this.state.yukleniyor ? <ActivityIndicator color="white"/>:<Text style={{color:'white',fontWeight:'bold',fontSize:50}}>{this.state.yurucoin}</Text>
            }
               
          </Animated.View>
          <TouchableOpacity style={{position:'absolute',bottom:30,width:200,height:50,borderRadius:10,backgroundColor:'white',justifyContent:'center',alignItems: 'center',}} onPress={this.showRewarded}>
          {this.state.video?<ActivityIndicator/>:<Text style={{color:'#5F5F5F',fontWeight:'bold',fontSize:24}}>ÖDÜL TOPLA</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={{position:'absolute',bottom:90,width:200,height:50,borderRadius:10,backgroundColor:'white',justifyContent:'center',alignItems: 'center',}} onPress={()=>this.adimboz()}>
          <Text style={{color:'#5F5F5F',fontWeight:'bold',fontSize:24}}>ADIM BOZDUR</Text>
          </TouchableOpacity>
            <Animated.View style={{position:'absolute',top:this.state.cekTop,width:300,height:370,backgroundColor:'white',borderRadius:10,justifyContent: 'center',alignItems: 'center',}}>
                <TouchableOpacity onPress={()=>this.parakapat()} style={{position:'absolute',right:20,top:10}}><Ionicons name="ios-close" size={60} color="black" />
                
                </TouchableOpacity>
                <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginTop:30,width:'86%',textAlign:'center'}}> Adı soyadı ve iban bölümünde belirtilen hesap numarasına her ayın 01 ve 15'inde para gönderimi yapılacaktır.</Text>
                <TouchableOpacity onPress={()=>this.paracekme()} style={{justifyContent:'center',alignItems:'center',backgroundColor:'#4BB543',width:150,height:60,borderRadius:10,marginTop: 30,}}><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>PARA ÇEK</Text></TouchableOpacity>
            </Animated.View>
            <Animated.View style={{zIndex:4,width:width,height:100,backgroundColor:'white',position:'absolute',top:this.state.netinfo,borderBottomLeftRadius: 20,borderBottomRightRadius:20,justifyContent: 'center',alignItems: 'center',}}>
                <Text style={{color:'#5F5F5F',fontWeight:'bold',fontSize:20,textAlign:'center',width:'80%'}}>Lütfen internet bağlantınızı kontrol edin.</Text>
            </Animated.View>

            <Animated.View style={{zIndex:4,width:width,height:100,backgroundColor:this.state.ibanbilgicolor,position:'absolute',top:this.state.ibantop,borderBottomLeftRadius: 20,borderBottomRightRadius:20,justifyContent: 'center',alignItems: 'center',}}>
                <Text style={{color:this.state.ibanbilgitext,fontWeight:'bold',fontSize:20,textAlign:'center',width:'80%'}}>{this.state.ibanbilgi}</Text>
            </Animated.View>

            <Animated.View style={{zIndex:4,width:width-50,height:350,backgroundColor:'white',position:'absolute',top:this.state.reklamTop,borderRadius:5,justifyContent: 'center',alignItems: 'center',}}>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',position:'absolute',top:10}}>
                  <View style={{width:'33%'}}></View>
                  <Text style={{color:'gray',fontWeight:'bold',fontSize:20,textAlign:'center',width:'33%'}}>Sponsor</Text>
                  <View style={{width:'33%'}}></View>
                </View>
                <TouchableOpacity onPress={()=>this.reklamKapat()} style={{position: 'absolute',right:30,top:5}}><Ionicons name="ios-close" size={35} color="black"/></TouchableOpacity>
                <PublisherBanner
                  bannerSize="mediumRectangle"
                  adUnitID="ca-app-pub-5888738492049923/6842121970" // Test ID, Replace with your-admob-unit-id
                  testDeviceID="EMULATOR"
                  onDidFailToReceiveAdWithError={this.bannerError}
                  onAdMobDispatchAppEvent={this.adMobEvent} 
                />

            </Animated.View>
            <TouchableOpacity onPress={()=>this.shop_ac()} style={{zIndex:1,position:'absolute',top:height/2-30,right:0,width:40,height:40,borderTopLeftRadius:20,borderBottomLeftRadius:20,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}> 
              <FontAwesome name="shopping-cart" size={20} color="black"/>   
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.liderlik_tablosu()} style={{zIndex:1,position:'absolute',top:height/2-30,left:0,width:40,height:40,borderTopRightRadius:20,borderBottomRightRadius:20,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}> 
              <Ionicons name="ios-stats" size={20} color="black"/>   
          </TouchableOpacity>
          <Animated.View style={{zIndex:3,width:width,height:height,position: 'absolute',right:this.state.shop_right,top:0,backgroundColor:'white'}}>
          <LinearGradient
            colors={['#1A2980','#26D0CE']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: height+100,
              
            }}
          />
            <View style={{position: 'absolute',top:0,left:0,width:'100%',height:100,flexDirection:'row',justifyContent:'space-between',alignItems:'center',zIndex:3,padding:10}}>
              <TouchableOpacity onPress={()=>this.shop_kapa()} style={{zIndex:3,padding:5}}><Ionicons  name="ios-close" color="white" size={50}/></TouchableOpacity>
              <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:25,textAlign:'center'}}>TurkoCoin Market</Text>
              <View></View>
            </View>
           
              
              <View style={{flex:1,marginTop:100,justifyContent:'center',alignItems:'center'}}>
              {/*
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                    <TouchableOpacity onPress={this.urun_incele('imac')} style={{width:'32%',height:120,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'white'}}>
                          <Image source={require('../assets/images/imac.png')} style={{width:50,height:50}}/>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>IMAC</Text>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>1 Mil. Coin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.urun_incele('imac')} style={{width:'32%',height:120,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'white'}}>
                          <Image source={require('../assets/images/tv.jpg')} style={{width:50,height:50}}/>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>TV</Text>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>1 Mil. Coin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.urun_incele('imac')} style={{width:'32%',height:120,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'white'}}>
                          <Image source={require('../assets/images/imac.png')} style={{width:50,height:50}}/>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>IMAC</Text>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>1 Mil. Coin</Text>
                    </TouchableOpacity>
                 
                </View>
                */}
                <View style={{width:100,height:100,borderRadius:50,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                  <FontAwesome name="shopping-cart" size={40} color="black"/>   

                </View>
                 <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:25,textAlign:'center',marginTop:30,}}>ÇOK YAKINDA</Text>
              </View>
          </Animated.View>
          <Animated.View style={{zIndex:3,width:width,height:height,position: 'absolute',right:this.state.liderlik_left,top:0,backgroundColor:'white'}}>
          <LinearGradient
            colors={['#2b5876','#4e4376']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: height+100,
              
            }}
          />
            <View style={{position: 'absolute',top:0,left:0,width:'100%',height:100,flexDirection:'row',justifyContent:'space-between',alignItems:'center',zIndex:3,padding:10}}>
              <TouchableOpacity onPress={()=>this.liderlik_tablosu_kapa()} style={{zIndex:3,padding:5}}><Ionicons  name="ios-close" color="white" size={50}/></TouchableOpacity>
              <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:25,textAlign:'center'}}>Liderlik Tablosu</Text>
              <View></View>
            </View>
           
              
              <View style={{flex:1,marginTop:100,justifyContent:'center',alignItems:'center'}}>
              {/*
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                    <TouchableOpacity onPress={this.urun_incele('imac')} style={{width:'32%',height:120,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'white'}}>
                          <Image source={require('../assets/images/imac.png')} style={{width:50,height:50}}/>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>IMAC</Text>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>1 Mil. Coin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.urun_incele('imac')} style={{width:'32%',height:120,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'white'}}>
                          <Image source={require('../assets/images/tv.jpg')} style={{width:50,height:50}}/>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>TV</Text>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>1 Mil. Coin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.urun_incele('imac')} style={{width:'32%',height:120,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'white'}}>
                          <Image source={require('../assets/images/imac.png')} style={{width:50,height:50}}/>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>IMAC</Text>
                          <Text style={{color:'#5F5F5F',fontWeight:'bold'}}>1 Mil. Coin</Text>
                    </TouchableOpacity>
                 
                </View>
                */}
                <View style={{width:100,height:100,borderRadius:50,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                  <FontAwesome name="shopping-cart" size={40} color="black"/>   

                </View>
                 <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:25,textAlign:'center',marginTop:30,}}>ÇOK YAKINDA</Text>
              </View>
          </Animated.View>
      </Animated.View>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
 
});
