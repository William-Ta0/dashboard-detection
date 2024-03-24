var totalTime = 0;
var clickCount = 0;
var buttonClicks = {total: 0,};
var buttonClickCount = 0;
var linkClickCount = 0;
var keypressCount = 0;
var scrollCount = 0;
var mouseMovementCount = 0;
var linkClickCount = 0;
console.log("popup.js");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'donAutoSwipe') {
    console.log("works");
  }
  
  });


window.addEventListener(
    "message", () => {console.log("message recievd")}
);

var sliders = document.querySelectorAll("input[type='range']");
sliders.forEach(slider => {
  slider.addEventListener('input', () => {
    let valueId = slider.id+"Label";  
    let span = document.getElementById(valueId);
    span.innerText = slider.value;
    let varValue = {
        [slider.id]: slider.value 
      };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'set_vars',
          vars: varValue
        });
      });
    });
});


let overlay = `
  <!DOCTYPE html>
  <html>
  <style>
  button {
    background-color: #4CAF50; /* Green background color */
    color: #FFFFFF; /* White text color */
    
    border: none; /* Remove border */
    border-radius: 5px; /* Add border-radius for rounded corners */
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
  
  /* Add hover effect */
  button:hover {
    background-color: #45a049; /* Darker green color on hover */
  }
  
  textarea {
    padding: 10px; /* Adjust padding as needed */
    border: 2px solid #4CAF50; /* Green border color */
    border-radius: 5px; /* Add border-radius for rounded corners */
    resize: vertical; /* Allow vertical resizing of the textarea */
  }
  
  /* Add focus effect */
  textarea:focus {
    border-color: #45a049; /* Darker green color on focus */
  }
  
  </style>
  <head>
  <link rel="stylesheet" href="mystyle.css">
  </head>
  <body>
    <div id="feedback-overlay">
      <div>
        <h3>Did you experience any problem?</h3>
        <input type="radio" name="problem" value="yes"> Yes</input>
        <input type="radio" name="problem" value="no"> No</input>
      </div>
      
      <div>  
        <h3>Justify your answer:</h3>
        <textarea id="comment"></textarea><br>
      </div>
      
      <button id="submit">Submit</button>
    </div>
  </html>
`;

// Insert overlay  

function insertOverlay() {
  
  
  // console.log("insertOverlay");
  document.body.insertAdjacentHTML('beforeend', overlay);

  // Submit handler
  document.getElementById('submit').addEventListener('click', () => {
  
  let precision = document.querySelector('input[name="problem"]:checked').value;

  let comment = document.getElementById('comment').value;

  // Send data to server 
  saveResponse(precision, comment);
  document.getElementById('feedback-overlay').remove();
  // Remove overlay

  // window.opener.close("hello.html");
});
}


// Save to database
function saveResponse(presision, comment) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Send a message to the content script of the active tab
    chrome.tabs.sendMessage(tabs[0].id, {messages: {presision : presision, comment: comment } });
  });

  // console.log(presision, comment, detected);
  // fetch('http://localhost/Detection_Extension_copy/submit.php', {
  //   method: 'POST',
  //   body: JSON.stringify({presision, comment})
  //   //body: problem, comment
  // });

}
insertOverlay();

// document.getElementById("but").addEventListener("click", function() {
//     document.getElementById("head").innerHTML = "userResult";

//     // const userResult=JSON.stringify(userBehaviour.showResult());
//     // document.getElementById("head").innerHTML = userResult;
//     // alert("alert");
// });



// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     console.log("This is popup"+JSON.stringify( message));
//   }
// );
