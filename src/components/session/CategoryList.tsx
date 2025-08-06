import React from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-paper-dropdown";

type props = {
    categories: string[];
    setSelectedCategorie: (value: string) => void;
    selectedCategorie: string;
};

const CategoryList = ({
    categories,
    setSelectedCategorie,
    selectedCategorie,
}: props) => {
    return (
        <View style={styles.container}>
            <Dropdown
                label={"Seleccionar una categoría"}
                mode={"outlined"}
                value={selectedCategorie}
                options={categories.map((categoria) => ({
                    label: categoria,
                    value: categoria,
                }))}
                hideMenuHeader={true}
                onSelect={(value) => {
                    setSelectedCategorie(value?.valueOf() as string);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        marginBottom: 20,
        width: "100%",
        maxWidth: 400,
    },
});

export default CategoryList;
