import{ FlatList, StyleSheet, Text, View } from 'react-native'
import { Show } from '@/app/(tabs)/homepage/homepage'
import { SliderItem } from './sliderItem'

type SliderProps={
    data: Show[];
}

export const Slider = ({data}:SliderProps) =>{
    return(
        <View>
            <FlatList data={data} renderItem={({item,index})=> <SliderItem item={item} index={index}/>} horizontal showsHorizontalScrollIndicator={false}/>
        </View>
    )

}