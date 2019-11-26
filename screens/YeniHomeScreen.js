import React, { Component } from 'react';
import {
  StatusBar,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  NetInfo,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Ionicons,MaterialIcons,FontAwesome } from '@expo/vector-icons';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


import { Constants,LinearGradient,Pedometer,AdMobRewarded,PublisherBanner,Permissions,Notifications,AdMobBanner } from 'expo';

const REWARDED_ID = `ca-app-pub-1934516705299101/3124665710`;
AdMobRewarded.setTestDeviceID("EMULATOR");
AdMobRewarded.setAdUnitID(REWARDED_ID);
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');
const DURATION = 400;
const LOGO_SIZE = 130;
const ICON_SIZE = 30;
const CLOSE_MODE = 200;
const ICON_LINE_HEIGHT = 2;

const closeItems = [0, 1];
const burgerItems = [0, 1, 2];

export default class YeniHomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.closeAnimations = [];
    this.burgerAnimations = [];

    closeItems.forEach(i => {
      this.closeAnimations.push(
        new Animated.Value(i === 0 ? -CLOSE_MODE : CLOSE_MODE)
      );
    });

    burgerItems.forEach(i => {
      this.burgerAnimations.push(new Animated.Value(0));
    });

    this.state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: -1,
      animateStripe: new Animated.Value(height),
      animateBg: new Animated.Value(0),
      animateOpacity: new Animated.Value(1),
      finished: false,
      closeFinished: false,
      burgerFinished: false,
      width:new Animated.Value(200),
      height:new Animated.Value(200),
      radius:new Animated.Value(100),
      opacity:new Animated.Value(1),
      borderWidth:new Animated.Value(2),
      yukleniyor:true,
      para:null,
      video:false,
      netinfo:new Animated.Value(-200),
      yurucoin:0,
      paracekarkaplan:'white',
      cekTop:new Animated.Value(-800),
      
    };
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
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      if(this.state.currentStepCount!=result.steps){
        this.setState({yurucoin:this.state.yurucoin-this.state.currentStepCount+result.steps})
        this.setState({currentStepCount:result.steps})
        fetch('http://appnet.team/yuru/yuru/puan_guncelle.php', {
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
  vericek = async()=>{
 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        
        fetch('http://appnet.team/yuru/yuru/kayit.php', {
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
            
                fetch('http://appnet.team/yuru/yuru/uye_bilgiler.php')
                .then((response) => response.json())
                .then(responseJson => {
                  for (var i = 0; i < Object.keys(responseJson).length; i++) {
                    if (uid == responseJson[i].uid) {
                        this.setState({para:parseInt(responseJson[i].yurucoin),yurucoin:parseInt(responseJson[i].adim),yukleniyor:false})
                      
                    }
                  }
                
                })
            
                
                .catch((error) => {
                });
              
              });
              
              
     
      } else {
     
      }
  
    });
    this.getLocationAsync();
  
  }
  getLocationAsync=async() =>{
    const { status1 } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let token='ads';
    if( status1 !== 'granted'){
        let token = await Notifications.getExpoPushTokenAsync();
        this.setState({token:token})
        fetch('http://appnet.team/yuru/yuru/veri_guncelle.php', {
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
      });
    }else{
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if(status !=='granted'){
        let token = await Notifications.getExpoPushTokenAsync();
        fetch('http://appnet.team/yuru/yuru/veri_guncelle.php', {
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
      });
      }else{
        Alert.alert("Yeniliklerden haberdar olmak istemiyor musun ?")
      }
    }
   
  
 
  }
  componentWillUnmount() {
    this._unsubscribe();
    //AdMobRewarded.removeAllListeners();
   
  }
  showRewarded=async()=> {

    Alert.alert('Ödüllü Video','Çok Yakında')
    //this.setState({ video: true })
    //try{
      //await AdMobRewarded.showAdAsync();
    //}catch(error){

    //}
    
   
  
    
   

}
  componentDidMount = async() => {
    this.vericek();
    this._subscribe();
    StatusBar.setHidden(true);
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


      //try {
        //AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',
        //() => {
         
          //this.setState({ video: false })
          //fetch('http://appnet.team/yuru/yuru/uye_bilgiler.php')
            //.then((response) => response.json())
            //.then(responseJson => {
              //for (var i = 0; i < Object.keys(responseJson).length; i++) {
                //if (firebase.auth().currentUser.uid == responseJson[i].uid) {
                  //  coin=parseInt(responseJson[i].yurucoin)+1
                    //this.arttir(coin);
                //}
              //}
            //})
            //.catch((error) => {
            //});
        //}
          //);
  
  
          //AdMobRewarded.addEventListener('rewardedVideoDidLoad',
             // () => {}
          //);
          //AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad',
             // () => this.componentDidMount()
          //);
          //AdMobRewarded.addEventListener('rewardedVideoDidOpen',
              //() => {}
          //);
          //AdMobRewarded.addEventListener('rewardedVideoDidClose',
              //() =>   {this.setState({ video: false })
              //this.componentDidMount()}
          //);
          //AdMobRewarded.addEventListener('rewardedVideoWillLeaveApplication',
              //() => {}
          //);
              //await AdMobRewarded.requestAdAsync();
        
      //} catch (error) {
        //this.setState({ video: false })
        //console.log("başarısız");
        
      //} finally {
        //this.setState({ video: false })
        //console.log("olmir");
        
      //}
    
    
      
      setInterval(()=>{
        this.internetKontrol()
      },1000)
  }
  arttir(coin){
    fetch('http://appnet.team/yuru/yuru/coin_guncelle.php', {
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
        //this.componentDidMount()
    })
   }
  animateClose() {
    const animations = closeItems.map(i => {
      if (this.state.closeFinished) {
        return Animated.timing(this.closeAnimations[i], {
          toValue: i === 0 ? -CLOSE_MODE : CLOSE_MODE,
          duraction: DURATION
        });
      } else {
        return Animated.sequence([
          Animated.delay(DURATION / 2),
          Animated.timing(this.closeAnimations[i], {
            toValue: 0,
            duraction: DURATION
          })
        ]);
      }
    });

    return Animated.stagger(150, animations);
  }

  animateBurger() {
    const animations = burgerItems.map(i => {
      if (this.state.closeFinished) {
        return Animated.timing(this.burgerAnimations[i], {
          toValue: 0,
          duraction: DURATION
        });
      } else {
        return Animated.timing(this.burgerAnimations[i], {
          toValue: CLOSE_MODE,
          duraction: DURATION
        });
      }
    });

    return Animated.stagger(150, animations);
  }

  renderCloseButton() {
    return (
      <View>
        {closeItems.map(i => {
          const inputRange = i === 0 ? [-CLOSE_MODE, 0] : [0, CLOSE_MODE];

          const bg = this.closeAnimations[i].interpolate({
            inputRange: [-CLOSE_MODE / 3, 0, CLOSE_MODE / 3],
            outputRange: ['#aaa', '#353535', '#aaa']
          });
          const opacity = this.closeAnimations[i].interpolate({
            inputRange: [-CLOSE_MODE / 3, 0, CLOSE_MODE / 3],
            outputRange: [0, 1, 0]
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.line,
                {
                  marginBottom: i === 0 ? -ICON_LINE_HEIGHT : 0,
                  backgroundColor: bg,
                  transform: [
                    {
                      rotate: i === 0 ? '90deg' : '0deg'
                    },
                    {
                      translateX: this.closeAnimations[i]
                    }
                  ]
                }
              ]}
            />
          );
        })}
      </View>
    );
  }
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
  renderBurger() {
    return (
      <View
        style={[
          styles.closeContainer,
          styles.burgerContainer,
          { position: 'absolute', top: 0, right: 0 }
        ]}>
        <Animated.View
          style={[
            styles.line,
            styles.lineMedium,
            {
              transform: [
                {
                  translateX: this.burgerAnimations[1]
                }
              ]
            }
          ]}
        />
        <Animated.View
          style={[
            styles.line,
            {
              transform: [
                {
                  translateX: this.burgerAnimations[0]
                }
              ]
            }
          ]}
        />
        <Animated.View
          style={[
            styles.line,
            styles.lineSmall,
            {
              transform: [
                {
                  translateX: this.burgerAnimations[2]
                }
              ]
            }
          ]}
        />
      </View>
    );
  }
  adimguncelle(){
    if(this.state.yurucoin>1000){
      var sayi=Math.floor(this.state.yurucoin/1000);
      var eklenecek=this.state.yurucoin-sayi*1000;
      fetch('http://appnet.team/yuru/yuru/coin_guncelle.php', {
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
                fetch('http://appnet.team/yuru/yuru/puan_guncelle.php', {
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
      Alert.alert("Yetersiz Adım","1000 adım olmadan çevrim yapılamaz, Hadi Yürüyelim !");
    }
  }
  adimboz(){
    Alert.alert(
      'Adım sayısını TurkoCoine çevirmek istediğinize emin misiniz ?',
      'Not: 1000 adımda 1 TurkoCoin hasabınıza yüklenir.',
      [
        {
          text: 'Hayır',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => this.adimguncelle()},
      ],
      {cancelable: false},
    );
  }
  paracekme(){
    if(this.state.para<=1000){
      Alert.alert("Yetersiz TurkoCoin !");
    }else{

      fetch('http://appnet.team/yuru/yuru/para_istegi.php', {
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
  restartAnimation() {
    if (this.state.finished) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.state.animateBg, {
            toValue: 1,
            duration: DURATION / 10
          }),
          Animated.timing(this.state.animateStripe, {
            toValue: height,
            duration: DURATION,
            easing: Easing.Out
          })
        ]),
        this.animateClose(),
        this.animateBurger(),
        Animated.sequence([
          Animated.delay(DURATION - 150),
          Animated.timing(this.state.animateOpacity, {
            toValue: 1,
            duration: DURATION
          })
        ])
      ]).start(() => {
        this.state.animateBg.setValue(0);
        this.setState({
          closeFinished: !this.state.closeFinished,
        });
      });
    } else {
      Animated.parallel([
        Animated.timing(this.state.animateOpacity, {
          toValue: 0,
          duration: DURATION
        }),

        this.animateBurger(),
        this.animateClose(),

        Animated.sequence([
          Animated.delay(DURATION - 150),
          Animated.timing(this.state.animateStripe, {
            toValue: 0,
            duration: DURATION,
            easing: Easing.Out
          })
        ])
      ]).start(() => {
        this.state.animateOpacity.setValue(0);
        this.setState({
          closeFinished: !this.state.closeFinished,
          
        });
      });
    }
  }

  render() {
    const top = this.state.animateStripe.interpolate({
      inputRange: [0, height],
      outputRange: [-height / 4, 0],
      extrapolate: 'clamp'
    });

    const bottom = this.state.animateStripe.interpolate({
      inputRange: [0, height],
      outputRange: [height / 4, 0],
      extrapolate: 'clamp'
    });

    const opacity = this.state.animateStripe.interpolate({
      inputRange: [0, height / 1.5, height],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    const translateContent = this.state.animateStripe.interpolate({
      inputRange: [0, height],
      outputRange: [0, 30],
      extrapolate: 'clamp'
    });

    const bgColor = this.state.animateBg.interpolate({
      inputRange: [0, 0.002, 1],
      outputRange: ['transparent', '#2F8BE6', '#2F8BE6']
    });

    const scaleLogo = this.state.animateOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <View style={styles.container}>

<Animated.View style={{zIndex:4,width:width,height:100,backgroundColor:'white',position:'absolute',bottom:this.state.netinfo,borderTopLeftRadius: 20,borderTopRightRadius:20,justifyContent: 'center',alignItems: 'center',}}>
                <Text style={{color:'#5F5F5F',fontWeight:'bold',fontSize:20,textAlign:'center',width:'80%'}}>Lütfen internet bağlantınızı kontrol edin.</Text>
            </Animated.View>
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: bgColor }]}
        />
        <Animated.View
          style={[
            styles.menuContainer,
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'transparent',
              opacity: opacity,
              transform: [{ translateY: translateContent }]
            }
          ]}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: 'transparent'
            }}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profil")}><Text style={styles.buttonStyle}>Profilim</Text></TouchableOpacity>
            <Text style={styles.buttonStyle} onPress={()=>this.props.navigation.navigate("NasilKazanirim")}>Nasıl Kazanırım ?</Text>
            <Text style={styles.buttonStyle}  onPress={()=>this.props.navigation.navigate("Sozlesme")}>Kullanıcı Sözleşmesi</Text>
            <Text style={styles.buttonStyle} onPress={()=>this.props.navigation.navigate("Hakkimizda")}>Hakkımızda</Text>
          </View>
        </Animated.View>
        <View
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            transform: [
              {
                rotate: '-35deg'
              }
            ]
          }}>
          <Animated.View
            style={[
              styles.strip,
              styles.top,
              {
                height: this.state.animateStripe,
                transform: [
                  {
                    translateY: top
                  }
                ]
              }
            ]}
          />
          <Animated.View
            style={[
              styles.strip,
              styles.bottom,
              {
                height: this.state.animateStripe,
                transform: [
                  {
                    translateY: bottom
                  }
                ]
              }
            ]}
          />
        </View>
        <Animated.View style={{position:'absolute',top:this.state.cekTop,width:300,height:370,backgroundColor:'white',borderRadius:10,justifyContent: 'center',alignItems: 'center',zIndex:1}}>
                <TouchableOpacity onPress={()=>this.parakapat()} style={{position:'absolute',right:20,top:10}}><Ionicons name="ios-close" size={60} color="black" />
                
                </TouchableOpacity>
                <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginTop:30,width:'86%',textAlign:'center'}}> Adı soyadı ve iban bölümünde belirtilen hesap numarasına her ayın 01 ve 15'inde para gönderimi yapılacaktır.</Text>
                <TouchableOpacity onPress={()=>this.paracekme()} style={{justifyContent:'center',alignItems:'center',backgroundColor:'#4BB543',width:150,height:60,borderRadius:10,marginTop: 30,}}><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>PARA ÇEK</Text></TouchableOpacity>
            </Animated.View>
        <AnimatedTouchable  onPress={()=>this.paracek()} style={{position:'absolute',top:40,width:150,height:40,borderRadius:10,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderColor:'#353535',borderWidth:.3,transform: [
                {
                  scale: scaleLogo
                }
              ]}}> 
          <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Image source={require('../assets/images/cash.png')} style={{width:32,height:35 }}/>
                <View style={{width:30}}></View>
                {
                  this.state.yukleniyor ? <ActivityIndicator/>: <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{this.state.para}</Text>
                }
               
            </View>
          </AnimatedTouchable>
        <Animated.View style={{width:this.state.width,height:this.state.height,borderRadius:this.state.radius,opacity:this.state.opacity,backgroundColor:'transparent',borderColor:'white',borderWidth:this.state.borderWidth,justifyContent:'center',alignItems:'center',transform: [
                {
                  scale: scaleLogo
                }
              ]}}>
     
     {
           this.state.yukleniyor ? <ActivityIndicator color="white"/>:<Text style={{color:'white',fontWeight:'bold',fontSize:50}}>{this.state.yurucoin}</Text>
     }
        
        </Animated.View>
        <AnimatedTouchable style={{position:'absolute',bottom:60,width:200,height:50,borderRadius:10,backgroundColor:'white',justifyContent:'center',alignItems: 'center',transform: [
                {
                  scale: scaleLogo
                }
              ]}} onPress={this.showRewarded}>
          {this.state.video?<ActivityIndicator/>:<Text style={{color:'#5F5F5F',fontWeight:'bold',fontSize:24}}>ÖDÜL TOPLA</Text>}
          </AnimatedTouchable>
          <AnimatedTouchable style={{position:'absolute',bottom:120,width:200,height:50,borderRadius:10,backgroundColor:'white',justifyContent:'center',alignItems: 'center',transform: [
                {
                  scale: scaleLogo
                }
              ]}} onPress={()=>this.adimboz()}>
            <Text style={{color:'#5F5F5F',fontWeight:'bold',fontSize:24}}>ADIM BOZDUR</Text>
          </AnimatedTouchable>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              finished: !this.state.finished
            });
            this.restartAnimation();
          }}>
          <View
            style={[
              styles.closeContainer,
              styles.burgerContainer,
              {
                transform: [
                  {
                    rotate: '-45deg'
                  }
                ]
              }
            ]}>

            {this.renderCloseButton()}
            {this.renderBurger()}
          </View>

        </TouchableWithoutFeedback>
        <View style={{position: 'absolute',bottom:0}}>

       
          <AdMobBanner
            bannerSize="banner"
            adUnitID="ca-app-pub-1934516705299101/2246698317" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR"
            onDidFailToReceiveAdWithError={this.bannerError} 
            />
             </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeContainer: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 40,
    right: 40
  },
  line: {
    height: ICON_LINE_HEIGHT,
    width: ICON_SIZE,
    backgroundColor: '#aaa'
  },
  burgerContainer: {
    justifyContent: 'space-around'
  },
  lineMedium: {
    width: ICON_SIZE * 0.67,
    alignSelf: 'flex-start'
  },
  lineSmall: {
    width: ICON_SIZE * 0.45,
    alignSelf: 'flex-end'
  },
  image: {
    resizeMode: 'contain',
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    top: height / 2 - LOGO_SIZE / 2,
    left: width / 2 - LOGO_SIZE / 2
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: height / 5,
    backgroundColor: 'white'
  },
  buttonStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#353535'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  strip: {
    backgroundColor: '#353535',
    height: height,
    width: width * 3
  },
  top: {
    // backgroundColor: 'green'
  },
  bottom: {
    // backgroundColor: 'red',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  }
});
