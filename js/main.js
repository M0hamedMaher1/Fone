let title = document.querySelector(".right-info2 h3");
let price = document.querySelector(".price2 span");
let leftImage = document.querySelector(".left-image2 img");
let overlay2 = document.querySelector(".overlay2");
let over = document.querySelector(".over-row");
let close2 = document.querySelector(".close2");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let counter = document.querySelector(".left-count input")
let choosen = document.querySelector(".choosen");
let cartAside = document.querySelector(".cart");
let close3 = document.querySelector(".close3");
let empty = document.querySelector(".empty");
let last = document.querySelector(".lasted");
let overlay3 = document.querySelector(".overlay3");
let addToCart = document.querySelector(".addToCart");
let total = document.querySelector(".total h5 span")
let basket = document.querySelectorAll("#basket");
let search = document.querySelectorAll("#search");
let close1 = document.querySelector(".close");
let overlay = document.querySelector(".overlay");
let searching = document.querySelector(".search");
let upper = document.querySelector(".uppers");
let apps = document.querySelector(".apps");
let up = document.querySelector("#up");

window.addEventListener("scroll", function () {
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if (x > 200) {
        nav.style.transform = "translateY(0)";
        upper.style.transform = "translateY(0)";
        upper.style.opacity = "1";
        apps.style.transform = "translateY(0)";
    } else {
        nav.style.transform = "translateY(calc(-100% + -1px))";
        upper.style.transform = "translateY(calc(100% + 51px))";
        upper.style.opacity = "0";
        apps.style.transform = "translateY(100%)";
    };
});

upper.addEventListener("click", function(){
    scrollTo(0,0);
});

up.addEventListener("click", function(){
    scrollTo(0,0);
});

search.forEach((item) => {
    item.addEventListener("click", function () {
        overlay.style.display = "block";
        setTimeout(() => {
            searching.style.transform = "translateY(0)";
            searching.style.opacity = "1";
        }, 100);
    });
});

close1.addEventListener("click", function () {
    searching.style.transform = "translateY(-100%)";
    searching.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 400);
});

let row = document.querySelector(".products-row");
let spanCount = document.querySelectorAll("#basket span");

let list = [];
let index1;

let cart;
if (localStorage.getItem("food") == null) {
    cart = [];
    displayProducts();
    checks();
} else {
    cart = JSON.parse(localStorage.getItem("food"));
    displayProducts();
    checks();
}

let getData = async function () {
    let api = await fetch("data.json");
    let response = await api.json();
    let products = response.products;
    list = products;
    displayThings(products);
};
getData();

function displayThings(take) {
    let card = "";
    take.forEach((item, index) => {
        card += `
        <div class="card2">
        <div class="image">
            <img src="${item.image1}" alt="">
            <img src="${item.image2}" alt="" class="img2">
            <div class="icons">
                <div class="icon1" onclick="addtocart(${index})"><i class="fa-solid fa-bag-shopping"></i></div>
                <div class="icon2" onclick="openInfo(${index})"><i class="fa-solid fa-magnifying-glass"></i></div>
                <div class="icon3"><i class="fa-regular fa-heart"></i></div>
            </div>
        </div>
        <div class="card-body">
            <h4>${item.name}</h4>
            <div class="disc">
                <span class="discount">
                ${item.disc}
                </span>
                <span class="price">
                    $${item.price}
                </span>
            </div>
        </div>
        </div>
        `
    });
    row.innerHTML = card;
};

function searchProducts(searching){
    let card = "";
    list.forEach((item, index) => {
        if(item.name.includes(searching.trim())){
            card+= `
            <div class="card2">
            <div class="image">
                <img src="${item.image1}" alt="">
                <img src="${item.image2}" alt="" class="img2">
                <div class="icons">
                    <div class="icon1" onclick="addtocart(${index})"><i class="fa-solid fa-bag-shopping"></i></div>
                    <div class="icon2" onclick="openInfo(${index})"><i class="fa-solid fa-magnifying-glass"></i></div>
                    <div class="icon3"><i class="fa-regular fa-heart"></i></div>
                </div>
            </div>
            <div class="card-body">
                <h4>${item.name}</h4>
                <div class="disc">
                    <span class="discount">
                    ${item.disc}
                    </span>
                    <span class="price">
                        $${item.price}
                    </span>
                </div>
            </div>
            </div>
            `
        };
    });
    row.innerHTML = card;
};

