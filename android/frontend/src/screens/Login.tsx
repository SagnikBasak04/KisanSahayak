import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, } from 'react-native'
import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/AuthContext';
import { EXPO_API_URL } from '@env';

const cropData = [{
  id: 'rice',
  name: 'rice'
}, {
  id: 'wheat',
  name: 'wheat'
}, {
  id: 'corn',
  name: 'corn'
}, {
  id: 'sugarcane',
  name: 'sugarcane'
}, {
  id: 'potato',
  name: 'potato'
}
]

const Login = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const { authUser, setAuthUser } = useAuthContext();
  const [form, setForm] = useState({
    name: '',
    gender: '',
    dob: '',
    phoneno: '',
    password: '',
    crops: [],
  });
  console.log(form);

  const [formType, setFormType] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const isLogin = formType === "login" ? true : false;
  const isRegister = formType === "register" ? true : false;
  //   if (!fontsLoaded)
  //     return <AppLoading/>

  const handleRegister = () => {
    axios.post(`${EXPO_API_URL}/auth/register`, form)
      .then(res => console.log(res))
      .catch(err => console.log(err)
      )
    // dispatch(setUserData(form));
    setForm({
      name: '',
      gender: '',
      dob: '',
      phoneno: '',
      password: '',
      crops: [],
    });
    setFormType("login");
  }

  const handleLogin = async () => {
    const loginForm = { phoneno: form.phoneno, password: form.password }
    const loggedInResponse = await fetch(`${EXPO_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });
    console.log(loggedInResponse)
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);

    if (loggedIn.msg)
      setErrorMessage(loggedIn.msg);
    if (loggedIn.phoneno) {
      dispatch(setUserData(loggedIn));
      setForm({
        name: '',
        gender: '',
        dob: '',
        phoneno: '',
        password: '',
        crops: [],
      });
      await AsyncStorage.setItem("KS-user", JSON.stringify(loggedIn));
      await AsyncStorage.setItem("KS-token", JSON.stringify(loggedIn.token));
      setAuthUser(loggedIn);
      navigation.navigate("MainContainer");
    }

  }

  // const [cropData, setCropData] = useState({
  //   selectedItems: [],
  //   data: [{id:"bana", name:"banana"}, {id:"apple", name:"app"}]
  // })

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    setForm({ ...form, crops: selectedItems }); ``
  }

  return (
    <View>
      <ImageBackground source={require("../../assets/farmer.jpg")}
        style={{ height: "100%" }} />
      <View style={{ flex: 1, position: "absolute", width: "100%" }}>
        <KeyboardAvoidingView
          behavior='position'
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              Sign in to <Text style={{ color: "green" }}>KisanSahayak</Text>
            </Text>
            <Text style={styles.subtitle}>
              Grow Smarter with Real-Time Field Management.
            </Text>
          </View>
          <View style={styles.form}>
            {isRegister && <View style={styles.input}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="default"
                onChangeText={name => setForm({ ...form, name })}
                placeholder="John Doe"
                placeholderTextColor="rgba(255,255,255,0.5)"
                style={styles.inputControl}
                value={form.name} />
            </View>}
            {isRegister && <View style={{ display: "flex", flexDirection: "row", marginBottom: 16 }}>
              <View style={{ width: "45%", marginRight: 15 }}>
                <Text style={styles.inputLabel}>Gender</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="default"
                  onChangeText={gender => setForm({ ...form, gender })}
                  placeholder="M"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  style={styles.inputControl}
                  value={form.gender} />
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.inputLabel}>Date of Birth</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="default"
                  onChangeText={dob => setForm({ ...form, dob })}
                  placeholder="25/12/1994"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  style={styles.inputControl}
                  value={form.dob} />
              </View>
            </View>
            }
            {isRegister && <MultiSelect
              items={cropData}
              uniqueKey='id'
              selectedItems={selectedItems}
              onSelectedItemsChange={onSelectedItemsChange}
              selectText='Select Crops'
              displayKey='name'
              //styleDropdownMenu = {{backgroundColor: "black"}}
              styleDropdownMenuSubsection={{ backgroundColor: "transparent" }}
              styleTextDropdown={{ color: "#fff" }}
              styleInputGroup={{ backgroundColor: "transparent" }}
              styleItemsContainer={{ backgroundColor: "transparent" }}
              searchInputStyle={{ color: "#fff" }}
              submitButtonColor='rgb(34 197 94)'
            />}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Phone No.</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="phone-pad"
                onChangeText={phoneno => setForm({ ...form, phoneno })}
                placeholder="+91-80504 80504"
                placeholderTextColor="rgba(255,255,255,0.5)"
                style={styles.inputControl}
                value={form.phoneno} />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.5)"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
            </View>
            <View style={styles.formAction}>
              <TouchableOpacity
                // onPress={() => {navigation.navigate("Home")}}
                onPress={isLogin ? handleLogin : handleRegister}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>{isLogin ? "Sign in" : "Register"}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {isLogin && <Text style={styles.formLink}>Forgot password?</Text>}
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => {
            formType === "login" ? setFormType("register") : setFormType("login")
          }}
          style={{ marginTop: 'auto' }}>
          {isLogin && <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>}
          {isRegister && <Text style={styles.formFooter}>
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
          </Text>}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    //fontFamily: "poppins",
    //fontWeight: 100,
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 1,
    backgroundColor: "rgba(0,0,0, 0.5)",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    bottom: 0,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    //backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  inputControlhalf: {
    height: 50,
    width: "50%",
    //backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Login
