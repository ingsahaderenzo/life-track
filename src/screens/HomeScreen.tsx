import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import HomeHeader from "../components/home/HomeHeader";
import StreakCount from "../components/home/StreakCount";
import ProgressBarHome from "../components/home/ProgressBarHome";
import QuickStart from "../components/home/QuickStart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import TimerModal from "../components/session/TimerModal";
import MessageModal from "../components/common/MessageModal";
import { useEffect, useState } from "react";
import { QuickStartData } from "../types/QuickStartData";
import { addSession } from "../store/statsSlice";

export default function HomeScreen() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);
    const [messageModalVisible, setMessageModalVisble] =
        useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [selectedQuickStart, setSelectedQuickStart] =
        useState<QuickStartData | null>(null);

    const quickStartDatas = useSelector(
        (store: RootState) => store.quickStart.quickStarts
    );

    const onFinishQuickStart = (auxDuration?: number) => {
        let totalDuration = 0;

        if (auxDuration !== undefined) {
            const minutes = auxDuration / 60;

            if (minutes < 1) {
                setMessage(
                    "Para poder guardar el tiempo de un cronometro, este debe ser mayor a 1 minuto"
                );
                setTimeModalVisible(false);
                setMessageModalVisble(true);
                return;
            } else {
                totalDuration = Math.round(minutes);
            }
        } else {
            totalDuration =
                selectedQuickStart!.duration * selectedQuickStart!.sessions;
        }

        dispatch(
            addSession({
                category: selectedQuickStart?.category,
                duration: totalDuration,
            })
        );
        setMessage("Session completada con éxito");
        setTimeModalVisible(false);
        setMessageModalVisble(true);
    };

    useEffect(() => {
        setTimeModalVisible(true);
    }, [selectedQuickStart]);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <HomeHeader />
            <StreakCount />
            <ProgressBarHome />
            <QuickStart
                data={quickStartDatas}
                selectQuickStart={(value: QuickStartData) =>
                    setSelectedQuickStart(value)
                }
            />
            {selectedQuickStart && (
                <TimerModal
                    visible={timeModalVisible}
                    forceClose={() => setTimeModalVisible(false)}
                    goodStop={(value: number) => onFinishQuickStart(value)}
                    okClose={onFinishQuickStart}
                    duration={selectedQuickStart.duration}
                    sessions={selectedQuickStart.sessions}
                    breakDuration={selectedQuickStart.breakDuration}
                    mode={selectedQuickStart.mode}
                />
            )}
            <MessageModal
                message={message}
                visible={messageModalVisible}
                onClose={() => setMessageModalVisble(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        maxWidth: 500,
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
    },
});
