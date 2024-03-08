window.addEventListener("load", vanish);
function vanish() {
  let preLoader = document.querySelector(".loader");
  preLoader.classList.add("disappear");
}
function openAside() {
  let aside = document.getElementById("aside");
  aside.classList.add("active");
}

function closeAside() {
  let aside = document.getElementById("aside");
  aside.classList.remove("active");
}



let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let id = document.getElementById("id");
let total = document.getElementById("total");  
let search = document.getElementById("search");

let mood = "Create";
let tmp;

document.getElementById("create").disabled = true;

[id, title, price, taxes, ads, discount, count, category].forEach((element) => {
  element.addEventListener("input", function () {
    if (
      id.value === "" ||
      title.value === "" ||
      price.value === "" ||
      taxes.value === "" ||
      ads.value === "" ||
      discount.value === "" ||
      count.value === "" ||
      category.value === ""
    ) {
      document.getElementById("create").disabled = true;
    } else {
      document.getElementById("create").disabled = false;
    }
  });
});
function addProduct() {

  if (localStorage.getItem("cruds") === null) {
   allProducts = [];
 } else {
   allProducts = JSON.parse(localStorage.getItem("cruds"));
 }
 let newProduct = {
   id: id.value,
   title: title.value,
   price: price.value,
   taxes: taxes.value,
   ads: ads.value,
   discount: discount.value,
   total: total.innerHTML,
   count: count.value,
   category: category.value,
 };

 if (mood === "Create") {
   if (newProduct.count > 1) {
     for (let i = 0; i < newProduct.count; i++) {
       allProducts.push(newProduct);
     }
   } else {
     allProducts.push(newProduct);
   }
 } else {
   allProducts[tmp] = newProduct;
   mood = "Create";
   document.getElementById("create").innerHTML = "Create";
   count.style.display = "block";
 }


 localStorage.setItem("cruds", JSON.stringify(allProducts));
 clearData();
 renderProducts();
renderItems();
}
const calcTotal = () => {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
  }
};

let allProducts;

function renderProducts(products) {
  calcTotal();
  if (localStorage.getItem("cruds") === null) {
    allProducts = [];
  } else {
    allProducts = JSON.parse(localStorage.getItem("cruds"));
  }
  let table = document.querySelector(".tbody");
  table.innerHTML = "";
  (products || allProducts).forEach((product, index) => {
    table.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.taxes}</td>
                <td>${product.ads}</td>
                <td>${product.discount}</td>
                <td>${product.total}</td>
                <td>${product.count}</td>
                <td>${product.category}</td>
                <td>
                    <div class="row">
                        <div class="col-6">
                           
                            <button class="Btn" onclick="updateData(${index})">Edit 
                            <svg class="svg" viewBox="0 0 512 512">
                              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                          </button>
                      
                      
                        </div>
                        <div class="col-6">
                        <button class="button" onclick="deleteProduct('${product.id}')">
  <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
</button>

                        </div>
                    </div>
                </td>
              </tr>`;
  });
}



function renderItems(products){
  let row =document.getElementById("row");
  row.innerHTML = "";
  (products || allProducts).forEach((product)=>{
    row.innerHTML += 
    `
    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 mt-2 " key="${product.id}">
  
    <div class="product p-2 ">
    <h3>
    ${product.title}
    </h3>
    <span>${product.price}</span>
    <div tabindex="0" class="plusButton" data-id="${product.id}">
  <svg class="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
    <g mask="url(#mask0_21_345)">
      <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
    </g>
  </svg>
</div>
    </div>
    
  </div>
    
    `
  })
  }
renderProducts();

  renderItems();
function clearData() {
  id.value = "";
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
  document.getElementById("create").disabled = true;
}

function updateData(i) {
  title.value = allProducts[i].title;
  price.value = allProducts[i].price;
  taxes.value = allProducts[i].taxes;
  ads.value = allProducts[i].ads;
  category.value = allProducts[i].category;
  id.value = allProducts[i].id;
  discount.value = allProducts[i].discount;
  count.value = allProducts[i].count; // Assuming count needs to be updated as well

  calcTotal();
  count.style.display = "none";
  document.getElementById("create").innerHTML = "Update";

  mood = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}




function deleteProduct(productId) {
  // Find the index of the product with the given ID
  const index = allProducts.findIndex((product) => product.id === productId);
  // If the product exists, delete it
  if (index !== -1) {
    allProducts.splice(index, 1);
    localStorage.setItem("cruds", JSON.stringify(allProducts));
    renderProducts();
    renderItems();
  } else {
    console.log("Product not found");
  }
}

let searchMood = "title";

function getSearchMood(id) {
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
}

function searchData(value) {
  let filteredProducts = [];
  let searchValue = value.toLowerCase(); // Convert search value to lowercase

  if (searchMood === "title") {
    filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    ); // Convert title to lowercase
  } else {
    filteredProducts = allProducts.filter((product) =>
      product.category.toLowerCase().includes(searchValue)
    ); // Convert category to lowercase
  }
  renderProducts(filteredProducts);
  renderItems(filteredProducts);
}


let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
localStorage.setItem("cart", JSON.stringify(cartItems));

function showCart(){
  let tabbod=document.querySelector(".t-bod");
  tabbod.innerHTML = "";
     cartItems.forEach((product)=>{
        
         tabbod.innerHTML +=`
         <tr>
         <td>${product.id}</td>
         <td>${product.title}</td>
         <td>${product.price}</td>
      <td>   <button class="btn btn-danger btn-sm" onclick="deleteProductCart(${product.id})">Delete </button></td>
         </tr>
         `;
 
     })
 }
 showCart();
 
 let btns = document.querySelectorAll(".plusButton");
 btns.forEach((btn) => {
   btn.addEventListener("click", () => {
     let id = btn.dataset.id;
     allProducts.find((product) => {
       if (id === product.id) {
         if (cartItems.some((product) => product.id === id)) {
           alert("Product In Cart");
         } else {
           cartItems.push(product);
           localStorage.setItem("cart", JSON.stringify(cartItems));
         }
       }
     });
     showCart();
   });
 });
function deleteProductCart(id){
  cartItems = cartItems.filter((product) => product.id != id);
  showCart();
     localStorage.setItem("cart", JSON.stringify(cartItems));
}
function openForm(){
  let form =document.getElementById("form");

  form.classList.add("open");
}
function closeForm(){
  let form =document.getElementById("form");

  form.classList.remove("open");
}



function validation(e){
  e.preventDefault();
    var email= document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var erro= document.getElementById("erroremail");
    var error= document.getElementById("errorpassword");

    var text='';



if ( email.indexOf("@")===-1 || email.lenght==0){
    text="! please enter a valid email contains @ and email is required";
    erro.innerHTML=text;
    erro.style.color="red";

     return false;
 }

 else if (password.length<9){
 text="! please enter a valid password contains at least 10";

error.innerHTML=text;

error.style.color="red";
 return false;
 }
 else{


    return true; 
 }

}
var modal = document.getElementById('second');

// Get the modal



window.onclick = function(event) {
    if (event.target == modal) {
      
        modal.close();
    }
}