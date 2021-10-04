window.onload = function () {
    part1();
    part2();
    part3();
}

function part1() {
    let discount = document.getElementById("discount");
    let finalPrice = document.getElementById("finalPrice");
    let pictureAmount = document.getElementById("pictureAmount");
    let pictureSizeSelect = document.getElementById("pictureSize");
    let pictureSizeValue = pictureSizeSelect.options[pictureSizeSelect.selectedIndex].value;

    pictureAmount.onkeypress = pictureAmount.onkeyup = function () {
        let len = pictureAmount.value.length;
        let lastChar = pictureAmount.value.substring(len - 1, len);

        if (isNaN(pictureAmount.value) || lastChar === ' ' || len > 3) {
            pictureAmount.value = pictureAmount.value.substring(0, len - 1);
        }

        let amount = parseInt(pictureAmount.value);
        if (amount < 10) {
            discount.innerText = "00";
        } else if (amount > 30) {
            discount.innerText = "30";
        } else if (amount > 20) {
            discount.innerText = "20";
        } else if (amount > 10) {
            discount.innerText = "10";
        }

        calculate(pictureAmount, discount, pictureSizeValue, finalPrice);
    }

    pictureSizeSelect.onclick = function () {
        pictureSizeValue = pictureSizeSelect.options[pictureSizeSelect.selectedIndex].value;
        calculate(pictureAmount, discount, pictureSizeValue, finalPrice);
    }
}

function part2() {
    let discount = document.getElementById("discount_2");
    let pictureAmount = document.getElementById("pictureAmount2");
    let buttonAdd = document.getElementById("more");
    let buttonRemove = document.getElementById("less");
    let checkBoxes = document.getElementsByName("size");
    let finalPrice = document.getElementById("finalPrice_2");
    let pictureSizeValue = "10x15";

    buttonAdd.onclick = increment;
    buttonRemove.onclick = decrement;

    for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].onclick = validateCheckbox;
    }
    function validateCheckbox() {
        for(let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
        }

        this.checked = true;
        pictureSizeValue = this.value;
        calculate(pictureAmount, discount, pictureSizeValue, finalPrice);
    }

    function increment() {
        let amount = parseInt(pictureAmount.innerText);
        if (amount < 1000) {
            amount++;
        }
        pictureAmount.innerText = amount.toString();
        updateDiscount(amount);
        calculate(pictureAmount, discount, pictureSizeValue, finalPrice);
    }

    function decrement() {
        let amount = parseInt(pictureAmount.innerText);
        if (amount > 0) {
            amount--;
        }
        pictureAmount.innerText = amount.toString();
        updateDiscount(amount);
        calculate(pictureAmount, discount, pictureSizeValue, finalPrice);
    }

    function updateDiscount(amount) {
        if (amount < 10) {
            discount.innerText = "00";
        } else if (amount > 30) {
            discount.innerText = "30";
        } else if (amount > 20) {
            discount.innerText = "20";
        } else if (amount > 10) {
            discount.innerText = "10";
        }
    }
}

function part3() {
    let pictureAmount = document.getElementById("pictureAmount3");
    let amount = document.getElementById("amount");
    let size = document.getElementById("sizeOut");
    let discount = document.getElementById("discount_3");
    let finalPrice = document.getElementById("finalPrice_3");
    let sizeSlider = document.getElementById("sizeVal");
    let pictureSizeValue = "10x15";

    amount.onchange = function () {
        pictureAmount.innerText = amount.value;
        updateDiscount(amount.value);
        calculate(pictureAmount, discount, pictureSizeValue, finalPrice);
    }
    sizeSlider.onchange = function () {
        let displayValue = "";
        switch (sizeSlider.value) {
            case "0":
                displayValue = "10x15";
                break;
            case "1":
                displayValue = "15x20";
                break
            case "2":
                displayValue = "20x30";
                break;
        }
        size.innerText = displayValue;
        pictureSizeValue = displayValue;
        calculate(pictureAmount, discount, pictureSizeValue, finalPrice);
    }


    function updateDiscount(amount) {
        if (amount < 10) {
            discount.innerText = "00";
        } else if (amount > 30) {
            discount.innerText = "30";
        } else if (amount > 20) {
            discount.innerText = "20";
        } else if (amount > 10) {
            discount.innerText = "10";
        }
    }
}

function calculate(pictureAmount, discount, pictureSizeValue, finalPrice) {
    let price;

    let amount = 0;
    if (isNaN(parseInt(pictureAmount.innerText))) {
        amount = parseInt(pictureAmount.value);
    } else {
        amount = parseInt(pictureAmount.innerHTML);
    }
    let picturePrice = 0.99;
    let discountVal = parseInt(discount.innerText) / 100;

    if (pictureSizeValue === "15x20") {
        picturePrice = picturePrice * 1.5;
    } else if (pictureSizeValue === "20x30") {
        picturePrice = picturePrice * 2.0;
    }

    price = picturePrice * amount * (1.0 - discountVal);

    if (isNaN(price)) {
        finalPrice.innerText = "00.00";
    } else {
        finalPrice.innerText = price.toFixed(2);
    }
}