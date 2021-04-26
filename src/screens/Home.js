import React, { useRef } from 'react';

import {View, Text, SafeAreaView, FlatList, Image, StyleSheet, Animated} from 'react-native';
import {DUMMY_DATA, ACTIVE_ITEM_SIZE, IN_ACTIVE_ITEM_SIZE} from '../constants';



const Home = () => {

    const scrollX = useRef(new Animated.Value(0)).current;

    const FlatListItem = ({item, index}) => {
        
        const inputRange = [(index - 1) * ACTIVE_ITEM_SIZE,
             index * ACTIVE_ITEM_SIZE,
            (index + 1) * ACTIVE_ITEM_SIZE
        ];

        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0]
        })
        
        return (
            <View style={{width: ACTIVE_ITEM_SIZE}}>
                <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
                    <View style={styles.imgContainer}>
                        <Image source={item.img} style={styles.img} resizeMode="contain" />
                    </View>
                </Animated.View>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <View style={{marginTop: 20}}>
                <Text style={{textAlign: "center", marginBottom: 50}}>
                    Images View
                </Text>

                <Animated.FlatList 
                    showsHorizontalScrollIndicator={false}
                    data={DUMMY_DATA}
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    snapToInterval={ACTIVE_ITEM_SIZE}
                    decelerationRate={0}
                    bounces={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: {contentOffset: {x: scrollX}} }],
                        {useNativeDriver: true}
                    )}
                    contentContainerStyle={{
                        alignItems: "center"
                    }}
                    renderItem={({item, index}) => <FlatListItem item={item} index={index} />}
                />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 320,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 100,
        elevation: 8,
        marginTop: 60,
        borderRadius: 20,
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        alignSelf: 'center'
    },
    img: {
        height: 200,
        marginHorizontal: 10
    }
})

export default Home;