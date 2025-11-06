import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({ children }: any) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#5A9DBA" }}>
            {children}
        </SafeAreaView>
    );
}
