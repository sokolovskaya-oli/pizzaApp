const pizzaBox = document.querySelector('.pizza_container');
const btnLoading = document.querySelector('.loading_btn')
const caption = document.querySelector('.descriptions')
const pizzaBlock = document.querySelector('.pizza_wrapper')
const preloader=document.querySelector('.preloader');

async function GetFriends () {    
    const url = 'https://gp-js-test.herokuapp.com/pizza';
    const response = await fetch(url)
    const data = await response.json()
    return data
}
let countEatingPizza = 0

btnLoading.addEventListener('click', function(){
    preloader.classList.toggle('done')
  
    GetFriends().then(eaters=> {
        eaters.party.forEach(item=> item.eatsPizza == true ? countEatingPizza += 1 : null)  
        preloader.classList.toggle('done')
        btnLoading.classList.remove('loading')
        pizzaBlock.style.display = 'flex';
        pizzaBox.innerHTML='';
       let countFriends = eaters.party.length;
       let sliseStep = 360/countEatingPizza ;
       let part=countEatingPizza/2
           for(let i = 0; i < part; i++){ 
               let cutLine = document.createElement('div')
               cutLine.classList.add('cut_line')
               pizzaBox.appendChild(cutLine)
               cutLine.style.transform = `rotate(${sliseStep*i}deg)`
               caption.innerHTML=`<p class="count_friends">Количество участников вечеринки: ${countFriends} человек</p>
                                <p class="count_friends">Количество поедателей пиццы: ${countEatingPizza} человек</p>`
            
    }
   })
   
})
 