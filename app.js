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
        counter++;
        let itemHtml = '<div class="display-item" data-num = "' + counter + '" >' +
        '<div class = "icon_container">' +
        '<input class = "check" type = "checkbox" data-num = "' + counter + '"></input> '
            + '<img class = "edit" data-num = "' + counter + '" data-storage-key="'+inputKey+'" ' +
            'src = https://image.flaticon.com/icons/svg/1102/1102457.svg></img>'
            + '<img class = "delete" data-num = "' + counter + '" data-storage-key="'+inputKey+'" ' +
            'src = "https://image.flaticon.com/icons/svg/1101/1101702.svg" ></img></div>'
        + '<div class = "container" data-num = "' + counter + '">'
        + '<div class = "text" data-num = "' + counter + '" data-storage-key="'+inputKey+'">'
        + '<p class = "title">' +  inputKey + '</p><p class="content">' +  localStorage.getItem(inputKey) + '</p></div>'
        + '<div class = "due">' + " Due Date: " +  dueDate + '</div>'
        + '<div class = "time">' + " Created at: " +  timeStamp +  '</div></div></div>';
        $(".display").append(itemHtml);
        console.log("this is append");
    }
    if(editing === true) {
        let newTime = moment().format().split("T")[0] + ", " + moment().format().split("T")[1].split("-")[0];
        $(".add-text-btn").text("add text");
        $("div[class='display-item'][data-num =" + "'"+ clickNum + "'" + "]").replaceWith(
            '<div class="display-item" data-num = "' + clickNum + '" >' +
            '<div class = "icon_container">' +
            '<input class = "check" type = "checkbox" data-num = "' + clickNum + '"></input> '
            + '<img class = "edit" data-num = "' + clickNum + '" data-storage-key="'+inputKey+'" ' +
            'src = https://image.flaticon.com/icons/svg/1102/1102457.svg></img>'
            + '<img class = "delete" data-num = "' + clickNum + '" data-storage-key="'+inputKey+'" ' +
            'src = "https://image.flaticon.com/icons/svg/1101/1101702.svg" ></img></div>'
            + '<div class = "container" data-num = "' + clickNum + '">'
            + '<div class = "text" data-num = "' + clickNum + '" data-storage-key="'+inputKey+'">'
            + '<p class = "title">' +  inputKey + '</p><p class="content">'  +  localStorage.getItem(inputKey) + '</div>'
            + '<div class = "due">' + " Due Date: " +  dueDate + '</div>'
            + '<div class = "time">' + " Created at: " +  newTime +  '</div></div></div>');
        console.log("this is replace");
        editing = false;
    }
  });

    //checkbox checked function
    $(".display").on("click", 'input[class="check"]', function(s){
        if($(this).prop("checked") == true){
            $("div[data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"text-decoration": "line-through"});
            $("div[data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"color": "grey"});
            $("div[class='display-item'][data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"opacity": 0.4});
        }
        if($(this).prop("checked") == false){
            $("div[data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"text-decoration": ""});
            $("div[data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"color": "white"});
            $("div[class='display-item'][data-num =" + "'"+ s.target.dataset.num + "'" + "]").css({"opacity": ""});
        }
    });

    //edit text function
    $(".display").on("click", 'img[class="edit"]', function(e) {
        var temp = e.target.dataset.num;
        console.log("Look the temp: ", temp);
        if(editing === false || temp === clickNum) {
            editing = !editing;
        }
        console.log("editing status now:   ", editing);
        if(editing === true) {
            $(".add-text-btn").text("save edit");
            clickNum = e.target.dataset.num;
            console.log("Look the clickNum: ", clickNum)
            $("div[class='container'][data-num =" + "'"+ e.target.dataset.num + "'" + "]").css(
                {"border": "2px dashed white"});
            $("div[class='container'][data-num !=" + "'"+ e.target.dataset.num + "'" + "]").css(
                {"border": ""});
            localStorage.getItem(e.target.dataset.storageKey); // user-input-body
            // set those values in the form fields
            console.log("Key =>", e.target.dataset.storageKey);
            console.log("Body =>", localStorage.getItem(e.target.dataset.storageKey));
            $(".user-input-title").val(e.target.dataset.storageKey);
            $(".user-input-body").val(localStorage.getItem(e.target.dataset.storageKey));
            //edit icon shadow effect
            $("img[class='edit'][data-num =" + "'"+ e.target.dataset.num + "'" + "]").css(
                {"box-shadow": "2px 2px 1px grey"});
            $("img[class='edit'][data-num !=" + "'"+ e.target.dataset.num + "'" + "]").css(
                {"box-shadow": ""});
        }
        if(editing === false) {
            $(".add-text-btn").text("add text");
            $("div[class='container']").css(
                {"border": ""});
            $("img[class='edit']").css(
                {"box-shadow": ""});
            $(".user-input-title").val("");
            $(".user-input-body").val("");
        }
    });

    //delete functions
    $(".display").on("click", "img[class='delete']", function(d) {
            // $("img[class='delete'][data-num =" + "'"+ d.target.dataset.num + "'" + "]").css(
            //     {"box-shadow": "2px 2px 1px grey"});
            var r = confirm("Want to delete is line?");
            if (r == true) {
                $("div[data-num =" + "'" + d.target.dataset.num + "'" + "]").remove();
             } //else {
            //     $("img[class='delete'][data-num =" + "'" + d.target.dataset.num + "'" + "]").css(
            //         {"box-shadow": ""});
            // }
        //alert('item deleted? check the console'); // maybe change to a window.confirm
        localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
        $(".user-input-title").val("");
        $(".user-input-body").val("");
        // clearing display? what if I have multiple items?
        // after item is removed from local storage, redisplay items from local storage
        // refresh from storage?
    });

    //delete text in field function
    $(".del-text-btn").on("click", function () {
        $(".user-input-title").val("");
        $(".user-input-body").val("");
    })

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

   //upload image

   //alert due date function
    let dueAlert = function() {
        $("div[class='due']").each(
            function(){
        if ($(this).text().split(" ")[3] == timeStamp.split(",")[0]) {
            //alert('Task Due date is due today!');
        }
        });
        setTimeout(dueAlert, Math.random() * 1500);
    }
    dueAlert();
});

