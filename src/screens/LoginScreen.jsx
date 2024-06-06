import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet } from 'react-native';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigation.navigate('Trivia');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../components/img/TRIVIAQ.png')} // Coloque o caminho correto para sua imagem
                style={styles.logo} // Defina o estilo da imagem conforme necessário
            />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password}
                onChangeText={setPassword} secureTextEntry />
            <Button
                title="Login"
                onPress={handleLogin}
                color="#FBCA3F" // Defina a cor do botão
            />
            {error ? <Text>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9F0FE', // Defina a cor de fundo
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
});
