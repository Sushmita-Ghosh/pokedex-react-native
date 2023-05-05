import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { POKEMON_TYPE } from "../../utils/constants";
import Box from "../atoms/Box.js";
import { getPokemonTypesModal } from "../../api/pokemon.js";

const SearchModal = ({
  showModal,
  setShowModal,
  setFilterTypeData,
  setIsTypeFilterTrue,
  // filterData,
}) => {
  const [typesArray, setTypesArray] = useState();

  const getDataAccordingToType = async () => {
    console.log("Inside Apply");
    setIsTypeFilterTrue(true);
    const data = await getPokemonTypesModal(typesArray.url);
    setFilterTypeData(data.pokemon);
    setShowModal(false);
  };

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Filters By Type</Text>
          {/* Modal content */}
          <Box
            data={POKEMON_TYPE}
            isWeak
            isModal
            typesArray={typesArray}
            setTypesArray={setTypesArray}
          />
          {/* Modal Footer */}
          <View style={styles.footer}>
            <View style={styles.close}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.apply}>
              <TouchableOpacity onPress={() => getDataAccordingToType()}>
                <Text style={styles.buttonTextApply}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8);",
    // height: "100%",
    // padding: 5,
  },

  modalView: {
    height: "80%",
    width: "90%",
    backgroundColor: "white",
    // borderRadius: 20,
    shadowColor: "black",
    elevation: 5,
    padding: 15,
  },
  modalText: {
    fontSize: 30,
    marginBottom: 20,
  },

  modalHeader: {
    fontSize: 30,
    fontWeight: 400,
    marginVertical: 20,
  },

  footer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  close: {
    width: "45%",
    padding: 10,
    // backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  apply: {
    width: "45%",
    backgroundColor: "#09143C",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 500,
  },

  buttonTextApply: {
    fontSize: 15,
    fontWeight: 500,
    color: "#fff",
  },
});
export default SearchModal;
