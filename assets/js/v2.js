var checkboxes = document.querySelectorAll(".categories input");
console.log(checkboxes)
console.log("hi")
for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", filter);
}
var radios = document.getElementsByName("operation");
for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", filter);
}

filter();

function filter() {
    var i, j;

    // Choose an operation
    var operation = document.getElementById("op-union").checked ? "union" : "intersection";
    if (operation == "union") {
        document.getElementById("union").classList.add("active");
        document.getElementById("intersection").classList.remove("active");
    } else {
        document.getElementById("intersection").classList.add("active");
        document.getElementById("union").classList.remove("active");
    }
    // Get the selected categories
    var checkboxes = document.querySelectorAll(".categories input");
    var categories = [];
    var c;
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            c = checkboxes[i].value;
            categories.push(c);
            checkboxes[i].parentElement.classList.add("active");
        } else {
            checkboxes[i].parentElement.classList.remove("active");
        }
    }

    // Apply the filter
    var items = document.querySelectorAll(".bookmark");
    var item, show;
    for (i = 0; i < items.length; i++) {
        item = items[i];
        if (categories.length == 0) {
            show = true;
        } else if (operation == "union") {
            // Union: Only one of the categories needs to exist
            show = false;
            for (j = 0; j < categories.length; j++) {
                if (item.classList.contains(categories[j])) {
                    show = true;
                    break;
                }
            }
        } else {
            // Intersection: All of the categories must apply
            show = true;
            for (j = 0; j < categories.length; j++) {
                if (!item.classList.contains(categories[j])) {
                    show = false;
                    break;
                }
            }
        }

        if (show) {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    }
}