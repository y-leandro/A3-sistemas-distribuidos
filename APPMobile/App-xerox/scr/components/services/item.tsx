import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";


interface boxProps {
    title: string;
    image: string;
    color?: string;
};

const screenWidth = Dimensions.get("window").width
const boxWidth = screenWidth / 1.5

export default function News({ title, image, color = "#5a9dba0a" }: boxProps) {
    return (<View
        style={[styles.box, { backgroundColor: color }]}
        
    >
        <Image
            style={styles.image}
            source={typeof image === "string" ? { uri: image } : image}
        />

        <Text
            style={styles.text}
        >
            {title}</Text>




    </View>
    )

}



const styles = StyleSheet.create({
    box: {
        width: boxWidth,
        height: boxWidth / 2,
        margin: 20,
    },
    image: {
        width: boxWidth,
        height: boxWidth / 2,
        resizeMode: "cover",
        margin: 0,
    },
    text: {
        fontSize: 12,
        margin: 10,
        color: "#5A9DBA",
        fontWeight: "bold",
        fontFamily: "System",
    },
});


