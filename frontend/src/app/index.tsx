import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index(){
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#1E2128FF'}}>
      <View style={styles.container}>
        <View style={{gap: 30, alignItems: 'center'}}>
          <Text style={styles.headerText}>GLSocial</Text>
          <Text style={styles.subText}>Discover</Text>
          <Text style={styles.subText}>Discuss</Text>
          <Text style={styles.subText}>Connect</Text>
          <Text style={styles.subText}>GL Content</Text>
        </View>
        <View style={styles.buttonView}>
          <Link testID="login-link" href="/login" push asChild>
            <TouchableOpacity style={styles.loginButton} testID="login-button">
              <Text style={{color:'white'}}>Login</Text>
            </TouchableOpacity>
          </Link>
          <Text style={{color:"white"}}> Don't have an account? <Link testID="signup-link" href="/signup" push asChild>
          <Text style={{color:"#636AE8FF"}}>Sign Up</Text>
          </Link> </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingTop: 120,
      paddingBottom: 40
    },
    headerText:{
      color: 'white',
      fontSize: 45,
      fontWeight: 'bold'
    },
    subText:{
      color: 'white',
      fontSize: 25,
    },
    loginButton:{
      backgroundColor: '#636AE8FF',
      borderRadius: 25,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%'
    },
    buttonView:{
      width:'100%',
      alignItems: 'center',
      gap: 30
    }
  })