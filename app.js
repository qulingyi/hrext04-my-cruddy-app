$(document).ready(function() {

    let counter = 0;
    let edit = false;
    let clickNum;
    //set due date selection min date as today
    due.min = new Date().toISOString().split("T")[0];
    due.value = due.min;

    //get real-time and display in format 'yyyy-mm-dd, h:mm:ss'
    let timeStamp = moment().format().split("T")[0] + ", " + moment().format().split("T")[1].split("-")[0];

  $(".add-text-btn").on("click", function() {
    console.log("edit condition is : ", edit);
    // using jquery selector to read input values
    let inputKey = $(".user-input-title").val();
    let inputValue = $(".user-input-body").val();
    let dueDate = $("#due").val();

    // clear values on the display
    $(".user-input-title").val("");
    $(".user-input-body").val("");
    
    // console log the input values {key:value}
    console.log(inputKey, inputValue);
    
    
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem(inputKey, inputValue);
    if(edit === false) {
    counter++;
    }
    console.log(counter);

    // data-uniqID
    let itemHtml = '<div class="display-item" data-num = "' + counter + '" data-storage-key="'+inputKey+'"> ' + inputKey + ' '
        +  localStorage.getItem(inputKey) + " Due Date: " +  dueDate + " Created at: " +  timeStamp +  '</div>';
    if(edit === false) {
    $(".display").append(itemHtml);
    }
    if(edit === true) {
        $("div[data-num =" + "'"+ clickNum + "'" + "]").html(itemHtml);
      edit = false;
    }
    //console.log(localStorage);
    // how can we delegate this event to the outer html node?
    // https://learn.jquery.com/events/event-delegation/
    // $(".display-item").on("click", function(e){
    //   edit = true;
    //   // plop the key:value back into the input boxes
    //   $("div[num =" + "'"+ e.target.dataset.num + "'" + "]").css({"background-color": "red"});
    //   // get the values from the the data dash properties
    //   console.log("key=> ", e.target.dataset.storageKey); // user-input-title
    // });
  });
        let items = document.querySelector(".display");

        items.addEventListener("click", function(e)
        {
          edit = true;
          clickNum = e.target.dataset.num;
          $(".display-item").css({"background-color": "white"})
          $("div[data-num =" + "'"+ e.target.dataset.num + "'" + "]").css({"background-color": "red"});
          console.log("I clicked on: " + e.target.dataset.num);
          localStorage.getItem(e.target.dataset.storageKey); // user-input-body
           // set those values in the form fields
          $(".user-input-title").val(e.target.dataset.storageKey);
          $(".user-input-body").val(localStorage.getItem(e.target.dataset.storageKey));
        });

   // TODO add back in later
  // example of how to do a filter based on a keyup event
//    $(".user-input").on("keyup", function(){
//      let inputValue = $(".user-input").val();
//      localStorage.setItem("testStorage", inputValue);
//      $(".display").text(localStorage.getItem("testStorage"));
//    });

   $(".del-text-btn").on("click", function() {
     alert('item deleted? check the console'); // maybe change to a window.confirm
     localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
     $(".user-input-title").val("");
     $(".user-input-body").val("");
     // clearing display? what if I have multiple items?
     // after item is removed from local storage, redisplay items from local storage
     // refresh from storage?
   });

   // iterative approach to adding items
   // store data as stringified array of objects
   // store data with individual keys
  // how do we get keys? research Object.keys

});
