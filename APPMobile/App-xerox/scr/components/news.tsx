import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";

interface boxProps {
    image: string;
    goTo: string;
    color?: string;
};

export default function News({ image, goTo, color = "#5A9DBA" }: boxProps) {
    const router = useRouter();
    return (<TouchableOpacity
        style={[styles.box, { backgroundColor: color }]}
        onPress={() => router.push(goTo as `../app/?${string}`)}
    >
        <Image
            style={styles.image}
            source={typeof image === "string" ? { uri: image } : image}
        />



    </TouchableOpacity>
    )

}



const styles = StyleSheet.create({
    box: {
        width: 280,
        height: 140,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
    },
    image: {
        width: 280,
        height: 140,
        resizeMode: "cover",
        margin: 0,
        borderRadius: 10,
    },
});


