// Create original topics array for buttons that will already exist on page load.
var topics = ["friends", "30 rock", "brooklyn nine nine", "joey tribbiani", "tracy jordan", "gina linetti"];

// Function for creating buttons (initially and as users add buttons)
function renderButtons() {

    // Deleting existing buttons prior to adding new movies to prevent repeats
    $(".button-panel").empty();

    // Looping through the topics array
    for (var i = 0; i < topics.length; i++) {

        // Then dynamically generating buttons for each topic in the array
        var topicButton = $("<button>");
        // Adding a class of movie-btn to our button
        topicButton.addClass("topic-btn");
        // Adding a data-attribute
        topicButton.attr("data-name", topics[i]);
        // Providing the initial button text
        topicButton.text(topics[i]);
        // Adding the button to the buttons-view div
        $(".button-panel").append(topicButton);
    }
};

// Function for when user adds a new button
$("#add-button").on("click", function(event) {
    // stops form from submitting so I can capture information
    event.preventDefault();
    // This line grabs the input from the textbox and stores it in a variable
    var userEntry = $("#new-topic").val().trim();
    var newTopic = userEntry.toLowerCase();
    // Clear the search bar afterwards
    $("#new-topic").val("");

    // Adding movie from the textbox to our array
    topics.push(newTopic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listener to all buttons
function displayGIFs() {
    // Grabbing and storing the data-name property value from the button
    var searchTerm = $(this).attr("data-name");
  
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=1kR5KMl1BILewIvXHaKtd8iWgGsm5LgG&limit=10";
    
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // After data comes back from the request
    .then(function(response) {
        console.log(queryURL);

        console.log(response);

        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var topicDiv = $("<div>");
            topicDiv.attr("class", "gif-div");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var topicImage = $("<img>");
            
            // Setting the src attribute of the image to a property pulled off the result item
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("still", results[i].images.fixed_height_still.url);
            topicImage.attr("animate", results[i].images.fixed_height.url);
            topicImage.attr("data-state", "still");
            topicImage.attr("class", "gif");

            // Appending the paragraph and image tag to the animalDiv
            topicDiv.append(p);
            topicDiv.append(topicImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $(".gif-panel").prepend(topicDiv);
        };
    });
};

function animateGIFs() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("data-state", "still");
    }
};



// Adding a click event listener to all elements with a class of "topic-btn" to run displayGIFs function
$(document).on("click", ".topic-btn", displayGIFs);

$(document).on("click", ".gif", animateGIFs);


// Call renderButtons function to display buttons on page load
renderButtons();
