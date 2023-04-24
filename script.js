async function getData() {
  const res = await fetch(APIurl);
  const data = await res.json();
  return data;
}
const books = document.getElementById("books");

const APIurl = "https://www.anapioficeandfire.com/api/books";

(async () => {
  const bookData = await getData();
  bookData.map(displaybook);
  async function displaybook(x) {
    try {
      const response = await fetch(x.url);
      const data = await response.json();
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      let book = document.createElement("div");
      book.style.backgroundColor = "#" + randomColor;
      book.classList.add("book");

      book.innerHTML = `<div class="namee"> 
        ${x.name} 
        </div> <div> ISBN : 
        ${x.isbn} 
        </div><div>Pages : 
        ${x.numberOfPages} 
        </div><div >Publisher :  
        ${x.publisher} 
        </div><div> 
        ${x.released} 
        </div>`;
      let author = document.createElement("div");
      author.classList.add("author");
      for (let i of x.authors) {
        let auth = document.createElement("div");
        auth.classList.add("auth");
        auth.innerHTML = i;
        author.appendChild(auth);
      }

      let character = document.createElement("div");
      character.classList.add("character");

      for (let i = 0; i < 5; i++) {
        let ch = await getcharacters(x.characters[i]);

        let char = document.createElement("div");
        char.classList.add("char");
        if (ch != "") {
          char.innerHTML = ch;
          character.appendChild(char);
        }
      }

      book.appendChild(author);
      book.appendChild(character);
      books.appendChild(book);
    } catch (e) {
      console.log(e);
    }
  }
})();
async function getcharacters(x) {
  const resp = await fetch(x);
  const data = await resp.json();
  return data.name;
}

//Search Logic
function search() {
  var input = document.getElementById("myInput");
  var filter = input.value.toUpperCase();
  var book = books.getElementsByClassName("book");
  for (i = 0; i < book.length; i++) {
    var a = book[i].getElementsByClassName("namee")[0];
    var txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      book[i].style.display = "";
    } else {
      book[i].style.display = "none";
    }
  }
}
