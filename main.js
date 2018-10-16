//Get Elements 
const itemForm=document.getElementById('itemForm');
const itemInput=document.getElementById('itemInput');
const itemList=document.querySelector('.item-list');
const clearBtn=document.getElementById('clear-list');
const feedback=document.querySelector('.feedback');



//let itemData=[];
//Getting the data from local storage 
let itemData=JSON.parse(localStorage.getItem('list')) || [];
//Check if their is a storage in the local storage
if(itemData.length>0){
    itemData.forEach(function(item){
        itemList.insertAdjacentHTML('beforeend',`
        <div class='item my-3'>
        <h5 class="item-name text-capitalize">${item}</h5>
        <div class="item-icons">
        <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
        <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
        <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div>
      </div>
              
        `);
        handleItem(item);

    });
};
 
//Listen for Form Submittion 
//Check for default form submition and check if the input is empty
itemForm.addEventListener('submit',function(event){
    event.preventDefault();
    const textValue=itemInput.value;
    // console.log(textValue);

    //Check to see if the input is empty
    //If it is Display a message
    if(textValue === ''){
        showFeedBack('Please Enter Something','danger');
    }
    else{
        //Add the item 
        addItem(textValue);
        //Clear the form 
        //Set to an empty strings so that its empty
        itemInput.value='';
        //Add to the item list-- We are going to use local storage letter
        itemData.push(textValue);
        localStorage.setItem('list',JSON.stringify(itemData));

        handleItem(textValue);

    }

});

function showFeedBack(msg,action){
    //Add a class to feedback by default in the CSS the feedback was set to none 
    //Add a bootstrap class 'alert' and then the action that we need 
    feedback.classList.add('showItem',`alert-${action}`);
    feedback.innerHTML=`<p>${msg}</p>`
    setTimeout(function(){
        feedback.classList.remove('showItem',`alert-${action}`);
    },2000);
};


//Addi tem Funciton 

function addItem(item){
    const div=document.createElement('div');
    div.classList.add('item','my-3');
    div.innerHTML=`
    <h5 class="item-name text-capitalize">${item}</h5>
      <div class="item-icons">
       <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
       <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
       <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
      </div>
    `
    itemList.appendChild(div);
}

// Function to handle icon events
function handleItem(textValue){
    const items=itemList.querySelectorAll('.item')
    console.log(items);
    items.forEach(function(item){
        if(item.querySelector('.item-name').textContent===textValue){
            //Giving functionality to Icons
            //Complete
            item.querySelector('.complete-item').addEventListener('click',function(){
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');

            });
            //Edit event listener
            item.querySelector('.edit-item').addEventListener('click',function(){
                itemInput.value=textValue;
                itemList.removeChild(item);
             
                itemData=itemData.filter(function(item){
                    return item !== textValue;

                });
                localStorage.setItem('list',JSON.stringify(itemData));
    

            })
            item.querySelector('.delete-item').addEventListener('click',function(){
                itemList.removeChild(item);            
                itemData=itemData.filter(function(item){
                    return item !== textValue;
                });
                localStorage.setItem('list',JSON.stringify(itemData));
                showFeedBack('item Deleted','success')
           
            });

        }

    });
      
};
//Clear All items
clearBtn.addEventListener('click',function(){
    itemData=[];
    localStorage.removeItem()
    const items=itemList.querySelectorAll('.item');
    if(items.length>0){
        items.forEach(function(item){
            itemList.removeChild(item);
        })
    }
})