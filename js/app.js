////////// search input 

const spinner = style => {
    document.getElementById('spinner').style.display = style;
}

const searchInputField = async () => {
    const searchInput = document.getElementById('input-field');
    const searchText = searchInput.value;

    /// spinner show 
    spinner('block');
    searchInput.value = '';
    const url = ` http://openlibrary.org/search.json?q=${searchText}`;

    const res = await fetch(url);
    const data = await res.json();
    displaySearchResult(data.docs);

};
///// display search result

const displaySearchResult = books => {
    console.log(books.length);


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

            <p class="card-text">Author: ${book.author_name ? book.author_name : 'Not found name'} </p>
            
            <p class="card-text">Publish Date: ${book.publish_date ? book.publish_date : 'Publish date is not show'} </p>

            <p class="card-text">Publisher:${book.publisher ? book.publisher : 'Publisher details found'} </p>

            <p class="card-text">Person: ${book.person ? book.person : 'No detail'} </p>
            
            <p class="card-text"> </p>
             
                <p class="card-text">Publisher: ${book.publisher ? book.publisher : 'no Pbulishing'}.</p>
                <p> ${book._version_ ? book._version_ : 'NO version'}
             </div>
             <div class="">
             <small class="text-muted">Last Modified: ${book.last_modified_i ? book.last_modified_i : 'No modified'}</small>
            </div>
        </div>
        `;
        parentDiv.appendChild(div);
    });
    // spinner hide 
    spinner('none')
};