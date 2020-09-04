import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Table, Row, Rows } from "react-native-table-component";
import styles from './styles/styles';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userName   : '',
      fileName : '',
      rating : '',
      jwtToken: '',
      show : '',
      tableData : [],
      filmdata :[],
      tableHead: [],
    }
    
  }
  
  onLogin = () => {
    const userName = this.state.userName;
    if(userName == ''){
      alert("please enter User name to Login");
  
    }else {
      try{
          fetch("https://backend-api-srini.herokuapp.com/api/v1/login", {
              method:'POST',
              body: JSON.stringify({userName:userName}),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          }).then(resp => resp.json()).then(data => {
              this.state.jwtToken = data.token;
              alert("Login sucessful");
          });
      }catch(e){
          console.log(e);
      }   
  }
  return false;
  }

  onUpload = () => {
    const movieTitle = this.state.fileName;
    const movieRating = this.state.rating;
    
    if(movieTitle == ""){
      alert("Please enter title for the movie");
      return false;
    }else if( movieRating < 1 || movieRating > 5){
      alert("Please select a valid rating (1 to 5) for the movie");
      return false;      
    }else{
      
      try{
        fetch("https://backend-api-srini.herokuapp.com/api/v1/films", {
            method:'POST',
            body: JSON.stringify({name:movieTitle, rating:movieRating}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.jwtToken
            }
        }).then(resp => {
            setTimeout(function (){
                if(resp.status == 200){
                    alert("movie uploaded successfully");
                   
                    
                }else if(resp.status == 400){
                    alert("Movie already exists");
                }else{
                    alert("Error occured while posting data " +  resp.status + " " + resp.statusText);
                }
            }, 0);
        });
      }catch(e){
        console.log(e);
      }                    
      this.setState({fileName:'', rating:''});           
      return false;
  }
  }

  onModify = () => {
    const movieTitle = this.state.fileName;
    const movieRating = this.state.rating;
    
    if(movieTitle == ""){
      alert("Please enter title for the movie");
      return false;
    }else if( movieRating < 1 || movieRating > 5){
      alert("Please select a valid rating (1 to 5) for the movie");
      return false;      
    }else{
      
      try{
        fetch("https://backend-api-srini.herokuapp.com/api/v1/films", {
            method:'PUT',
            body: JSON.stringify({name:movieTitle, rating:movieRating}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.jwtToken
            }
        }).then(resp => {
            setTimeout(function (){
                if(resp.status == 200){
                    alert("Movie Rating updated successfully");                    
                }else if(resp.status == 400){
                    alert("Movie doesn't exists");
                }else{
                  alert("Error occured while updating rating " +  resp.status + " " + resp.statusText);
                }
            }, 0);
        });
      }catch(e){
        console.log(e);
      }                    
      this.setState({fileName:'', rating:''});         
      return false;
  }
  }

  onDisplay = () =>{
    var tableHead =[];
    var tableData = [];
    var filmdata =[];

    try{
      fetch("https://backend-api-srini.herokuapp.com/api/v1/films", {
          method:'GET',                
          headers: {
              'Accept':'application/json',
              'Content-Type': 'application/json'
          }
      }).then(resp => resp.json())
      .then(results => {
          results.forEach((data, index) => {
            filmdata.push(index+1);
            filmdata.push(data.name);
            filmdata.push(data.rating);
            tableData.push(filmdata);
            filmdata = [];  
          });
          if (this.state.tableData.length > 0) {
            tableHead = ["S.No", "Film Name", "Rating"];
          }  
          else {
            tableHead = ["No data to display in the movie list"];
          }
          this.setState({ tableHead, tableHead });
          this.setState({ tableData: tableData });
      });
    }catch(e){
      console.log(e);
    } 
  }

  ShowHideComponent = () => {    
    if (this.state.show == false) {
      this.setState({ show: true });
    }
  };
  
  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        
        <View style={styles.backgroundDiv}>
        <Text style={styles.logo}>Login</Text>
        <View style={styles.inputContainer}>          
          <TextInput style={styles.inputTextBox}
              placeholder="User Name..."
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(userName) => this.setState({userName})}/>
        </View>
        <TouchableHighlight style={[styles.buttonContainer]} onPress={() => this.onLogin()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        </View>
        <View style={styles.backgroundDiv}>
          <Text style={styles.logo}>Upload or Modify</Text>
          <View style={styles.inputContainer}>          
            <TextInput style={styles.inputTextBox}
              placeholder="File Name..."
              keyboardType="default"
              underlineColorAndroid='transparent'              
              onChangeText={(fileName) => this.setState({fileName: fileName})}
              value={this.state.fileName}/>
          </View>
          <View style={styles.inputContainer}>          
            <TextInput style={styles.inputTextBox}
              placeholder="Rating (1...5)"
              keyboardType="default"
              underlineColorAndroid='transparent'              
              onChangeText={(rating) => this.setState({rating: rating})}
              value={this.state.rating}/>
          </View>
          <View style={[styles.rowsetup]}>
            <TouchableHighlight style={[styles.buttonContainer]} onPress={() => this.onUpload()}>
                <Text style={styles.loginText}>Upload</Text>              
            </TouchableHighlight>
            <TouchableHighlight style={[styles.buttonContainer]} onPress={() => this.onModify()}>
                <Text style={styles.loginText}>Modify</Text>
            </TouchableHighlight>           
          </View>
        </View>
        <View style={styles.backgroundDiv}>
        <Text style={styles.logo}>Display</Text>
        <TouchableHighlight style={[styles.buttonContainer]} onPress={() => {this.onDisplay(); this.ShowHideComponent()}}>
          <Text style={styles.loginText}>Display All</Text>          
        </TouchableHighlight>
        
        {this.state.show ? (
        <Table style={styles.tableStyle}>
            <Row data={this.state.tableHead}  style={styles.tableHeader} textStyle={styles.tableHeaderText} />
            <Rows data={this.state.tableData} style={styles.tableRowstyle} textStyle={styles.tableRowText} />
          </Table>
        ) : null}
        </View>
              
      </View>
      </ScrollView>
    );
  }
}


 