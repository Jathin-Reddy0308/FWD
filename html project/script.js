// CONTACT
function contactMessage(e) {
    e.preventDefault();
    let msg = document.getElementById("contactMsg");
    msg.innerText = "Message sent! We'll get back to you soon.";
    msg.style.color = "#c0622a";
    e.target.reset();
}

// DONATE
let donateForm = document.getElementById("donateForm");

if (donateForm) {
    donateForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let donation = {
            name: document.getElementById("name").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            food: document.getElementById("food").value.trim(),
            quantity: document.getElementById("quantity").value.trim()
        };

        let data = JSON.parse(localStorage.getItem("donations")) || [];
        data.push(donation);
        localStorage.setItem("donations", JSON.stringify(data));

        let msg = document.getElementById("successMsg");
        msg.innerText = "Thank you! Your donation has been listed.";
        msg.style.color = "#2e7d45";
        donateForm.reset();
        displayDonations();
    });

    function displayDonations() {
        let list = document.getElementById("donationList");
        list.innerHTML = "";
        let data = JSON.parse(localStorage.getItem("donations")) || [];

        if (data.length === 0) {
            list.innerHTML = "<p style='color:#b08060; font-size:14px;'>No donations yet. Be the first to donate!</p>";
            return;
        }

        data.forEach(d => {
            let li = document.createElement("li");
            li.innerHTML = "<strong>" + d.name + "</strong> donated <em>" + d.food + "</em>" +
                (d.quantity ? " &mdash; Qty: " + d.quantity + " servings" : "");
            list.appendChild(li);
        });
    }

    window.clearDonations = function() {
        if (confirm("Are you sure you want to clear all donations?")) {
            localStorage.removeItem("donations");
            document.getElementById("successMsg").innerText = "";
            displayDonations();
        }
    }

    displayDonations();
}

// REQUEST
let requestForm = document.getElementById("requestForm");

if (requestForm) {
    requestForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let request = {
            name: document.getElementById("rname").value.trim(),
            phone: document.getElementById("rphone").value.trim(),
            type: document.getElementById("rtype").value.trim(),
            quantity: document.getElementById("rquantity").value.trim()
        };

        let data = JSON.parse(localStorage.getItem("requests")) || [];
        data.push(request);
        localStorage.setItem("requests", JSON.stringify(data));

        let msg = document.getElementById("reqMsg");
        msg.innerText = "Request submitted! We'll try to connect you with a donor soon.";
        msg.style.color = "#2e7d45";
        requestForm.reset();
        displayRequests();
    });

    function displayRequests() {
        let list = document.getElementById("requestList");
        list.innerHTML = "";
        let data = JSON.parse(localStorage.getItem("requests")) || [];

        if (data.length === 0) {
            list.innerHTML = "<p style='color:#b08060; font-size:14px;'>No requests at the moment.</p>";
            return;
        }

        data.forEach(r => {
            let li = document.createElement("li");
            li.innerHTML = "<strong>" + r.name + "</strong> needs <em>" + r.type + "</em>" +
                (r.quantity ? " &mdash; Qty: " + r.quantity + " servings" : "");
            list.appendChild(li);
        });
    }

    window.clearRequests = function() {
        if (confirm("Are you sure you want to clear all requests?")) {
            localStorage.removeItem("requests");
            document.getElementById("reqMsg").innerText = "";
            displayRequests();
        }
    }

    displayRequests();
}

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    let user = document.getElementById("loginUser").value.trim();
    let pass = document.getElementById("loginPass").value;
    let msg = document.getElementById("loginMsg");

    if (user === localStorage.getItem("user") && pass === localStorage.getItem("pass")) {
        localStorage.setItem("loggedIn", "true");
        msg.innerText = "Login successful! Redirecting...";
        msg.style.color = "#2e7d45";
        setTimeout(() => { window.location.href = "index.html"; }, 800);
    } else {
        msg.innerText = "Incorrect username or password.";
        msg.style.color = "#c0392b";
    }
});

// SIGNUP
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    let user = document.getElementById("signupUser").value.trim();
    let pass = document.getElementById("signupPass").value;
    let msg = document.getElementById("signupMsg");

    if (!user || !pass) {
        msg.innerText = "Please fill in both fields.";
        msg.style.color = "#c0392b";
        return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    msg.innerText = "Account created! You can now log in above.";
    msg.style.color = "#2e7d45";
    e.target.reset();
});