document.addEventListener("DOMContentLoaded", function(){
    const form = document.querySelector(".search-box");
    const input = document.querySelector('input');
    const resultContainer = document.querySelector(".results");
    const resultCounter = document.querySelector("header p");

    form.addEventListener('submit', function(event){
        event.preventDefault();
        const searchTerm = input.value;
        if (searchTerm){
            searchWikipedia(searchTerm);
        }
    });

    function searchWikipedia(searchTerm){
        // const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&search=${encodeURIComponent(searchTerm)}`;
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;
        fetch(url).then(response => response.json()).then(
            data =>{
                displayResults(data.query.search);
            }
        ).catch(err=>console.log("Error : " + err));

    }

    function displayResults(results){
        resultContainer.innerHTML = "";
        resultCounter.textContent = `Results Count : ${results.length}`;
        results.forEach(result => {
            const resultElement = document.createElement("div");
            resultElement.className = "result";
            resultElement.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.snippet}</p>
            <a href="${result.pageid}" target="_blank">Read More</a>`;

            resultContainer.appendChild(resultElement);
        });
    }

});