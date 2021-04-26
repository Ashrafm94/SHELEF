import React from 'react';

import {View, Text, SafeAreaView, FlatList, Image, StyleSheet} from 'react-native';
import {DUMMY_DATA, ACTIVE_ITEM_SIZE, IN_ACTIVE_ITEM_SIZE} from '../constants';



const Home = () => {

    const FlatListItem = ({item}) => {
        return (
            <View style={{width: ACTIVE_ITEM_SIZE}}>
                <View style={styles.container}>
                    <Image source={item.img} style={styles.img}/>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <View>
                <Text>
                    Images View
                </Text>

                <FlatList 
                    showsHorizontalScrollIndicator={false}
                    data={DUMMY_DATA}
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    snapToInterval={ACTIVE_ITEM_SIZE}
                    decelerationRate={0}
                    bounces={false}
                    contentContainerStyle={{
                        alignItems: "center"
                    }}
                    renderItem={({item}) => <FlatListItem item={item} />}
                />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        padding: 20,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 34
    },
    img: {

    }
})

export default Home;