import React, { Component } from 'react';
import { View, Text ,TouchableOpacity} from 'react-native';
import { Ionicons,MaterialIcons,FontAwesome } from '@expo/vector-icons';

export default class NasilKazanirimScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ecf0f1'}}>
           <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{position:'absolute',top:50,left:20,justifyContent:'center',alignItems:'center',zIndex:5}}><Ionicons name="ios-arrow-back" size={35} color="black" /></TouchableOpacity>
            <Text style={{color:'#555555',fontWeight:'bold',fontSize:20,textAlign:'center',}}> Nasıl Kazanırım ? </Text>
            <Text style={{color:'gray',fontWeight:'bold',fontSize:18,textAlign:'center',marginTop:20,width:'90%'}}> Eğer kazanmak istiyorsan yürüyüşüne konsantre olmanı öneririm. Yok ben yürümem diyorsan video izleyip coin kazanabilirsin. Elinde telefon spor yapıyorsan çok şanslısın sadece telefonu cebine koyup koşman çok mantıklı tabi YuruCoin'i arkaplanda açık bırakman şartı ile... Bazı telefonlarda arkaplan çalışmalarında uygulamalar kullanıcı isteğine göre durdurulabiliyor müsait olduğunda ayarlarına bi göz gezdir derim. Bunun dışında politikalarımıza aykırı yöntemlerle para kazanmayı deneme adımlarınız takip ediliyor :) Sağlıkla yürüyün... </Text>
      </View>
    );
  }
}