function openInfo(index) {
    index1 = index;
    overlay2.style.display = "flex";
    setTimeout(() => {
        over.style.transform = "translateY(0)";
        over.style.opacity = "1";
    }, 100);
    price.textContent = list[index].price;
    title.textContent = list[index].name;
    leftImage.src = list[index].image1
};

close2.addEventListener("click", function () {
    over.style.opacity = "0";
    over.style.transform = "translateY(-30%)";
    setTimeout(() => {
        overlay2.style.display = "none";
        counter.value = 1;
    }, 400);
});

plus.addEventListener("click", function () {
    counter.value++;
});

minus.addEventListener("click", function () {
    counter.value--;
    if (counter.value < 1) {
        counter.value = 1;
    };
});

function addtocart(index) {
    let choosenProduct = list[index];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if (final) {
        final.count++
    } else {
        cart.push({
            ...choosenProduct,
            count: 1
        });
    };
    checks();
    displayProducts();
    localStorage.setItem("food", JSON.stringify(cart));
};

addToCart.addEventListener("click", function () {
    let choosenProduct = list[index1];
    let final = cart.find((item) => item.id = choosenProduct.id);
    if (counter.value > 1 && final) {
        final.count = counter.value;
    } else {
        cart.push({
            ...choosenProduct,
            count: 1
        });
    };
    checks();
    displayProducts();
    localStorage.setItem("food", JSON.stringify(cart));
});

basket.forEach((item) => {
    item.addEventListener("click", function () {
        overlay3.style.display = "flex";
        setTimeout(() => {
            cartAside.style.transform = "translateX(0)";
            cartAside.style.opacity = "1";
        }, 100);
    });
});

close3.addEventListener("click", function(){
    cartAside.style.transform = "translateX(100%)";
    cartAside.style.opacity = "0";
    setTimeout(() => {
        overlay3.style.display = "none";
    }, 400);
});

function displayProducts() {
    let card = "";
    let counter = 0;
    for (let i = 0; i < cart.length; i += 1) {
        counter += cart[i].price * cart[i].count;
    };
    cart.forEach((item, index) => {
        card += `
        <div class="card4">
        <img src="${item.image1}" alt="">
        <div class="right-pays">
            <h4>${item.name}</h4>
            <h5>QTY: ${item.count}</h5>
            <span>$${item.price}</span>
        </div>
        <i class="fa-regular fa-trash-can" onclick="deleteElement(${index})" id="trash"></i>
        </div>
        `
    });
    choosen.innerHTML = card;
    total.textContent = counter;
};
displayProducts();

function deleteElement(index) {
    cart.splice(index, 1);
    localStorage.setItem("food", JSON.stringify(cart));
    displayProducts();
    checks();
};

function checks() {
    if (cart.length == 0) {
        empty.style.display = "block";
        last.style.display = "none";
        spanCount.forEach((item) => {
            item.innerHTML = 0;
        });
    } else {
        empty.style.display = "none";
        last.style.display = "block";
        spanCount.forEach((item) => {
            item.innerHTML = cart.length;
        });
    };
};

let toTop = document.querySelectorAll(".toTop");
let toBot = document.querySelectorAll(".toBot");
let cards = document.querySelectorAll(".cards-row");

toTop.forEach((item, index) => {
    item.addEventListener("click", function(){
        cards[index].scrollBy(0, -100);
    });
});

toBot.forEach((item, index) => {
    item.addEventListener("click", function(){
        cards[index].scrollBy(0, 100);
    });
});

let bars = document.querySelectorAll(".bars");
let aside1 = document.querySelector(".aside1");
let overlay4 = document.querySelector(".overlay4");
let closeIt = document.querySelector(".closeIt");

bars.forEach((item) => {
    item.addEventListener("click", function(){
        overlay4.style.display = "block";
        setTimeout(() => {
            aside1.style.opacity = "1";
            aside1.style.transform = "translateX(0)";
        }, 100);
    });
});

closeIt.addEventListener("click", function(){
    aside1.style.transform = "translateX(-100%)";
    aside1.style.opacity = "0";
    setTimeout(() => {
        overlay4.style.display = "none";
    }, 400);
});