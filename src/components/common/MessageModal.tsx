import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

type props = {
    message: string;
    visible: boolean;
    onClose: () => void;
};

const MessageModal = ({ message, visible, onClose }: props) => {
    const theme = useTheme();

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}
                contentContainerStyle={[
                    styles.container,
                    { backgroundColor: theme.colors.background },
                ]}
            >
                <Text
                    style={styles.text}
                    variant="headlineSmall"
                    children={message}
                />
                <Button
                    onPress={onClose}
                    mode="contained"
                    children={"cerrar"}
                />
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "90%",
        maxWidth: 400,
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    text: {
        marginBottom: 20,
        textAlign: "center",
    },
});

export default MessageModal;
