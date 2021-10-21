const URL = 'http://localhost:3000/names';
const f1 = document.forms[`f1`]
getSel = x => document.querySelector(x)
let tbody = getSel(`.bata`)
const ADD_BTN = f1.button

ADD_BTN.addEventListener(`click`, event => {
  event.preventDefault()
  const NEW_NAME = f1.text.value;
    if (NEW_NAME) {
        const DATA = {
            name: NEW_NAME
      }
        fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(DATA)
        })
            .then(response => response.json())
            .then(data => getNames())
            .catch(err => console.log(err))
    }
})


function getNames() {
  fetch(URL)
      .then(response => response.json())
      .then(data => render(data))
      .catch(err => console.log(err))
}
getNames()

function render(data) {
    const names = data
    tbody.innerHTML = ``
    names.forEach(element => {
      console.log(element.name);
        let template = `
 <div class="check" data-id="${element.id}">
        <input type="checkbox" data-id="${element.id}"> ${element.name}
        </div>`
        tbody.insertAdjacentHTML('beforeend', template)
    });
}

tbody.addEventListener(`click`, event => {
  event.preventDefault()
    if (event.target.dataset.id && tbody.children.length >1) {
        const id = event.target.dataset.id
        fetch(`${URL}/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => getNames())
        .catch(err => console.log(err))
        console.log(data);
    }
    else{
      alert(`last element cant be deleted`)
    }
   
})
