var root = document.querySelector('#root') //Ссылка на корневой див для таблицы
var data // массив объектов полученных из JSON
var flag_fn = ''; var flag_ln = ''; var flag_ph = 'hidden'; var flag_ab = ''; var flag_ec = ''// Флаги для отображения столбцов
var p_num = 1 // индекс страницы
var max_p //колличество страниц
var id // ид последнего обработанного эллемента массива объектов
var s_ind // индекс  первого эллемента текущей страницы
var e_ind // индекс последнего эллемента текущей страницы
var p_mod = 5 // колличество эллементов на странице

fetch('https://iliasnk.github.io/data.json')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    data = json.data
    render(data)

  });

let render = (data) => {  //Функция отображения таблицы
    //Проверка состояния чекбоксов отображения
    if (document.getElementById('f_name').checked == true){flag_fn = ''} else {flag_fn = 'hidden'} 
    if (document.getElementById('l_name').checked == true){flag_ln = ''} else {flag_ln = 'hidden'}
    if (document.getElementById('phone').checked == true){flag_ph = ''} else {flag_ph = 'hidden'}
    if (document.getElementById('about').checked == true){flag_ab = ''} else {flag_ab = 'hidden'}
    if (document.getElementById('color').checked == true){flag_ec = ''} else {flag_ec = 'hidden'}

    //Добавляем загаловок таблицы
    root.innerHTML = `
    <div class="users"><h1>List of Users</h1></div>
        <div class="content">
            
            <div class="table table_head">
                <div class="f_name ${flag_fn}" onclick="sort(this.id)" id="fnu" title="Sort by First Name"><strong>First Name</strong></div>
                <div class="l_name ${flag_ln}" onclick="sort(this.id)" id="lnu" title="Sort by Last Name"><strong>Last Name</strong></div>
                <div class="phone  ${flag_ph}" onclick="sort(this.id)" id="pnu" title="Sort by phone"><strong>Phone number</strong></div>
                <div class="about  ${flag_ab}" onclick="sort(this.id)" id="abu" title="Sort by about"><strong>About</strong></div>
                <div class="color  ${flag_ec}" onclick="sort(this.id)" id="ecu" title="Sort by eye color"><strong>Eye color</strong></div>
            </div>
            <div style="width: 70px"></div>
        </div>`
        //Считаем 
        let len = data.length
        s_ind = (p_num * p_mod) - p_mod
        if (len < (s_ind + p_mod)) {
            e_ind = (len % s_ind) + s_ind
        }
        else{
            e_ind = s_ind + p_mod
        }  

        data.slice(s_ind, e_ind).forEach(el => {
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
    root.innerHTML +=   `<div class="pagination">
                            <div class="prev" onclick="if(p_num > 1) p_num--; render(data)"> << </div>
                        </div>`
    let pagination = document.querySelector(".pagination")
    max_p = Math.ceil(data.length / p_mod)
    p_num=Number(p_num)
    let s
    let e
    if (p_num < 3){s=0; e=5} else {s=p_num - 3; e=p_num + 2}
    if (p_num > max_p - 2){s=max_p-5; e=max_p}
    if(max_p > 5){
    for (let i = s; i < e; i++) {
        let sel = 'page'
        if(i+1 == p_num){
            sel = 'selected'
        }
        pagination.innerHTML+=`<div class="${sel}" onclick="p_num = this.innerHTML; render(data)">${i+1}</div>` 
    }}
    else{
        for (let i = 0; i < max_p; i++){
            let sel = 'page'
            if(i+1 == p_num){
            sel = 'selected'
            }
            pagination.innerHTML+=`<div class="${sel}" onclick="p_num = this.innerHTML; render(data)">${i+1}</div>`
        }
    }
    pagination.innerHTML+='<div class="next" onclick="if(p_num < max_p)p_num++; render(data)"> >> </div>'
}

let Create = (e) =>{
    let id = data.length.toString()
    data.push({
        "id": id,
      "name": {
        "firstName": "",
        "lastName": ""
      },
      "phone": "",
      "about": "",
      "eyeColor": ""    
    })
    render(data)
    Update({id : id})

}
function Delete(e) {
    var index; var count=0
    if (confirm("Are you shure?"))
    {data.forEach(el => {
        if (el.id == e.id){
            index = count
        }
        count++
    });
    data.splice(index, 1)
    render(data)}
}
function Update (e) {
    id = e.id
    document.getElementById('form_title').innerHTML = `ID &nbsp${id}`
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
    switch (val) {
        case 'fnu' : 
        render(data.sort((a, b) => a.name.firstName > b.name.firstName ? 1 : -1))
        document.getElementById('fnu').id = 'fnd'
        break
        case 'fnd' : 
        render(data.sort((a, b) => a.name.firstName < b.name.firstName ? 1 : -1))
        break
        case 'lnu' : 
        render(data.sort((a, b) => a.name.lastName > b.name.lastName ? 1 : -1))
        document.getElementById('lnu').id = 'lnd'
        break
        case 'lnd' : 
        render(data.sort((a, b) => a.name.lastName < b.name.lastName ? 1 : -1))
        break
        case 'pnu' : 
        render(data.sort((a, b) => a.phone > b.phone ? 1 : -1))
        document.getElementById('pnu').id = 'pnd'
        break
        case 'pnd' : 
        render(data.sort((a, b) => a.phone < b.phone ? 1 : -1))
        break
        case 'abu' : 
        render(data.sort((a, b) => a.about > b.about ? 1 : -1))
        document.getElementById('abu').id = 'abd'
        break
        case 'abd' : 
        render(data.sort((a, b) => a.about < b.about ? 1 : -1))
        break
        case 'ecu' : 
        render(data.sort((a, b) => a.eyeColor > b.eyeColor ? 1 : -1))
        document.getElementById('ecu').id = 'ecd'
        break
        case 'ecd' : 
        render(data.sort((a, b) => a.eyeColor < b.eyeColor ? 1 : -1))
        break
        case 'def':
        render(data)
        break
        default:
            break;
    }
}



