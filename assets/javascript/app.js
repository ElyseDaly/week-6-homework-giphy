$( document ).ready(function() {

//INITIAL ARRAY
var topics = ["Dogs", "Cats", "Frogs", "Rabbits", "Penguins", "Horses", "Elephants", "Skunks", "Snakes", "Cows"];


//BUTTONS
function displayGifButtons(){
    $("#gifButtonsDiv").empty();
    for (var i = 0; i < topics.length; i++){
        var gifBtn = $("<button>");
        gifBtn.addClass("animalBtn");
        gifBtn.addClass("btn btn-primary")
        gifBtn.attr("data-name", topics[i]);
        gifBtn.text(topics[i]);
        $("#gifButtonsDiv").append(gifBtn);
    }
}
displayGifButtons();

function addNewButton(){
    $("#addAnimal").on("click", function(){
    var newTopic = $("#animal-input").val().trim();
    if (newTopic == ""){
      return false;
    }
    topics.push(newTopic);
    displayGifButtons();
    return false;
    });
}
addNewButton();

function resetButtons(){
    $("resetAnimals").on("click", function(){
    displayGifButtons();
    return false;
    });
}
resetButtons();


//GIFS
function showGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        $("#gifsDiv").empty();
        var gif = response.data;
        
        for (var i=0; i<gif.length; i++){
            
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            
            var gifRating = $("<h4>").text("Rating: " + gif[i].rating);
            gifDiv.append(gifRating);
            
            var gifImage = $("<img>");
            gifImage.attr("data-state", "still");
            gifImage.attr("src", gif[i].images.fixed_height_small_still.url);
            gifImage.attr("data-still",gif[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",gif[i].images.fixed_height_small.url);
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsDiv").prepend(gifDiv);
        }
    });
} // end of showGifs function


// ON CLICK EVENTS
$(document).on("click", ".animalBtn", showGifs);

$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});


}); //end of document.ready