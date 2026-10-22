import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image, Modal} from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackendCalls } from '@/utils/backendCalls';
import { Slider } from '@/components/slider';
import { Post } from '@/components/posts';
import { CreatePost } from '@/components/createPost';

export type Show ={
    id: string,
    tmdbId: number | null,
    title: string,
    originalTitle: string,
    overview: string | null,
    relaseYear: Int16Array,
    genres: string[],
    seasons: number | null,
    episodes: number | null,
    posterURL: string | null,
    createdBy: string,
    createdAt: Date
}
//fix error messages to show multiple if multiple things are happening
export default function HomePage(){

    const [username, setUsername] = useState<string>("");
    const [watchList, setWatchList] = useState<Show[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [posts, setPosts] = useState<Show[]>([]);
    const [avatar, setAvatar] = useState<string>("");

    useEffect(()=>{
        const getUsername = async() =>{
            setErrorMessage('');
            try {
                const result = await BackendCalls('userInfo/getUsername','GET');
                setUsername(result.username);
                return;
            } catch (error) {
                if(error instanceof Error){
                    setErrorMessage(error.message);
                }else{
                    console.error(`Something went wrong: ${error}`);
                    setErrorMessage(`Something failed. Please try again later.`);
                }
            }
        }

        const getWatchlist = async() =>{
            setErrorMessage('');
            try {
                const result = await BackendCalls('watchListShow/watchListShow','GET');
                const shows = result.watchList.map((item:any)=>({
                    id: item.show.id,
                    title:item.show.title,
                    originalTitle: item.show.originalTitle,
                    posterURL: item.show.posterURL,
                    seasons: item.show.seasons,
                    episodes: item.show.episodes
                }))
                setWatchList(shows);

                return;
            } catch (error) {
                if(error instanceof Error){
                    setErrorMessage(error.message);
                }else{
                    console.error(`Failed calling to backend: ${error}`);
                    setErrorMessage(`Failed to call backend. Please try again later`);
                }
            }
        }
        const getAvatar = async()=>{
            setErrorMessage('');
            try {
                const result = await BackendCalls(`userInfo/getAvatar`,'GET');
                setAvatar(result.avatar);
            } catch (error) {
                if(error instanceof Error){
                    setErrorMessage(error.message);

                }else{
                    console.error(`Failed getting avatar: ${error}`);
                    setErrorMessage('Something went wrong. Try again later.');
                }
            }
        }
        const getSpecificPost = async()=>{
            setErrorMessage('');
            try {
                const result = await BackendCalls(`posts/show/6e222d08-6a8f-4413-99fa-5354b70495b5`,'GET');
                setPosts(result.postInfo);
                /*watchList.map(async item=>{
                    const result = await BackendCalls(`posts/post/${item.id}`,'GET');
                    setPosts(result.postInfo);
                });*/
                return

            } catch (error) {
                if(error instanceof Error){
                    setErrorMessage(error.message);
                }else{
                    console.error(`Failed calling backend: ${error}`);
                    setErrorMessage("Internal server error. Please try again later.");
                }
            }
        }

        getUsername();
        getWatchlist();
        getSpecificPost();
        getAvatar();
    },[]);

    const [newPost, setNewPost] = useState<boolean>(false);
    const [spoiler, setSpoiler] = useState<boolean>(false);


    return(
        <SafeAreaView style={styles.safeArea}>
            
            <ScrollView contentContainerStyle = {styles.container}>
                
                <View style={{alignItems: 'center'}}>
                     <Text style={{color:"white", fontWeight:'bold', fontSize: 32, fontStyle:'italic'}}> GLSocial</Text>
                </View>
                
                <Post username={username} watchList={watchList[0]}/>
                {/*<View style={{gap: 5}}>
                    <Text style={{color:"white", fontWeight:'bold',fontSize: 16}}>Watchlist</Text>
                    <Slider data={watchList} />
                </View>
                <Text style={{color: "blue"}}>User username: {username} </Text>
                {errorMessage ? <Text style={{color:"red"}}>{errorMessage}</Text> : null}*/}
                
                    
            </ScrollView>
            
            {newPost ?
                <CreatePost newPost={newPost} onClose={()=>setNewPost(false)}/> 
                : 
                null
            }
            
            <TouchableOpacity style={styles.createPost} onPress={()=>setNewPost(true)}>
                <Text style={{color:'white', fontSize:25}}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
        safeArea:{
            flex: 1,
            //display:'flex',
            backgroundColor: '#1E2128FF'
        },
        container:{
            //flexGrow: 1,
            //flex:1,
            justifyContent: 'flex-start',
            gap: 20,
            width: '100%',
            paddingBottom: 24,
            paddingHorizontal: 15,
            flexDirection: 'column'
        },
        showCard:{
            width: '30%',
            marginBottom: 5,
            gap:5,
            alignItems: 'center'
        },
        poster:{
            width:'100%',
            aspectRatio: 0.65,
            borderRadius: 12,
            backgroundColor: '#1E2128FF'
        },
        createPost:{
            backgroundColor:'#636AE8FF',
            width:60, 
            height:60, 
            borderRadius:30, 
            alignItems:'center',
            justifyContent:'center', 
            position:'absolute', 
            bottom:20, 
            right:20
        },
        overlay:{
            flex:1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent:'flex-end'
        },
        postPopup:{
            height:'90%',
            backgroundColor:'#1E2128FF',
            borderTopLeftRadius:24,
            borderTopRightRadius:24,
            padding:20,
            flexDirection:'column',
            gap:10
        },
        popupHeader:{
            justifyContent:'center', 
            height:45, 
            flexDirection:'row',
            alignItems:'center', 
            position:'relative'
        }
    })