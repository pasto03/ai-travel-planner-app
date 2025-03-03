import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login() {

    const router = useRouter();
    return (
        <View>
            <Image source={require("./../assets/images/travel.png")}
                style={{
                    width: "100%",
                    height: 520
                }}
            />
            <View style={styles.container}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: "outfit-bold",
                    textAlign: "center",
                    marginTop: 20
                }}>AI Travel Planner</Text>

                <Text style={{
                    fontFamily: "outfit",
                    fontSize: 17,
                    textAlign: "center",
                    color: Colors.GRAY,
                    marginTop: 20
                }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda omnis officia quo corporis similique nemo hic, impedit ea tempore ducimus tempora inventore, dolore vitae eveniet enim deserunt. Illum, ut officia!</Text>

                <TouchableOpacity style={styles.button}
                    onPress={() => router.push('auth/sign-in')}
                >
                    <Text style={{
                        color: Colors.WHITE,
                        textAlign: "center",
                        fontFamily: "outfit",
                        fontSize: 17
                    }}>Get Started</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%',
        padding: 25,
    },

    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: "20%"
    }
})  