var root = document.querySelector('#root')
var data
fetch('https://iliasnk.github.io/data.json')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    data = json.data
    render(data)

  });
data =
    fetch('https://iliasnk.github.io/data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
var flag_fn = ''; var flag_ln = ''; var flag_ph = 'hidden'; var flag_ab = ''; var flag_ec = ''
function render (data) {
    if (document.getElementById('f_name').checked == true){flag_fn = ''} else {flag_fn = 'hidden'}
    if (document.getElementById('l_name').checked == true){flag_ln = ''} else {flag_ln = 'hidden'}
    if (document.getElementById('phone').checked == true){flag_ph = ''} else {flag_ph = 'hidden'}
    if (document.getElementById('about').checked == true){flag_ab = ''} else {flag_ab = 'hidden'}
    if (document.getElementById('color').checked == true){flag_ec = ''} else {flag_ec = 'hidden'}
    root.innerHTML = `
        <div class="content">
            <div class="table table_head">
                <div class="f_name ${flag_fn}"><strong>First Name</strong></div>
                <div class="l_name ${flag_ln}"><strong>Last Name</strong></div>
                <div class="phone  ${flag_ph}"><strong>Phone number</strong></div>
                <div class="about  ${flag_ab}"><strong>About</strong></div>
                <div class="color  ${flag_ec}"><strong>Eye color</strong></div>
            </div>
            <div style="width: 70px"></div>
        </div>`

    data.forEach(el => {
        root.innerHTML += `
            <div class="content">
                <div class="table">
                    <div class="f_name ${flag_fn}">${el.name.firstName}</div>
                    <div class="l_name ${flag_ln}">${el.name.lastName}</div>
                    <div class="phone  ${flag_ph}">${el.phone}</div>
                    <div class="about  ${flag_ab}">${el.about}</div>
                    <div class="color  ${flag_ec}">
                        <div style="width: 40%">${el.eyeColor}</div>
                        <div class="eye" style="background-color: ${el.eyeColor};"></div>
                    </div>
                </div>
                <div class="ctrl">   
                    <div title="edit" class="upd" id="${el.id}" onclick="Update(this)"></div>
                    <div title="delete" class="del" id="${el.id}" onclick="Delete(this)"></div>
                </div>
            </div>`
});
}

var id 
function Delete(e) {
    var index; var count=0
    data.forEach(el => {
        if (el.id == e.id){
            index = count
        }
        count++
    });
    data.splice(index, 1)
    render(data)
}
function Update (e) {
    id = e.id
    document.getElementById('form_title').innerHTML = id
    data.forEach(element => {
        if (element.id == e.id){
            document.getElementById('FName').value = element.name.firstName
            document.getElementById('LName').value = element.name.lastName
            document.getElementById('Phone').value = element.phone
            document.getElementById('About').value = element.about
            document.getElementById('Color').value = element.eyeColor  
            render(data)
        }
    });
    let form = document.querySelector('.form')
    form.style.zIndex = 1
    form.style.opacity = 1
} 
let cancel = () =>{
    let form = document.querySelector('.form')
            form.style.zIndex = -1
            form.style.opacity = 0
}
function changeArr (){
    data.forEach(element => {
        if (element.id == id){
            element.name.firstName = document.getElementById('FName').value
            element.name.lastName = document.getElementById('LName').value
            element.phone = document.getElementById('Phone').value
            element.about = document.getElementById('About').value
            element.eyeColor =  document.getElementById('Color').value 

            document.getElementById('FName').value = '' 
            document.getElementById('LName').value = ''
            document.getElementById('Phone').value = ''
            document.getElementById('About').value = ''
            document.getElementById('Color').value = ''
            render(data)
            let form = document.querySelector('.form')
            form.style.zIndex = -1
            form.style.opacity = 0
        }
    });
}

function check (e){
    var target = document.querySelectorAll(`.${e.name}`)
    console.log(e.checked)
    if(e.checked == false){
        target.forEach(el =>{
            el.classList.add('hidden')
        })
    }
    else {
        target.forEach(el =>{
            el.classList.remove('hidden')
        })
    }
}

function sort (val) {
    var sortData = JSON.parse(JSON.stringify(data))
    switch (val) {
        case 'fnu' : 
        render(sortData.sort((a, b) => a.name.firstName > b.name.firstName ? 1 : -1))
        break
        case 'fnd' : 
        render(sortData.sort((a, b) => a.name.firstName < b.name.firstName ? 1 : -1))
        break
        case 'lnu' : 
        render(sortData.sort((a, b) => a.name.lastName > b.name.lastName ? 1 : -1))
        break
        case 'lnd' : 
        render(sortData.sort((a, b) => a.name.lastName < b.name.lastName ? 1 : -1))
        break
        case 'pnu' : 
        render(sortData.sort((a, b) => a.phone > b.phone ? 1 : -1))
        break
        case 'pnd' : 
        render(sortData.sort((a, b) => a.phone < b.phone ? 1 : -1))
        break
        case 'abu' : 
        render(sortData.sort((a, b) => a.about > b.about ? 1 : -1))
        break
        case 'abd' : 
        render(sortData.sort((a, b) => a.about < b.about ? 1 : -1))
        break
        case 'ecu' : 
        render(sortData.sort((a, b) => a.eyeColor > b.eyeColor ? 1 : -1))
        break
        case 'ecd' : 
        render(sortData.sort((a, b) => a.eyeColor < b.eyeColor ? 1 : -1))
        break
        case 'def':
        render(data)
        break
        default:
            break;
    }
}
