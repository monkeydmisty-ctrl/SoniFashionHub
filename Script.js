let products = JSON.parse(localStorage.getItem("products")) || [];

const ADMIN_USERNAME = "simba";
const ADMIN_PASSWORD = "kalkamaa";

const adminLink = document.getElementById("admin-link");

if (localStorage.getItem("adminLoggedIn") === "true") {
    showAdminPanel();
    adminLink.style.display = "inline-block";
}

function login() {
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;

    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        adminLink.style.display = "inline-block";
        showAdminPanel();
        displayProducts();
    } else {
        alert("Wrong admin credentials!");
    }
}

function logout() {
    localStorage.removeItem("adminLoggedIn");
    adminLink.style.display = "none";
    document.getElementById("product-panel").style.display = "none";
    document.getElementById("login-box").style.display = "block";
    displayProducts();
}

function showAdminPanel() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("product-panel").style.display = "block";
}

function displayProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";

    const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

    products.forEach((product, index) => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <button class="buy-btn">View on Store</button>
            ${isAdmin ? `<button class="delete-btn">Delete</button>` : ""}
        `;

        div.querySelector(".buy-btn").onclick = () => {
            window.open(product.link, "_blank");
        };

        if (isAdmin) {
            div.querySelector(".delete-btn").onclick = () => {
                deleteProduct(index);
            };
        }

        list.appendChild(div);
    });
}

function addProduct() {
    const name = document.getElementById("name").value;
    const image = document.getElementById("image").value;
    const link = document.getElementById("link").value;

    if (!name || !image || !link) {
        alert("Fill all fields");
        return;
    }

    products.push({ name, image, link });
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();

    document.getElementById("name").value = "";
    document.getElementById("image").value = "";
    document.getElementById("link").value = "";
}

function deleteProduct(index) {
    if (!confirm("Delete this product?")) return;
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

displayProducts();