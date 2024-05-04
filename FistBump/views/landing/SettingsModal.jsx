import { View, Modal, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions, Platform } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { tickBtn, declineBtn } from "../../resources";
import { useActions } from "./useActions";
import { useNavigation } from "@react-navigation/native";
import { handleClick } from "../logo/LogoView";
import { useDispatch, useSelector } from "react-redux";
import { useDbHandlers } from "../../utils/useDbHandlers";

export function SettingsModal(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
  const { confirmedLogin} = user
    const { close, show } = props;
    const [confirmContainerVisible, setConfirmContainerVisible] = useState(false);
    const [initialModalContainerVisible, setInitialModalContainerVisible] = useState(true);
    const{deleteAccount}=useDbHandlers()

    let initialModalContainerVisibility = initialModalContainerVisible ? styles.visible : styles.hidden;
    let confirmContainerVisibility = confirmContainerVisible ? styles.visible : styles.hidden;


    const handleModalBtnClick = useCallback((isMainContainerVisible, accDeletionHook) => {
        handleClick();
        setConfirmContainerVisible(!isMainContainerVisible);
        setInitialModalContainerVisible(isMainContainerVisible);

        //call hook
        if (accDeletionHook) {
            accDeletionHook();
            close();
        }
    }, []);

    return (
        <View style={styles.centeredView}>
            <Modal animationType="slide" visible={show} transparent={true} supportedOrientations={['landscape']}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={[styles.modalViewStyle, initialModalContainerVisibility]}>
                            <Text style={styles.modalText}>Settings</Text>
{confirmedLogin?
                            <TouchableOpacity onPress={() => handleModalBtnClick(false)} style={[styles.cancelButton, styles.marginTop, styles.marginBottom]} >
                                <Text style={[styles.modalText, styles.deleteBtnText]}>Delete Account</Text>
                            </TouchableOpacity>:
                            <Text style={styles.modalText}>No Account Created</Text>}
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={close} style={[styles.modalButtonDecline]}>
                                    <Image source={declineBtn}>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.modalViewStyle, confirmContainerVisibility]}>
                            
                           <Text style={styles.modalText}>Confirm Account Deletion</Text>
                            <Text style={[styles.modalText, styles.marginTop]}>This will also delete your vote.</Text>
                            <Text style={[styles.modalText, styles.marginBottom]}>Are you sure you want to Delete your Account ?</Text>

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => handleModalBtnClick(true, deleteAccount)} >
                                    <Image source={tickBtn}>
                                    </Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleModalBtnClick(true)} style={[styles.modalButtonDecline]}>
                                    <Image source={declineBtn}>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalViewStyle: {
        alignItems: 'center',
        elevation: 5
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Super Funky' },
            android: { fontFamily: 'SuperFunky-lgmWw' }
        })
    },
    modalButtonDecline: {
        marginLeft: 15
    },
    deleteBtnText: {
        margin: 'auto',
        padding: 15,
        color: 'black'
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    visible: {
        display: 'flex'
    },
    hidden: {
        display: 'none'
    },
    marginTop: {
        marginTop: '5%'
    },
    marginBottom: {
        marginBottom: '5%'
    },
    cancelButton: {
        height: 'auto',
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(233, 60, 6)',
        shadowColor: 'rgba(0,0,0,0.4)',
        borderRadius: 50,
        shadowOffset: {
            width: 10,
            height: 15,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    }
})