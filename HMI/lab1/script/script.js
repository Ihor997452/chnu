window.onload = function () {

    let discount = document.getElementById("discount");
    let pictureAmount = document.getElementById("pictureAmount");
    let finalPrice = document.getElementById("finalPrice");
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

        calculate();
    }

    pictureSizeSelect.onclick = function () {
        pictureSizeValue = pictureSizeSelect.options[pictureSizeSelect.selectedIndex].value;
        calculate();
    }

    function calculate() {
        let price;
        let amount = parseInt(pictureAmount.value);
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
}
