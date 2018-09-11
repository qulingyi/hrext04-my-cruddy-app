$(document).ready(function() {

    let counter = 0;
    let editing = false;
    let clickNum;
    //set due date selection min date as today
    due.min = new Date().toISOString().split("T")[0];
    due.value = due.min;
    //get real-time and display in format 'yyyy-mm-dd, h:mm:ss'
    let timeStamp = moment().format().split("T")[0] + ", " + moment().format().split("T")[1].split("-")[0];

  //add text function, editing or not
    $(".add-text-btn").on("click", function() {
    console.log("edit condition is : ", editing);
    // using jquery selector to read input values
    let inputKey = $(".user-input-title").val();
    let inputValue = $(".user-input-body").val();
    let dueDate = $("#due").val();
    // clear values on the display
    $(".user-input-title").val("");
    $(".user-input-body").val("");
    // console log the input values {key:value}
    //console.log(inputKey, inputValue);
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem(inputKey, inputValue);
    console.log("num is :   ", counter);
    // data-uniqID
    if(editing === false) {
        counter ++;
        let itemHtml = '<div class="display-item" data-num = "' + counter + '" >' +
        '<input class = "check" type = "checkbox" data-num = "' + counter + '"></input> '
        + '<div class = "text" data-num = "' + counter + '" data-storage-key="'+inputKey+'">'
        + inputKey + ' ' +  localStorage.getItem(inputKey)
        + " Due Date: " +  dueDate + " Created at: " +  timeStamp +  '</div>'
        + '<img class = "edit" data-num = "' + counter + '" src = "https://vignette.wikia.nocookie.net/' +
        'marioluigiplushbros/images/d/d2/Edit.png/revision/latest?cb=20130407014637"></img>'
        + '<img class = "delete" data-num = "' + counter + '" src = "http://pngimage.net/wp-content/' +
        'uploads/2018/06/icon-hapus-png-8.png"></img></div>';
      $(".display").append(itemHtml);
      console.log("this is append");
    }
    if(editing === true) {
        $(".add-text-btn").text("add text");
        $("div[data-num =" + "'"+ clickNum + "'" + "]").replaceWith(
          '<div class="display-item" >'
          + '<div class = "text" data-num = "' + clickNum + '" data-storage-key="'+inputKey+'">'
          + inputKey + ' ' +  localStorage.getItem(inputKey)
          + " Due Date: " +  dueDate + " Created at: " +  timeStamp +  '</div></div>');
        //$(".display").append(itemHtml);
      console.log("this is replace");
      editing = false;
    }
    });

    //strike through function
    $(".display").on("click", 'input[class="check"]', function(s){
        if($(this).prop("checked") == true){
            $("div[data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"text-decoration": "line-through"});
            $("div[data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"color": "grey"});
        }
        if($(this).prop("checked") == false){
            $("div[data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"text-decoration": ""});
            $("div[data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"color": "black"});
        }
    });

    //edit text function
    $(".display").on("click", 'img[class="edit"]', function(e) {
        var temp = e.target.dataset.num;
        if(editing === false || temp === clickNum) {
            editing = !editing;
        }
        console.log("editing status now:   ", editing);
        if(editing === true) {
            $(".add-text-btn").text("save edit");
            clickNum = e.target.dataset.num;
            $(".display-item").css({"background-color": "white"})
            $("div[data-num !=" + "'"+ e.target.dataset.num + "'" + "]").css({"background-color": "white"});
            $("div[data-num =" + "'"+ e.target.dataset.num + "'" + "]").css({"background-color": "aqua"});
            console.log("I clicked on: " + e.target.dataset.num);
            localStorage.getItem(e.target.dataset.storageKey); // user-input-body
            // set those values in the form fields
            $(".user-input-title").val(e.target.dataset.storageKey);
            $(".user-input-body").val(localStorage.getItem(e.target.dataset.storageKey));
        }
        if(editing === false) {
            $(".add-text-btn").text("add text");
            $("div[data-num =" + "'"+ e.target.dataset.num + "'" + "]").css({"background-color": "white"});
            $(".display-item").css({"background-color": "white"})
            $(".user-input-title").val("");
            $(".user-input-body").val("");
        }
    });

    //delete functions
    $(".display").on("click", 'img[class="delete"]', function(d) {
        console.log("deleted clicked");
        $("div[data-num =" + "'"+ d.target.dataset.num + "'" + "]").remove();
        //alert('item deleted? check the console'); // maybe change to a window.confirm
        localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
        $(".user-input-title").val("");
        $(".user-input-body").val("");
        // clearing display? what if I have multiple items?
        // after item is removed from local storage, redisplay items from local storage
        // refresh from storage?
    });
    //test function

   // TODO add back in later
  // example of how to do a filter based on a keyup event
//    $(".user-input").on("keyup", function(){
//      let inputValue = $(".user-input").val();
//      localStorage.setItem("testStorage", inputValue);
//      $(".display").text(localStorage.getItem("testStorage"));
//    });
   // iterative approach to adding items
   // store data as stringified array of objects
   // store data with individual keys
  // how do we get keys? research Object.keys
});
