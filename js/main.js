var str = '';
var tbody = document.getElementById("tbody");
var productsList = [];
var productIndex = -1;
var productName = document.getElementById("ProductName");
var productCategory = document.getElementById("ProductCategory");
var productPrice = document.getElementById("ProductPrice");
var productDescription = document.getElementById("ProductDescription");



function addProduct() {
    var productNameVal = productName.value;
    var productCategoryVal = productCategory.value;
    var productPriceVal = productPrice.value;
    var productDescriptionVal = productDescription.value;
    if (validation(productNameVal, productCategoryVal, productDescriptionVal, productPriceVal)) {

        productIndex++;
        var singleProduct = {
            'pIndex': productIndex,
            'pname': productNameVal,
            'pCategory': productCategoryVal,
            'pPrice': productPriceVal,
            'pDesc': productDescriptionVal
        };

        productsList.push(singleProduct);
        clearForm();
        displayProducts();
        alert("data inserted successfully")
    }
}
displayProducts();

function clearForm() {
    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';
    productDescription.value = '';
}

function validation(productNameVal, productCategoryVal, productDescriptionVal, productPriceVal) {
    if (productNameVal.length == 0 || productCategoryVal.length == 0 ||
        productDescriptionVal.length == 0 || productPriceVal.length == 0
    ) {
        alert("please fill filed");
        return false;
    }
    return true;
}

function displayProducts() {
    str = '';
    if (productsList.length != 0) {
        for (var count = 0; count < productsList.length; count++) {
            str += `<tr>
    <td>${productsList[count].pIndex}</td>
    <td>${productsList[count].pname}</td>
    <td>${productsList[count].pCategory}</td>
    <td>${productsList[count].pPrice}</td>
    <td>${productsList[count].pDesc}</td> 
    <td>
        <button class="btn btn-outline-success" onclick=updateProducts(${productsList[count].pIndex}) > 
<i class="fa-solid fa-pen-to-square"></i>
</button>
    </td>
    <td>
        <button class="btn btn-outline-danger" onclick=" deleteProduct(${productsList[count].pIndex})" > <i class = "fa-solid fa-trash" ></i> </button > </td> < /tr > `;
        }
    } else {
        str = ` <tr>
                <td colspan = "7" > No Data Exist </td> </tr > `;
    }

    tbody.innerHTML = str;
}

function deleteProduct(Index) {
    alert("deleted!");
    productsList.splice(Index, 1);
    displayProducts();
}

function addNewProduct() {

    document.getElementById("add").style.display = "block";
    document.getElementById("update").style.display = "none";
    clearForm();
}
var updateIndex = -1;

function updateProducts(index) {
    updateIndex = index;
    productCategory.value =
        productsList[index].pCategory;
    productDescription.value = productsList[index].pDesc;
    productName.value = productsList[index].pname;
    productPrice.value = productsList[index].pPrice;
    document.getElementById("add").style.display = "none";
    document.getElementById("update").style.setProperty("display", "inline-block", "important");;

}

function updateProduct() {
    console.log(updateIndex)
    var productNameVal = productName.value;
    var productCategoryVal = productCategory.value;
    var productPriceVal = productPrice.value;
    var productDescriptionVal = productDescription.value;
    if (validation(productNameVal, productCategoryVal, productDescriptionVal, productPriceVal)) {

        productsList[updateIndex].pname = productNameVal;
        productsList[updateIndex].pCategory = productCategoryVal;
        productsList[updateIndex].pdesc = productDescriptionVal;
        productsList[updateIndex].pPrice = productPriceVal;
        alert("data updated successfully");
        clearForm();
    } else { alert("please fill filed"); }
    displayProducts();
}

function searchProduct() {
    var str = "";
    var searchedInput = document.getElementById("searchedInput").value;
    var isExist = false;
    for (var count = 0; count < productsList.length; count++) {

        if (productsList[count].pname.toLowerCase().includes(searchedInput.toLowerCase())) {
            isExist = true;
            str += `<tr>
                <td>${productsList[count].pIndex}</td>
    <td>${markSearchedInput(productsList[count].pname,searchedInput)}</td>
    <td>${productsList[count].pCategory}</td>
    <td>${productsList[count].pPrice}</td>
    <td>${productsList[count].pDesc}</td> 
    <td>
        <button class="btn btn-outline-success"> 
<i class="fa-solid fa-pen-to-square"></i>
</button>
    </td>
    <td>
        <button class="btn btn-outline-danger" onclick=" deleteProduct(${productsList[count].pIndex})" > <i class = "fa-solid fa-trash" ></i> </button> </td> </tr> `;

        }

    }
    if (!isExist) {
        str = ` <tr>
                <td colspan = "7" > No Data Exist </td> </tr> `;
    }
    tbody.innerHTML = str;

}

function markSearchedInput(originStr, SearchedInput) {
    var arrIndex = [];
    var isSearchInExist = false;

    for (var count = 0; count < originStr.length - SearchedInput.length; count++) {
        if (originStr.substr(count, SearchedInput.length).toLowerCase() == SearchedInput.toLowerCase()) {

            arrIndex.push(count);
            console.log(`count${count},${}`)
            isSearchInExist = true;
        }
    }
    if (isSearchInExist) {
        return insertMarkToExistSearchInput(arrIndex, originStr, SearchedInput);
    }
    return originStr;

}

function insertMarkToExistSearchInput(arr, originStr, searchedInput) {
    var parseStrToArr = [];
    parseStrToArr = originStr.split((""));
    for (var count = 0; count < arr.length; count++) {
        parseStrToArr.splice(count, 0, "<mark>");
        parseStrToArr.splice(count + searchedInput.length + (count * 13), 0, "</mark>");

    }
    return parseArrToStr(parseStrToArr);
}

function parseArrToStr(arr) {
    var str = "";
    for (var count = 0; count < arr.length; count++) {
        str += arr[count];
    }
    return str;
}