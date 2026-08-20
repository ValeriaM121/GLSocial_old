import { StyleSheet, Text, View , TouchableOpacity, Image, Dimensions} from "react-native";
import { Show } from "@/app/(tabs)/homepage/homepage";

type Props={
    item: Show,
    index: number
}


export const SliderItem = ({item,index}: Props)=>{
    return(
        
        <View key={item.id} style={{alignItems: 'center', gap:10, width:120, marginRight: 12}}>
            <TouchableOpacity>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.posterURL}` }} style={styles.poster} resizeMode="cover" alt={item.title}/>
            </TouchableOpacity>
            <Text style={{color:"white"}}>{item.title}</Text>
            
        </View>
        

    )
}


const styles = StyleSheet.create({
        showCard:{
            width: '30%',
            marginBottom: 5,
            gap:5,
            alignItems: 'center'
        },
        poster:{
            width: "100%",
            aspectRatio: 2/3,
            borderRadius: 12,
            backgroundColor: '#1E2128FF'
        },
    })