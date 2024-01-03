import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground } from "react-native";
import { Accept } from "../../resources";
import { Decline } from "../../resources";
import { PrivacyPolicy } from "../../resources";
import { TopFrame } from "../../resources";
import { BottomFrame } from "../../resources";
import { EulaFrame } from "../../resources";


export function EulaView({ navigation }) {
    const exitApp = () => {
        BackHandler.exitApp();
    }

    return (
        <View style={styles.container}>
            <View style={styles.eulaContent}>
                <ImageBackground style={styles.eulaFrame} source={EulaFrame}>
                    <ScrollView bounces="false" style={styles.textContainer}>
                        <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolorem cum repellendus, cumque eos eveniet deleniti nemo, fuga est totam itaque perspiciatis expedita odio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum libero repellendus fuga omnis earum praesentium id! Aspernatur ea odit possimus adipisci ab quo inventore dignissimos repellat, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dignissimos autem beatae iure possimus, libero voluptate hic corrupti quibusdam deserunt in velit quae harum unde commodi dicta voluptates at? Sapiente! numquam dolor impedit iure?Eos fugit voluptate aut et molestiae!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas necessitatibus enim, cupiditate, expedita fugiat hic vel dolorum cumque iusto dicta debitis sapiente nulla sunt, consequatur earum minus inventore explicabo nostrum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi sequi nihil tempore! Reiciendis architecto labore dolore, temporibus distinctio quis quia optio harum maxime vel illo suscipit, nostrum expedita veritatis beatae. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic laborum, quas tempore provident asperiores nihil accusantium. Ex provident repellat minima minus amet, fugit quae, est voluptatibus nisi animi temporibus iste. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum blanditiis mollitia debitis cupiditate amet autem, eveniet natus, doloremque dolores aut neque dignissimos sequi reiciendis in doloribus eius. Omnis, ad ab! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus expedita, doloribus a suscipit eaque voluptas rem modi maiores natus. Molestias voluptatem dicta vero nemo doloremque impedit asperiores. Optio, animi ut! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, voluptates delectus quis, magni sapiente non quasi ex error repellendus eligendi possimus voluptatem. Error pariatur magnam maiores consequatur laboriosam atque accusamus? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos magni sequi, suscipit facilis impedit voluptas ratione voluptates enim, vel perferendis praesentium sapiente vitae veniam accusantium animi? Ea, culpa pariatur. Voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sequi animi a assumenda. Deserunt ipsum soluta numquam quos non veritatis voluptates. Tempore pariatur praesentium sequi fuga aspernatur dicta qui? A?</Text>
                    </ScrollView>
                </ImageBackground>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.buttonContainer}>
                    <Image source={Accept} style={styles.button}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => exitApp()} style={styles.buttonContainer}>
                    <Image source={PrivacyPolicy} style={styles.button}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => exitApp()} style={styles.buttonContainer}>
                    <Image source={Decline} style={styles.button}>
                    </Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    textContainer: {
        top:'12%',
        left: '10%',
        height: '70%',
        width: '80%',
        position: 'absolute',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '15%'
    },
    text: {
        color: 'white'
    },
    eulaFrame: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    eulaContent: {
        height: '80%',
        width: '80%',
    },
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1
    },
    button: {
        width: 'auto',
        height: '100%'
    },
})