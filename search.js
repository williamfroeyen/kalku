fetch('/search-index.json')
  .then(res => res.json())
  .then(data => {
    const fuse = new Fuse(data, { keys: ["title", "category"], threshold: 0.3 });

    const searchresultlist = document.querySelector("#searchresultlist");
    const input = document.querySelector("#searchinput");
    const searchresultfield = document.querySelector("#searchresultfield");

    input.addEventListener("input", () => {
        const results = fuse.search(input.value);

        if (results.length > 8) { results.length = 8;};

        searchresultlist.innerHTML = "";

        if (results.length > 0) { 
            results.forEach(r => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                li.classList.add("searchlistelement");
                a.href = r.item.url;
                a.textContent = r.item.title;
                li.appendChild(a);
                searchresultlist.appendChild(li);
            });
            searchresultfield.classList.remove("hidden");

        } else if (input.value != "") {
            const li = document.createElement("li");
            li.textContent = "Ingen resultater funnet";
            searchresultlist.appendChild(li);
            searchresultfield.classList.remove("hidden");

        } else if (input.value == "") {
            searchresultfield.classList.add("hidden");
        }
    });
});
