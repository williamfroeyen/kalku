const categoriesLinks = document.querySelector("#categories");
const categoriesSelect = document.querySelectorAll(".categoryselection");

categoriesSelect.forEach(item => {

    item.addEventListener("click", () => {

        categoriesSelect.forEach(element => {
            if (element.classList[1] != item.classList[1] ) {
                element.classList.remove("categoryselected");
            } else {
                element.classList.add("categoryselected");
            }
        });

        for (const child of categoriesLinks.children) {
            if (item.classList[1] == "catalle") {
                child.classList.remove("hidden");
            } else if (child.classList.contains(item.classList[1])) {
                child.classList.remove("hidden");
            } else {
                child.classList.add("hidden");
            };
        };
    });
});
