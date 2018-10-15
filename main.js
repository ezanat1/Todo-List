//Get Elements 
const itemForm=document.getElementById('itemForm');
const itemInput=document.getElementById('itemInput');
const itemList=document.querySelector('.item-list');
const clearBtn=document.getElementById('clear-list');
const feedback=document.querySelector('.feedback');



let itemData=[];
//Listen for Form Submittion 
//Check for default form submition and check if the input is empty

itemForm.addEventListener('submit',function(event){
    event.preventDefault();
    const textValue=itemInput.value;
    console.log(textValue);


    if(textValue === ''){
        showFeedBack('Please Enter Something','danger');
    }
    

});

function showFeedBack(msg,action){
    //Add a class to feedback by default in the CSS the feedback was set to none 
    //Add a bootstrap class 'alert' and then the action that we need 
    feedback.classList.add('showItem',`alert-${action}`);
    feedback.innerHTML=`<p>${msg}</p>`
    setTimeout(function(){
        feedback.classList.remove('showItem',`alert-${action}`);


    },3000);


};