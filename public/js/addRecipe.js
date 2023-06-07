const addRecipeFormHandler = async (event) => {
    event.preventDefault();
  
    const data = new FormData(recipeForm);
    console.log(data.get('recipe_name'));

    let formDataObject = Object.fromEntries(data.entries());
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);

    const response = await fetch("/api/recipes", {
        method: "POST",
        body: formDataJsonString,
        headers: { "Content-Type": "application/json" },
      });
    
      const { success } = await response.json()
      if (success) {
            window.location.reload();
      }
};
const recipeForm = document.querySelector("#addRecipe");
recipeForm.addEventListener('submit', addRecipeFormHandler);
