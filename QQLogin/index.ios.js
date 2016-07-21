/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';

var Dimensions = require("Dimensions");
var {width,height,scale} = Dimensions.get('window');

class QQLogin extends Component {
  render() {
    return (
      <View style={styles.container}>
          {/* 头像 */}
        <Image source={require('./imgs/icon.png')} style={styles.iconStyle} />

          {/* 账号密码输入框 */}
          <View style={styles.settingStyle}>
            <TextInput style={styles.textInputStyle} 
              placeholder='请输入账号'
              clearButtonMode="always"
          />
          <TextInput style={styles.textInputStyle}
              password={true}
              placeholder='请输入密码'
              clearButtonMode="always"
           />
          </View>

          <View style={styles.otherStyle}>
            <Text>忘记密码?</Text>
            <Text>注册新用户</Text>
          </View>

          <View style={styles.bottomViewStyle}>
            <Text style={{marginLeft:10,fontSize:16}}>第三方登录</Text>
            <Image source={require('./imgs/icon3.png')} style={styles.otherImageStyle}
            ></Image>
            <Image source={require('./imgs/icon7.png')} style={styles.otherImageStyle}></Image>
            <Image source={require('./imgs/icon8.png')} style={styles.otherImageStyle}></Image>
          </View>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      alignItems:'center',
  },
  iconStyle:{
      borderRadius:40,
      borderWidth:2,
      borderColor:'red',
      width:80,
      height:80,
      marginTop:100,
  },
  settingStyle:{
    width:width,
    height:80,
    // flexDirection:'row',
    // justifyContent:'space-between',
    marginTop:10,
    backgroundColor:'white',
  },
  textInputStyle:{
    backgroundColor:'white',
    width:width,
    height:40,
    textAlign:'center',

  },
  otherStyle:{
    flexDirection:'row',
    marginTop:10,
    justifyContent:'space-between',
    width:width * 0.92,
    // alignItems:'center',
  },
  bottomViewStyle:{
      position:'absolute',
      // backgroundColor:'red',
      flexDirection:'row',
      // // 侧轴居中
      alignItems:'center',
      left:10,
      bottom:10,
      height:80,
  },
  otherImageStyle:{
    width:60,
    height:60,
    borderRadius:30,
    marginLeft:10,
  }
});

AppRegistry.registerComponent('QQLogin', () => QQLogin);
