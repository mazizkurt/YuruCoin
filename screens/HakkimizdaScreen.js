import React, { Component } from 'react';
import { View, Text ,TouchableOpacity} from 'react-native';
import { Ionicons,MaterialIcons,FontAwesome } from '@expo/vector-icons';

export default class HakkimizdaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ecf0f1'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{position:'absolute',top:50,left:20,justifyContent:'center',alignItems:'center',zIndex:5}}><Ionicons name="ios-arrow-back" size={35} color="black" /></TouchableOpacity>
                <Text style={{color:'#555555',fontWeight:'bold',fontSize:20,textAlign:'center',}}> Hakkımızda </Text>
                <Text style={{color:'gray',fontWeight:'bold',fontSize:18,textAlign:'center',marginTop:20,width:'90%'}}>
                Web yazılımları , mobil uygulama , otomasyon sistemleri ve benzeri yazılım çözümleri sunmaktayız.
Türkiye'nin üreten ve değer yaratan ülke olma yolundaki dönüşümünü girişimcilik ile hızlandırmak vizyonu ile kurulan AppNet Team, Türkiye'de yazılım kültürünü oluşturmak ve yaygınlaştırmak misyonu ile çalışıyor. 2019 yılında yola çıkan AppNet Team, yazılım sektörünün ticari ve kültürel alanda değişimin anahtarı olduğuna inanan iş insanları ve fikir önderleri ile birlikte yazılım kültürünün yaygınlaşması ve yazılımcılığın gençler arasında bir kariyer seçeneği haline gelmesi için çalışmalarına hız kesmeden devam ediyor.    
                
                </Text>
        </View>
    );
  }
}
