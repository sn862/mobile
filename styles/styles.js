import { StyleSheet,Dimensions } from 'react-native';
import { Row } from 'react-native-table-component';
const {height, width} = Dimensions.get('screen');


export default StyleSheet.create({
    container: {
      //flex:1,      
      backgroundColor: '#DCDCDC',
      //flexDirection:'row',
      justifyContent: 'center',
      //flexWrap:'wrap', 
      //alignItems: 'center', 
      //width:'100%',
      //height:'100%',   
    },
    backgroundDiv:{    
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#708090',
      borderRadius:15,
      marginTop:30,
      marginBottom:20,
      marginLeft:20,
      marginRight:20
      //margin:20,
      //width:'80%'
      //minWidth:250
      
    },
    inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:10,
      borderBottomWidth: 1,
      width:'80%',
      height:35,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
    },
    logo:{
      fontWeight:"bold",
      fontSize:30,
      color:"#000000",
      marginBottom:20,
      marginTop:20

    },
    inputTextBox:{
      height:45,      
      borderBottomColor: '#FFFFFF',
     // flex:1,
      fontSize: 15, 
      marginLeft:10,   
    },  
    buttonContainer: {
      //height:35,
      //flexDirection: 'row',
      //justifyContent: 'center',
      //alignItems: 'center',
      marginBottom:20,
      padding:'1%',
      //width:'auto',
      borderRadius:10,
      backgroundColor: "#00b5ec", 
       
    }, 
    rowsetup:{
      //flex:1,
      //padding:'2%',
      width:'80%',
      //borderRadius:10,
      flexDirection:'row',   
      flexWrap:'wrap',   
      justifyContent:'space-between',
              
    },
    loginText: {
      color: 'white',
      fontSize:15,
      fontWeight: "bold",
      fontStyle: "italic",
      marginLeft:10,
      marginRight:10
    },
    tableStyle:{     
      width:'80%',        
      alignSelf: "center",
      marginBottom:20
    }, 
    tableHeader: {
      minHeight: 50,
      alignContent: "center",
      backgroundColor: "#FFFFFF",    
      borderWidth: 3,
      borderColor: "#00b5ec",
      borderRadius: 10, 
      },
    tableHeaderText: { 
      margin: 0,
      fontSize:19,    
      textAlign: "center",
      fontWeight: "bold",    
    },
    tableRowstyle:{   
      alignContent: "center",
      backgroundColor: "#FFFFFF",  
      borderColor: "#00b5ec",
      borderRadius: 10,  
      borderWidth: 1,
      marginTop:5
    },
    tableRowText: {     
      margin: 5,
      fontSize:16,    
      textAlign: "center",
      fontStyle: "italic",
      fontWeight: "bold",
      backgroundColor: "#FFFFFF",
    },
  });
