const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealI = document.getElementById('meal');
const result = document.getElementById('result-heading');
const singleMeal = document.getElementById('single-meal');




//function of submit button


function searchmeal(e) {
    e.preventDefault();
    singleMeal.innerHTML= '' ;
    const term = search.value;

    console.log(term);

    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
            .then(data => {

                console.log(data);
                result.innerHTML = `<h5> Search results : ${term} </h5>`;

                if (data.meal === null) //data.meals is the meal name from the api i have taken
                {
                    mealI.innerHTML = `No search results for : ${term}`;
                }
            
                else {

                    mealI.innerHTML = data.meals.map(meal =>
                        `<div class="meal-info" data-mealID="${meal.idMeal}">

                             <div id="image-meal">

                             <img src="${meal.strMealThumb}">
                            <p>${meal.strMeal} , Dish Type : ${meal.strArea}</p>
                        </div>

                        </div>`)
                        .join('');
               }   
            })
                }
                }

        // fetch meal by id

        function getmeal(mealID) {
            // console.log("hey");
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
                .then(res => res.json())
                .then(data => {
                    const meal = data.meals[0];
                    addmeal(meal);
                });
        }
        
        function addmeal(meal) {
            const ind = [];

            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    ind.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
                }
                 else
                  {
                     break;
                 }

            }
            
            singleMeal.innerHTML = `
            <div id = "single-meal">
            
            <p> Just reload the page to get back or scroll down to see more dishes</p>
            <h1>${meal.strMeal}</h1>
            
            
            <div class="imgsingle">
                <img src="${meal.strMealThumb}" alt="Image not loaded" srcset="" class="foodimage">
            </div>
            
            
            <div class="p">
                <h4> ${meal.strCategory} </h4> 
                <h5> ${meal.strArea}</h5>
            </div>
            
            <div class="ingredient">
                <ul>
                    ${ind.map(ing => `<li>${ing}</li>`).join('') }
                </ul>
            </div>
            
            
            <div class="instruction">
                <p>${meal.strInstructions}</p>
            </div>
            
                
        

            </div>
            `


        }
        
                
        
       



        //end of fetch meal







        submit.addEventListener('submit', searchmeal) ;

//end of submit button


        //event listeners of pics..

        mealI.addEventListener('click', e => {
            const mealinfo = e.path.find(item => {
                if (item.classList) {
                    return item.classList.contains("meal-info");
                }
                else {
                    return false;
                }
            });
            if (mealinfo) {
                const mealID = mealinfo.getAttribute('data-mealid');
                 getmeal(mealID);
            }
        })