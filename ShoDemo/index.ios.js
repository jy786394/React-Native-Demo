
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
  View
} from 'react-native';

var dataArray = require("./datas.json");
// var dataArray = require("./package.json");
var dimensions = require('Dimensions');
var {width, height,scale} = dimensions.get('window');
var clos = 3;
var imageW = 100;
var vMargin= (width - clos * imageW) / (clos + 1);

class shopDemo1 extends Component{
  render(){
    return (
      <View style={style.viewStyle}>    
         {this.renderItems()}
      </View>
    )
  }

  renderItems(){
      var itemsArr = [];
      for(var i=0; i<dataArray.length; i++){
          var item = dataArray[i];
          itemsArr.push(
             <View style={style.subViewStyle} key={i}>
                <Image source={{uri:item.icon}} style={style.imageStyle}></Image>
                <Text style={style.textStyle}>{item.title}</Text>
             </View>
          );
      }
      // 5.返回数组
      return itemsArr;
  }
}

const style = StyleSheet.create({
   viewStyle:{
        backgroundColor:'red',
        flex:1,
        flexDirection:'row',
      // flexDirection:'row'
        flexWrap:'wrap',
    },
    subViewStyle:{
        backgroundColor:'blue',
        width:100,
        height:100,
        alignItems:'center',
        marginLeft:vMargin,
        marginTop:20,
    },
    textStyle:{
        backgroundColor:'red',
        width:50,
        height:30,
        marginTop:10,
        paddingTop:5,
        paddingLeft:5,
    },
    imageStyle:{
        width:40,
        height:40,
        backgroundColor:'yellow',
        marginTop:10,
    }
  }
)



AppRegistry.registerComponent('ShoDemo', () => shopDemo1);
