 // Initial array of topic
 var gifs = ["horses", "hippos", "squirrels", "monkeys"];

 // displayGif function re-renders the HTML to display the appropriate content
 function displayGif() {

   var gif = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&apiKey=tCPhdtXJLa7vSJ2r53hJUIpVWJdO1X2v&limit=10&ratings=g"; 

   // Creating an AJAX call for the specific gif button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
     console.log(response);

    for ( var i = 0; i < 10; i++) 
    {
            // Delete gifs before they are replaced by new ones
            // $("gifs-appear-here").empty();

            // Creating animal div tag to store divs
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + response.data[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");

            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.addClass("gif");
            animalImage.attr("src", response.data[i].images.fixed_width_still.url);

            // Creating still/animate feature when clicked
            animalImage.attr("data-still", response.data[i].images.fixed_width_still.url);
            animalImage.attr("data-animate", response.data[i].images.fixed_width_downsampled.url);
            animalImage.attr("data-state", "still");
            var span = $("<br/> <span class='icon-size'><i class='fa fa-thumbs-up'></i></span>");

            // Append the <p> (var p) and <img> (animalImage) to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);
            animalDiv.append(span);

            // prepend animalDiv to DOM
            $("#gifs-appear-here").prepend(animalDiv);
    }
   });

 }

  // Create gif function to animate/still gifs
  $(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    //update src attribute to what its data-animate value is (animate/still)
    // if/else: if still, animate
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {// else, animate --> still
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }   
  });

 // Create function to display gif buttons
 function renderButtons() {

   // Deleting the buttons prior to adding new buttons
   $("#buttons-view").empty();

   // Looping through the array of gifs
   for (var i = 0; i < gifs.length; i++) {

     // Create var to store added buttons
     var gifButton = $("<button>");
     // Adding a class of gif-btn to our button
     gifButton.addClass("gif-btn");
     // Adding a data-attribute
     gifButton.attr("data-name", gifs[i]);
     // Providing the initial button text
     gifButton.text(gifs[i]);
     // Adding the button to the buttons-view div
     $("#buttons-view").append(gifButton);
   }
 }

 // This function handles events where a gif button is clicked
 $("#add-gif").on("click", function(event) {
   event.preventDefault();
   // This line grabs the input from the textbox
   gif = $("#gif-input").val().trim();

   // Adding gif from the textbox to our array
   gifs.push(gif);

   // Calling renderButtons which handles the processing of our gif array
   renderButtons();
 });

 // Adding a click event listener to all elements with a class of "gif-btn"
 $(document).on("click", ".gif-btn", displayGif);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();

 $(document).on("click",".fa", function(){
     console.log("Inside fa like");
    $(this).css("color","blue");

 });