import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    update,
    get,
    push
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBmEuRloY4yc9yvKyQ9U2iK8Ob91_zxNkI",
    authDomain: "wecode-a7354.firebaseapp.com",
    databaseURL: "https://wecode-a7354-default-rtdb.firebaseio.com/",
    projectId: "wecode-a7354",
    storageBucket: "wecode-a7354.appspot.com",
    messagingSenderId: "6754148212",
    appId: "1:6754148212:web:bc228ac7650b666ef75621",
    measurementId: "G-8948KFPN92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
let user_now = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        user_now = user;
    } else {
        alert("You must be signed in to post.");
        window.location.href = "login.html";
    }
});

// Form submission handler
document.getElementById("postForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("postTitle").value;
    const description = document.getElementById("postDescription").value;
    const imageFile = document.getElementById("postImage").files[0];

    if (!imageFile) {
        alert("Please select an image to upload.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Image = e.target.result;

        const newPostRef = push(ref(database, 'posts'));
        const postID = newPostRef.key;

        set(newPostRef, {
            title: title,
            author: user_now.displayName || user_now.email || "Anonymous",
            timestamp: Date.now(),
            description: description,
            image: base64Image,
            views: 0,
            ownerID: user_now.uid,
            comments: [],
            postID: postID
        }).then(() => {
            alert("Post added successfully!");
            window.location.href = "index.html";
        }).catch((error) => {
            alert("Failed to add post: " + error.message);
        });

        // Update user's list of authored posts
        const userRef = ref(database, 'users/' + user_now.uid);

        get(userRef).then((snapshot) => {
            const userData = snapshot.val();
            const authorPosts = userData?.author_post || [];
            authorPosts.push(postID);
            update(userRef, {
                author_post: authorPosts
            });
        });
    };

    reader.readAsDataURL(imageFile); // Converts image to base64
});
