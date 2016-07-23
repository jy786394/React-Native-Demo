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
    TouchableOpacity,
    Image
} from 'react-native';

'use strict';

var carData = require('./LocalData/Car.json')

// // ListView 最基本的用法
// class ListV extends Component {
//   // 构造
//   constructor(props) {
//     super(props);
//     // 初始状态
//     var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2})
//     this.state = {
//       dataSource : ds.cloneWithRows(['1','2','2','000','lklkl'])
//     };
//   }
//
//   render(){
//     return(
//         <TouchableOpacity activeOpacity={0.5}>
//           <ListView
//               dataSource={this.state.dataSource}
//               renderRow={(rowData) => <Text>hi</Text>}
//               contentContainerStyle={styles.container}
//           />
//          </TouchableOpacity>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: 'red',
//     marginTop:20,
//     height:100,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// ListView 显示头部的基本的用法
class ListV2 extends Component{

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    // 获取组的数据
    var getSectionData = (dataBlob, sectionID) =>{
      return dataBlob[sectionID];
    };

    // 获取行的数据
    var getRowData = (dataBlob, sectionID, rowID) =>{
      return dataBlob[sectionID + ':' + rowID];
    };
    this.state = {
      dataSource: new ListView.DataSource({
        getSectionData: getSectionData,
        getRowData: getRowData,
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };
  }

  render() {
    return (
        <View style={styles.outViewStyle}>
          {/*头部*/}
          <View style={styles.topViewStyle}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>SeeMyGo旗下品牌</Text>
          </View>
          {/*主要内容*/}
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSectionHeader={this.renderSectionHeader}
          />
        </View>
    );
  }

  // 返回具体的一行
  renderRow(rowData,sectionID, rowID){
    return(
        <TouchableOpacity onPress={()=>alert('点击了第'+sectionID+'组,第'+rowID+'行')}>
          <View style={styles.cellStyle}>
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

  // 处理一些复杂的操作:数据处理 和 网络数据请求
  componentDidMount(){
    // 加载json数据
    this.loadDataFromJson();
  }

  // 从本地加载数据
  loadDataFromJson(){
    // 1.1 拿到数组中的所有数据
    var jsonData = carData.data; // 数组

    // 1.2 定义一些临时的变量
    var dataBlob = {},
        sectionIDs = [],
        rowIDs = [],
        cars = [];

    // 1.3 遍历数组
    for(var i=0; i<jsonData.length; i++){ // 遍历组
      // 1.3.1 把组号放入sectionIDs数组
      sectionIDs.push(i);
      // 1.3.2 把组的内容放入dataBlob对象中 i代表组号
      dataBlob[i] = jsonData[i].title;
      // 1.3.3 取出所有的车
      cars = jsonData[i].cars;
      rowIDs[i] = [];
      // 1.3.4 遍历车的数据
      for(var j=0; j<cars.length; j++){
        // 1.3.5 把行号放入rowIDs数组
        rowIDs[i].push(j);
        // 1.3.6 把每一行的数组放入dataBlob对象中
        dataBlob[i+':'+j] = cars[j];
      }
    }

    // 1.4 更新状态机
    this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    });

  }
}

const styles = StyleSheet.create({
  topViewStyle: {
    height: 64,
    backgroundColor: 'red',
    // 居中
    justifyContent: 'center',
    alignItems: 'center'
  },

  imgStyle: {
    width: 50,
    height: 50,
    marginRight: 7
  },

  outViewStyle: {
    flex: 1
  },

  sectionHeaderStyle: {
    backgroundColor: 'grey',
    height: 25,
    justifyContent: 'center'
  },

  cellStyle: {
    // 主轴的方向
    flexDirection: 'row',
    // 侧轴对齐方式
    alignItems: 'center',
    margin: 10,
    // 下边框
    borderBottomWidth: 0.5,
    borderBottomColor: '#dddddd',
    paddingBottom: 5
  }
});

AppRegistry.registerComponent('ListV', () => ListV2);