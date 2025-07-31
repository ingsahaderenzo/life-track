import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-paper-dropdown";
import { getFromStorage } from "../../utils/StorageUtils";

const CategoryList = () => {
    const [selectedCategoria, setSelectedCategoria] = useState<string>("");
    const [categorias, setCategorias] = useState<string[]>([]);

    // Fetch categories from storage when the component mounts
    useEffect(() => {
        const traerCategorias = async () => {
            const response = await getFromStorage<string[]>("categorias");
            if (response) {
                setCategorias(response);
            } else {
                setCategorias([]);
            }
        };
        traerCategorias();
    }, []);

    return (
        <View style={styles.container}>
            <Dropdown
                label={"Seleccionar una categoría"}
                mode={"outlined"}
                value={selectedCategoria}
                options={categorias.map((categoria) => ({
                    label: categoria,
                    value: categoria,
                }))}
                hideMenuHeader={true}
                onSelect={(value) => {
                    setSelectedCategoria(value?.valueOf() as string);
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
