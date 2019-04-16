import firebase from 'firebase/app'

const config = {
    apiKey: "AIzaSyBpK3GRbORmhZg8wirLM1JskDGovYw4n8g",
    authDomain: "portafolio-4b06f.firebaseapp.com",
    databaseURL: "https://portafolio-4b06f.firebaseio.com",
    projectId: "portafolio-4b06f",
    storageBucket: "portafolio-4b06f.appspot.com",
    messagingSenderId: "215411496809"
}

//funcion para inicializar firebase y luego instanciarla
const initFirebase = ()=> firebase.initializeApp(config)

initFirebase()