// sHOW MENU

const showMenu = (togggleId, navId) =>{
    const toggle =document.getElementById(togggleId),
           nav = document.getElementById(navId)
    
     if(toggle && nav){
        toggle.addEventListener('click',() =>{
            nav.classList.toggle('show')
        });
     }      

}

showMenu('nav_toggle','nav_menu')

// ACTIVE & REMOVE ACTIVE
const navLink = document.querySelectorAll('.nav_link')
navLink.forEach(n => n.classList.remove('active'))
function linkaction(){
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')

    const navMenu = document.getElementById('nav_menu')
    navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click',linkaction))