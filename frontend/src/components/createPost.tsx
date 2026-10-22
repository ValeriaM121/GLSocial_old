import { StyleSheet, Text, View , TouchableOpacity, Image, Modal, TextInput, FlatList } from 'react-native';
import { useEffect, useState } from 'react'
import { Show } from '@/app/(tabs)/homepage/homepage';
import Ionicons from '@react-native-vector-icons/ionicons'
import { BackendCalls } from '@/utils/backendCalls';
import { SearchBar } from 'react-native-screens';

type Props={
    newPost: boolean,
    onClose: ()=>void
}

type Shows={
    id:string,
    title:string,
    releaseYear: number,
    seasons:number,
    episodes:number,
    posterURL:string
}

export const CreatePost = ({newPost,onClose}: Props)=>{
    const[spoiler, setSpoiler] = useState<boolean>(false);
    const[shows, setShows] = useState<Shows[]>([]);
    const[search,setSearch] = useState<string>('');
    const [filtered, setFiltered] = useState<Shows[]>([]);

    const[errorMessage, setErrorMessage] = useState<string>("");
    useEffect(()=>{
        const getShows = async()=>{
            setErrorMessage("");
            try {
                const result = await BackendCalls('shows/getSearchShows','GET');
                setShows(result.showsInfo);
            } catch (error) {
                if(error instanceof Error){
                    setErrorMessage(error.message);
                }else{
                    console.error(`Failed getting shows for search: ${error}`);
                    setErrorMessage('Something went wrong. Please try again later.');
                }
            }
        }
        getShows();
    },[]);

    const handleSearch = (text:string) =>{
        setSearch(text);
        const filteredInfo = shows.filter(item=> item.title.toLowerCase().includes(text.toLowerCase()));
        setFiltered(filteredInfo);
    }   


    return(
        <Modal
            visible={newPost}
            animationType="slide"
            transparent
        >
            <View style={styles.overlay}>
                <View style={styles.postPopup}>
                    <View style={styles.popupHeader}>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Add Post</Text>
                        <TouchableOpacity onPress={()=>onClose()} style={{position:'absolute', right:16}}><Text style={{color:'white',fontSize:25, justifyContent:'flex-end'}}>X</Text></TouchableOpacity>
                    </View>

                    <View style={{gap:5}}>
                        <Text style={{color:'white', fontSize:18}}>Pick Show:</Text>
                        <TextInput
                            value={search}
                            placeholder='Select Show'
                            placeholderTextColor='gray'
                            style={styles.textBox}
                            onChangeText={handleSearch}
                        />
                        <FlatList
                            data={filtered}
                            keyExtractor={(item)=>item.id}
                            renderItem={({item}) => (<Text style={{color:'white'}}>{item.title}</Text>)}
                        />
                    </View>
                    <View style={{gap:5}}>
                        <Text style={{color:'white', fontSize:18}}>Pick Show:</Text>
                        <TextInput
                            value={search}
                            placeholder='Select Show'
                            placeholderTextColor='gray'
                            style={styles.textBox}
                            onChangeText={handleSearch}
                        />
                        {search.length > 0 && (
                            <View>
                                {filtered.map(show=>(
                                    <TouchableOpacity key={show.id} style={{}}><Text style={{color:'white'}}>{show.title}</Text></TouchableOpacity>
                                ))}
                            </View>
                        )}

                    </View>

                    {spoiler ?
                        <TouchableOpacity style={{backgroundColor:'red', padding:10, borderRadius:25, alignItems:'center', flexDirection:'row', alignSelf:'flex-start', gap:5}} onPress={()=>setSpoiler(false)}>
                            <Ionicons name='eye' size={25} color='white'/><Text style={{color:'white', fontWeight:'600'}}>Spoiler</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity style={{backgroundColor:'white', padding:10, borderRadius:25, alignItems:'center', flexDirection:'row', alignSelf:'flex-start', gap:5}} onPress={()=>setSpoiler(true)}>
                            <Ionicons name='eye-off' size={25} color='black'/><Text style={{color:'black', fontWeight:'600'}}>Spoiler</Text>
                        </TouchableOpacity>
                    }
                    
                    <Text>Add post</Text>
                    
                </View>
        
            </View>
                            
        </Modal>
    )

}

const styles = StyleSheet.create({
    overlay:{
            flex:1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent:'flex-end'
        },
        postPopup:{
            height:'95%',
            backgroundColor:'#1E2128FF',
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
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
        },
        textBox:{
            //flex: 1,
            justifyContent: 'flex-start',
            height: 40,
            borderColor: '#f1f2f5',
            backgroundColor: '#f1f2f5',
            borderRadius: 15,
            padding: 10
        },
    }
)