import { StyleSheet, Text, View , TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react'
import { Show } from '@/app/(tabs)/homepage/homepage';
import Ionicons from '@react-native-vector-icons/ionicons'

type Props={
    username:string,
    watchList: Show
}
//<Image source={{ uri: `https://image.tmdb.org/t/p/w500${watchList[0].posterURL}/>

/**
 * 
 * const posterUri = item.posterURL
                        ? `https://image.tmdb.org/t/p/w500${item.posterURL}`
                        : null;
 */

export const Post = ({username,watchList}:Props) =>{
    const[errorMessage, setErrorMessage] = useState<string>("");
    const [spoiler, setSpoiler] = useState<boolean>(true);
    const content ="Random gibberish. Comment to add some time later. Let's check this out. Hello my name is. Does this work? It should keep adding mo. What is going on. Hellomy name is test. I am testing this out. hello my name is test. Checking this post out. So if i keep writing it should work. Hello what is up? this show is so good.";


   
    return(
        <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', alignItems:'center',gap:15}}>
                    <View style={{borderColor:'white', borderWidth:1, padding:10, borderRadius:50, width:'25%', alignContent:'center'}}>
                    <Ionicons name='person' size={30} color='white'/>
                </View>
                <View>
                    <Text style={{color:"white", fontWeight:'bold', fontSize:18}}>{username}</Text>
                    <Text style={{color:"white", fontWeight:'400'}}>14 minutes ago</Text>     
                </View>
                </View>

                <Text style={{color:'white', fontSize:30,alignItems:'flex-end'}}>⋯</Text>
            </View>

            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                    <View style={styles.show}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${watchList?.posterURL}` }} style={styles.poster}/>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{color:"white", fontWeight:'bold', fontSize:20}}>{watchList?.title}</Text>
                        <Text style={{color:"gray", fontWeight:'bold'}}> S{watchList?.seasons} · Eps {watchList?.episodes}</Text>
                    </View>   
                    
                </View>
                {
                    spoiler ? <View style={{alignItems:'flex-end', backgroundColor:'red', padding:8, borderRadius:20, height:'35%', alignContent:'center'}}><Text style={{color:'white', fontWeight: 'bold'}}>Spoiler!</Text></View> : null
                }  
            </View>
            
            <Text style={{color:'white', fontSize:18}}>{content}</Text>
            <View style={{width:'100%', height:1, backgroundColor:'rgb(83, 87, 94)', marginVertical:5}}></View>
            <View style={{flexDirection:'row', flex:1, alignItems:'center',justifyContent:'space-between', gap: 20}}>
                <View style={{flexDirection:'row', gap: 8, alignItems:'center'}}>
                    <View style={{flexDirection:'row', gap: 8, alignItems:'center'}}>
                        <TouchableOpacity>
                            <Ionicons name='thumbs-up-sharp' size={20} color='white'/> 
                        </TouchableOpacity>
                        <Text style={{color:'white'}}>Likes</Text>
                    </View>
                    <View style={{flexDirection:'row', gap: 8, alignItems:'center'}}>
                        <TouchableOpacity>
                            <Ionicons name='chatbubble' size={20} color='white'/> 
                        </TouchableOpacity> 
                        <Text style={{color:'white'}}>Comments</Text>
                    </View>

                </View>
                
                {/*<View>
                    <TouchableOpacity>
                        <Ionicons name='share-social' size={20} color='white'/>
                    </TouchableOpacity>    
                </View>*/}
                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        //display:'flex',
        flex:1,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'rgb(48, 53, 63)',
        borderRadius: 25,
        borderColor:'rgb(69, 75, 88)',
        borderStyle: 'solid',
        borderWidth:1,
        padding: 20,
        height:'auto',
        gap:15
    },
    show:{
        width: '100%',
        flex:1,
        flexDirection:"row",
        justifyContent: 'flex-start',
        gap:15,
        borderRadius: 20
    },
    poster:{
        width: "20%",
        aspectRatio: 5/8,
        borderRadius: 12,
        backgroundColor: '#1E2128FF'
    },
})