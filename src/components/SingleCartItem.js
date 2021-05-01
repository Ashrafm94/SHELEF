import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SingleCartItem = ({ val, navigateToChild }) => {

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigateToChild(val.id)}>
            <Image source={val.img} style={styles.smallImage} resizeMode="contain" />
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>{val.qty}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    smallImage: {
        height: 65,
        width: 65,
        marginVertical: 10
    }
});

export default SingleCartItem;