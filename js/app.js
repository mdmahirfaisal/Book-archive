////////// search input 
const spinner = style => {
    document.getElementById('spinner').style.display = style;
}

// get input id
const searchInput = document.getElementById('input-field');

// search data by pressing enter key
searchInput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("press-enter-key").click();
    }
});
////////// search field area //////////////

const searchInputField = async () => {
    // const searchInput = document.getElementById('input-field');
    const searchText = searchInput.value;

    ////// spinner show ////////
    spinner('block');

    searchInput.value = '';
    const url = ` https://openlibrary.org/search.json?q=${searchText}`;

    const res = await fetch(url);
    const data = await res.json();
    if (data.numFound === 0) {
        const parentDiv = document.getElementById('search-result');
        parentDiv.textContent = '';
        const notFound = document.getElementById('not-found');
        notFound.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
        <h1 class="text-center text-warning">No Result Found </h1>
        <h3 class="text-center">Plase search another book </h3>
        `;
        notFound.appendChild(div);
        spinner('none')
    }
    else if (data.numFound > 0) {
        displaySearchResult(data.docs);
        const notFound = document.getElementById('not-found');
        notFound.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
        <h2 class="text-center">No Result Found </H2>
        `;
    };

    //// vew total and giv result/////
    const vewResult = document.getElementById('vew-result');
    vewResult.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <h3 class="text-center text-dark">Available Total Result Now:(<span class="text-danger">${data.numFound}</span>). </h3>
    <h3 class="text-center text-dark">Giv You Result Now:(<span class="text-danger">${data.docs.length} </span>). </h3>
    `;
    vewResult.appendChild(div);
};
///// display search result///////

const displaySearchResult = books => {
    const parentDiv = document.getElementById('search-result');
    parentDiv.textContent = '';

    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0 shadow p-3">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'No Image  found'}-M.jpg"  class="card-img-top img-fluid">

            <div class="card-body">
            
            <h5 class="card-title">Title: ${book.title ? book.title : 'No title'} </h5>

            <p class="card-text">Author: ${book.author_name ? book.author_name : 'Not found name'}. </p>
            
            <p class="card-text">Publish Year: ${book.publish_year ? book.publish_year : 'Publish date is not show'}. </p>

            <p class="card-text">Publisher:${book.publisher ? book.publisher : 'Publisher details found'}. </p>

            <p class="card-text">Person: ${book.person ? book.person : 'No detail'}. </p>
            
            <p class="card-text"> Subject:${book.subject ? book.subject : 'No detail'}. </p>
            
            <p class="card-text">Place: ${book.place ? book.place : 'No place'} </p>
             
                <p class="card-text">Publisher: ${book.publisher ? book.publisher : 'no Pbulishing'}.</p>

                <p> ${book._version_ ? book._version_ : 'NO version'}
             </div>
             <div class="card-footer">
             <p class="text-muted">Last Modified: ${book.last_modified_i ? book.last_modified_i : 'No modified'}</p>
            </div>
        </div>
        `;
        parentDiv.appendChild(div);
    });
    // spinner hide //
    spinner('none')
};