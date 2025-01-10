// General Scripts
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "FIREBASE API KEY HERE",
    authDomain: "cnsc-ai-chatbot.firebaseapp.com",
    databaseURL: "https://cnsc-ai-chatbot-default-rtdb.firebaseio.com",
    projectId: "cnsc-ai-chatbot",
    storageBucket: "cnsc-ai-chatbot.appspot.com",
    messagingSenderId: "492203759858",
    appId: "1:492203759858:web:d24b65fc3a5b75ac25986b",
    measurementId: "G-WDBYRMY7KD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get ref to database services
 const db = getDatabase(app);

// Get user credentials
document.getElementById("loginBtn").addEventListener('click', function(e) {
    e.preventDefault();
    let stuId = document.getElementById("stuid").value;
    let userpassword = document.getElementById("password").value;
    let userRef = ref(db, 'user/' + stuId);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("id:", data.uId);
            console.log("User exists!")
            if (data.uId == stuId && data.password === userpassword) {
                window.open("home.html", "_self");
            } else {
                alert("wrong password")
            }
            console.log("name:", data.name);
            // console.log("password:", data.password);
            // alert(data.id)

        } else {
            console.log("No data found for this user");
            alert("No data found for this user")
        }
      }).catch((error) => {
        alert("Error retrieving data:", error)
        console.error("Error retrieving data:", error);
      });
});
