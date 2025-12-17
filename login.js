// SHA-256 hashing function
    async function hashPassword(password) {
        const msgBuffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    }

    // Users + Hashed Passwords
    const users = [
        {password: "dbbb351abddfbe701bd5aa9f13567a5d0c27fb57038171178f2b921c870af32e" }, // pass: Mandavi
    ];

    async function login() {
        const pwd = document.getElementById("password").value;

        const hashed = await hashPassword(pwd);

        console.log("Entered Password (Hashed):", hashed); 

        const userFound = users.find(u =>  u.password === hashed);

        if (userFound) {
            alert(`🔓 Welcome ! Login Successful.`);
            // Example of redirect
            // window.location.href = "dashboard.html";
            document.getElementById("login").style.display = "none";
            document.getElementById("main").style.display ="block";
        
        } else {
            alert("❌ Access Denied: Wrong Username or Password.");
            document.getElementById("errormsg").innerText = "Incorrect User Name OR Password. please try again.";
        }
    }

    // ⏎ Press Enter to Login
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            login();
        }
    });