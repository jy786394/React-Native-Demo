/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */



import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';

'use strict';

var dataArray = require('./LocalData/Car.json');
class ListV extends Component{

  // 构造
    constructor(props) {
      super(props);
      var getRowData = (dataBlob,sectionID,rowID) =>{
        return dataBlob[sectionID+':'+rowID];
      };
      var getSectionData = (datBlob,sectionID) =>{
        return datBlob[sectionID];
      };
      // 初始状态
      this.state = {
        dataSource:new ListView.DataSource({
          getRowData:getRowData,
          getSectionData : getSectionData,
          rowHasChanged : (r1,r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1,s2) => s1 !== s2,
        })
      };
    }

  render(){
    return(
        <View style={styles.listVStyle}>
          {/*顶部的 View*/}
          <View style={styles.topViewStyle}>
            <Text style={styles.topTextStyle}>Py</Text>
          </View>

          {/*加载 listView */}
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSectionHeader={this.renderSectionHeader}
          />
        </View>
    )
  }

  renderRow(rowData,sectionID,rowID){
    return(
        <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('点击了第'+sectionID+'组'+'第'+rowID+'行')}>
          <View style={styles.rowVStyle}>
            <Image source={{uri: rowData.icon}} style={styles.imgStyle}/>
            <Text>{rowData.name}</Text>
          </View>
        </TouchableOpacity>
    )
  }

  // 返回组的头部数据
  renderSectionHeader(sectionData,sectionID){
    return(
        <View style={styles.sectionHeaderStyle}>
          <Text style={{ color:'orange', fontSize:16, fontWeight:'bold', paddingLeft:5}}>{sectionData}</Text>
        </View>
    )
  }

  // 加载数据
  componentDidMount() {
    this.loadForJson();
  }

  loadForJson(){
    var jsonData = dataArray.data;
    var sectionID = [],
        rowID = [],
        cars = [],
        dataBlob = {};
    for (i = 0;i<jsonData.length;i++){
      sectionID.push(i)
      dataBlob[i] = jsonData[i].title
      rowID[i]=[]
      cars = jsonData[i].cars
      for (var j=0;j<cars.length;j++){
        rowID[i].push(j)
        dataBlob[i+':'+j] = cars[j]
      }
    }

    this.setState({
      dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionID,rowID)
    })
  }
}

const styles = StyleSheet.create({
  superViewStyle:{

  },
  topViewStyle:{

    backgroundColor:'red',
    height:64,
    justifyContent:'center',
    alignItems:'center'
  },
  topTextStyle:{
    fontSize:22,
    color:'#dddddd',
  },
  listVStyle:{
    flex:1,
  },
  rowVStyle:{
    flexDirection:'row',
    alignItems:'center',
  },
  sectionHeaderStyle:{
    height:20,
    backgroundColor:'#dddddd',
  },
  imgStyle:{
    width:50,
    height:50,
    margin:10,
  },
})

AppRegistry.registerComponent('ListV', () => ListV);