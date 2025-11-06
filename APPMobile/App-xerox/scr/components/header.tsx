import { StyleSheet, StatusBar, Image, TouchableOpacity } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { useRouter } from "expo-router";

const Header = (props: NativeStackHeaderProps) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => router.back()}>
            <Image
                style={styles.image}
                source={require("../../assets/images/logo.png")} />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EAF9FF",
        justifyContent: "center"
    },
    image: {
        width: 150,
        height: 100,
        resizeMode: "center",
        marginLeft: 20,
    }
});

export default Header;