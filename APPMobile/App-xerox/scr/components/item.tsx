import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";

interface boxProps {
    title: string;
    image: string;
    goTo: string;
    color?: string;
};

const screenWidth = Dimensions.get("window").width
const boxWidth = screenWidth / 3

export default function News({ title, image, goTo, color = "#5a9dba0a" }: boxProps) {
    const router = useRouter();
    return (<TouchableOpacity
        style={[styles.box, { backgroundColor: color }]}
        onPress={() => router.push(goTo as any)}
    >
        <Image
            style={styles.image}
            source={typeof image === "string" ? { uri: image } : image}
        />

        <Text
            style={styles.text}
        >
            {title}</Text>




    </TouchableOpacity>
    )

}



const styles = StyleSheet.create({
    box: {
        width: boxWidth,
        height: boxWidth,
        margin: 20,
    },
    image: {
        width: boxWidth,
        height: boxWidth,
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


