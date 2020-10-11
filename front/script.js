
window.addEventListener('load', async ()=>{
    //get boat button
	let loadboat = document.querySelector('#getbutton');
   let container = document.querySelector('.container');
   //search boat button
   let inputSearch = document.querySelector('#inputSearch')
	let searchCategory = document.querySelector('#categories'); 
    let btnSearch = document.querySelector('#btn-search');
    // delete button
    let deleteBoat =document.querySelector('.container');
   // adding button
    let AddingBoat = document.querySelector('#addBoat');
    let AddModelName = document.querySelector('#addModelName');
    let AddYear = document.querySelector('#addYear');
    let AddProductionYear = document.querySelector('#addproductionYear');
    let AddPrice = document.querySelector('#addPrice');
    let inputIsSail = document.querySelectorAll("is_Sail");
    let inputHasMotor = document.querySelectorAll("has_Motor");
    //reset button
    let resetboat = document.querySelector('#reset-button');
    

    //Get Boat
   loadboat.addEventListener('click',async()=>{
       getBoats()
   });
   //GetBoats
   async function getBoats(){
    container.innerHTML = '';
     const response = await fetch('/api/boats',{ method:'GET'});
     let boatObject = await response.json();
     console.log('Fetch boatList:',boatObject );
      boatObject.forEach(boat => {
        let li = document.createElement('div') ;
      li.innerHTML = `<div>ModelName:${boat.ModelName}<br>price:${boat.price}<br>is_Sail:${boat.is_Sail}<br>has_Motor:${boat.has_Motor}<br>production_year:${boat.production_year}<br>Model_year:${boat.Model_year}</div>`;
       container.appendChild(li);
       li.style.border='5px solid #ADD8E6';
       li.style.backgroundColor='#ADD8E6';
       //Deleteboat
       let btnDelete = document.createElement('button')
       btnDelete.setAttribute("class", "deleteButton");
       btnDelete.innerHTML = 'Delete';
       btnDelete.style.backgroundColor="#B22222";
       btnDelete.addEventListener('click', async () => {
           getBoats();
           
           // DELETE REQUEST
           const response = await fetch('/api/deleteboat' + boat._id, { method: 'DELETE' });
           const boatObject  = await response.json(); 
           })
            
           deleteBoat.appendChild(btnDelete);
           deleteBoat.style.color="#B22222";
    })
}
// SEARCH
btnSearch.addEventListener('click', async () => {
   let search = '';
		let query = '';
		
		if (searchCategory.value === 'maxprice'){
			query = 'maxprice';
		}
		else if (searchCategory.value === 'madebefore'){
			query = 'madebefore';
		}
		else if (searchCategory.value === 'madeafter'){
			query = 'madeafter';
		}
		else{
			query = 'word';
		}
		
		search = inputSearch.value;
    // GET REQUEST
    const response = await fetch('/api/search?' + query + '=' + search, { method: 'GET' }); 
    const boatObject = await response.json(); 
    console.log(boatObject);
    container.innerHTML = '';
    boatObject.forEach(boat => {
        let li = document.createElement('div') 
        li.innerHTML = `<div>ModelName:${boat.ModelName}<br>price:${boat.price}<br>is_Sail:${boat.is_Sail}<br>has_Motor:${boat.has_Motor}<br>production_year:${boat.production_year}<br>Model_year:${boat.Model_year}<br>Id: ${boat._id}</div>`;
        container.appendChild(li);
        li.style.border='5px solid #ADD8E6';
       li.style.backgroundColor='#ADD8E6';
       
    })

})
//adding new boat
AddingBoat.addEventListener('click', async () => {
    
    let is_Sail='no';
    let has_Motor='no';
    if (inputIsSail.checked){
        is_Sail='yes'
    }
    if(inputHasMotor.checked){
        has_Motor='yes'
    }
    

    let input = {
        ModelName: AddModelName.value,
        Model_year: Number(AddYear.value), 
        production_year:Number(AddProductionYear.value),
        price: Number(AddPrice.value),
        is_Sail: is_Sail,
        has_Motor: has_Motor,
    }
    
    
    const response = await fetch('/api/addBoat', {method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    });
    const text = await response.json();

        
    getBoats();
})

    
     })
     
