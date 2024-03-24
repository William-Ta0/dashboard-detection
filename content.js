console.log("this is content.js")

let condition = null;

//saveResponse("circlings");  
// redirect to php page
function redirectToPhp(folderPath) {
  // Redirect browser to the PHP URL
  window.location.href = folderPath;
}

function redirectToFeedback2(){
    document.cookie = "not="+ "wrong_detection";
}
//redirectToFeedback2()

// redirect to php page when detecting abnormal behavior
function redirectToFeedback(result){
    // let mock=result;
    // //let dev='{"name": "${mock}"}';
    // let dev = '{"name":"' + mock + '"}';
    document.cookie = "name="+ result;

// Redirect to PHP page
    window.location.href = "http://localhost/test.php";
  //redirectToPhp('http://localhost/test.php');
}
//e.g.
// redirectToFeedback("circling");


// double check if user is experiencing any difficulties
function popupWindow() {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "white";
  popup.style.padding = "20px";
  popup.style.border = "1px solid black";
  popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
  popup.style.borderRadius = "5px"; // Added border radius for a rounded look
  popup.style.width="300px";
  popup.style.height="50px";
  const textNode = document.createTextNode('Are you experiencing any difficulties?');
  popup.appendChild(textNode)

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex"; // Added flex display for horizontal alignment

  const button1 = document.createElement("YES");
  button1.textContent = "Yes";
  button1.style.marginRight = "10px"; // Added margin right for spacing
  button1.addEventListener("click", () => {
      redirectToFeedback("testing");
      popup.remove();
  });
  buttonContainer.appendChild(button1);

  const button2 = document.createElement("NO");
  button2.textContent = "No";
  button2.addEventListener("click", () => {
      redirectToFeedback2();
    popup.remove();
    //Reset all the variables, so that detection can start again
  });
  buttonContainer.appendChild(button2);
  popup.appendChild(buttonContainer);
  document.body.appendChild(popup);
}
// let pop = popupWindow();

//detect if there is circling and not stick to the same area
function validate(x,y) {
  let thisX = 0;
  let thisY = 0;
  let thisR = 0;
  if(visitedAreas.length<=1){
    // console.log("not enough data");
    return;
  }
  for (let i = 0; i < visitedAreas.length-1; i++) {
    thisX=visitedAreas[i].x;
    thisY=visitedAreas[i].y;
    thisR=visitedAreas[i].size;
    console.log("number: "+i);
    if(thisX-thisR<x && x<thisX+thisR && thisY-thisR<y && y<thisY+thisR){
      //alert("detected circling");
      visitedAreas=[];
      console.log("detected circling");
      //popupWindow();
      visitedAreas=[];
    }
  }
}

//capture mouse movement on canvas and filter which stay longer than 1.5s
let visitedAreas = [];
let hoverTimer;
function detectCircling(event) {
  let x = event.clientX;
  let y = event.clientY;  
  let target = event.target;
  clearTimeout(hoverTimer); // Clear any previous timer
  hoverTimer = setTimeout(() => {
    // Add new visited area after 3 sec hover
    if(target.tagName!="CANVAS"&&target.tagName!="INPUT"){
      return;
    }
    validate(x,y);
    visitedAreas.push({
      x: x, 
      y: y,
      size: 80 
    });
    console.log("list: "+JSON.stringify(visitedAreas));
    
  }, 1500); // 1.5 second timeout
  // Check for circling...
} 
// On move, restart timer
document.addEventListener("mousemove", () => {
  clearTimeout(hoverTimer);
});
document.addEventListener("mousemove", detectCircling);


// document.body.textContent = "";
// let header = document.createElement("h1");
// header.textContent = "This page has been eaten";
// document.body.appendChild(header);
// Content script

window.addEventListener('message', event => {
  if(event.data.type === "element_data") {
    console.log(event.data.tag + " element"); 
    console.log("x:" + event.data.x +" y:"+event.data.y);
  }
});


var INITIAL_WAIT = 100000;
var INTERVAL_WAIT = 10000;
var ONE_SECOND = 1000;
var events = [
    "mouseup", 
    "keydown", 
    "scroll", 
    "mousemove"
];
var startTime = Date.now();
var endTime = startTime + INITIAL_WAIT;
var totalTime = 0;
var clickCount = 0;
var buttonClicks = {
    total: 0,
};
var buttonClickCount = 0;
var linkClickCount = 0;
var keypressCount = 0;
var scrollCount = 0;
var mouseMovementCount = 0;
var linkClickCount = 0;
var switchTab = 0;

var var1 = 10;
var var2 = 10; 
var var3 = 10;
var var4 = 10;
var var5 = 10;

//adjust user sensitivity(in the original popup page)
chrome.runtime.onMessage.addListener(request => {
  if(request.type == "set_vars") {
    var newVars = request.vars;
    for(let varName in newVars) {
      window[varName] = parseInt(newVars[varName]);
    }
  }
});

let totalDistance = 0;
let lastPosition = null;
document.addEventListener('mousemove', event => {
  if(!lastPosition) {
    lastPosition = {
      x: event.pageX,
      y: event.pageY
    };
    return; 
  }
  let deltaX = event.pageX - lastPosition.x;
  let deltaY = event.pageY - lastPosition.y;  
  let distance = Math.sqrt(deltaX**2 + deltaY**2);
  totalDistance += distance;
  //console.log(`Total Distance: ${Math.round(totalDistance)} px`);
  lastPosition = {
    x: event.pageX,
    y: event.pageY 
  };
});

//detect mouse speed
function mousespeed() {
  console.log("mouseSpeed: "+totalDistance/3);
  if(totalDistance>var1*200){
    
    //alert("You are a mouse speed demon, need any help?");
    console.log("You are a mouse speed demon, your speed is: "+totalDistance/3+" px/seconds");
    //insertOverlay();
  }

  totalDistance=0
  setTimeout(mousespeed, 3000);
}
//mousespeed();

//detect the idle time
let idleTimeout;
document.addEventListener("mousemove", resetIdleTimer); 
document.addEventListener("keydown", resetIdleTimer);
document.addEventListener("touchstart", resetIdleTimer);
function resetIdleTimer() {
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    //alert("You've been idle for 15 minutes, need any help?");
    //console.log("User is inactive!");
    // insertOverlay();
  }, 10000+var2*100);
}
resetIdleTimer();

//detect multiple times reaching the bottom of the page
var atbutton = 0;
window.addEventListener('scroll', handleScroll);
function handleScroll() {
  // Calculate scroll position
  var scrollTop = document.documentElement.scrollTop;  
  var scrollHeight = document.documentElement.scrollHeight;
  var clientHeight = document.documentElement.clientHeight;
  // Check if scrolled to bottom
  var atBottom = (scrollTop + clientHeight >= scrollHeight);  
  if(atBottom) {
    atbutton++;
    //console.log("User scrolled to bottom of page");
    if(atbutton>=var3){
      //alert("Detecting reach the bottom of the page excessively, do you need any help?");
      //console.log("User scrolled to bottom of page excessively, do you need any help?");
    }
  }
}

// detect too much non-interactive click
var non_interactive=0;
document.addEventListener('click', handleClick);
function handleClick(event) {
  let target = event.target;
  console.log("target: "+target+" target innertext: "+target.innerText+" target tag: "+target.tagName);
  if(target.tagName === 'DIV' || target.tagName === 'P'|| target.tagName === 'SPAN'|| target.tagName === 'P'|| target.tagName === 'TD') {
    non_interactive++;
    if (non_interactive>=var4){
      //alert("Detecting too much non-interactive click, do you need any help?");
      //console.log("non interactive element: "+non_interactive);
      //insertOverlay();
    }
  }
  if(!target.hasAttribute('href') && !target.onclick) {
    a=1;
    // Neither link nor button - likely non-interactive
  }
}

// detect the element that the mouse is hovering over

//document.addEventListener("mouseover", logHoverElement);
function logHoverElement(event) {
  let target = event.target;
  if(target) {
    console.log("target: "+target+" target Id: "+target.id+" target innertext: "+target.innerText+" target tag: "+target.tagName);
  }
  // if(target.id) {
  //   console.log(target.id);
  // }
  else if(target.parentNode.id) { 
    console.log("parantNode: "+ target.parentNode.id);  
  }
  else {
    console.log("No ID found for hovered element!");
  }
}

setInterval(function () {
    if (!document.hidden && startTime <= endTime) {
    startTime = Date.now();
    totalTime += ONE_SECOND;
    //document.getElementById("timer").innerHTML = formatTime(totalTime);
    //console.log("time: "+formatTime(totalTime));
    // chrome.runtime.sendMessage({mseeage: "The time I spend on the page: "+ formatTime(totalTime)});
    }
}, ONE_SECOND);

//detect if the page is ready
if (document.readyState !== 'loading') {
    console.log('document is already ready, execute code here');
    // chrome.runtime.sendMessage({mseeage: "hello from content"});
    detection()
} else{
    document.addEventListener("DOMContentLoaded", function () {
        console.log('document was not ready, place code here');
        detection();
    });
}

//convert ms to seconds
function formatTime(ms) {
    return Math.floor(ms / 1000);
}

var direction = "";
var oldx = 0;
var oldy = 0;

//detect mouse movement direction
mousemovemethod = function (e) {    
    if (e.pageX > oldx && e.pageY == oldy) {
    direction="right";
    }
    else if (e.pageX == oldx && e.pageY > oldy) {
        direction="down";
    }
    else if (e.pageX == oldx && e.pageY < oldy) {
        direction="up";
    }
    else if (e.pageX < oldx && e.pageY == oldy) {
        direction="left";
    }
    //console.log(direction);
    oldx = e.pageX;
    oldy = e.pageY;       
}
document.addEventListener('mousemove', mousemovemethod);

//detection() function 在前面加载页面的时候就已经被调用了
//detect if the window is switched multiple times, and clear the number of times after a certain time (can be added to the switch within a specific time later)
function detection () {
    //document.getElementById("page").innerHTML = window.location.pathname;
    console.log("page: "+window.location.pathname);
    document.addEventListener("visibilitychange", function() {
    if (document.visibilityState != "visible") {
      switchTab++;
      //console.log("switchTab: "+ switchTab);
      if(switchTab>=var5){
        //alert("Detecting switch tab excessively, do you need any help?");
        //console.log("Detecting switch tab excessively, do you need any help?");
        switchTab=0;
      }
    }
  });
    events.forEach(function (e) {
        document.addEventListener(e, function () {
        endTime = Date.now() + INTERVAL_WAIT;
        if (e === "mouseup") {
            clickCount++;
            //document.getElementById("click").innerHTML = clickCount;
            //console.log("click: "+ clickCount);
            // chrome.runtime.sendMessage({mseeage: "nuber of clickCount: " +clickCount });
            if (event.target.nodeName === 'BUTTON') {          
            if(!buttonClicks[event.target.innerText]){
                buttonClicks[event.target.innerText] = 0;
            }
            buttonClicks[event.target.innerText] += 1;
            buttonClicks.total += 1;
            //document.getElementById("button").innerHTML = JSON.stringify(buttonClicks, null, 2);  
            //console.log("button: "+ JSON.stringify(buttonClicks, null, 2));   
            chrome.runtime.sendMessage({mseeage: "nuber of buttonClicks: " +buttonClicks });  
            }
            else if (event.target.nodeName === 'A') {
            linkClickCount++;
            //document.getElementById("link").innerHTML = linkClickCount;
            //console.log("link: "+linkClickCount);
            chrome.runtime.sendMessage({mseeage: "nuber of linkClickCount: " +linkClickCount });
            }
        }
        else if (e === "keydown") {
            keypressCount++;
            //document.getElementById("keypress").innerHTML = keypressCount;
            //console.log("keypress: "+keypressCount);
            // chrome.runtime.sendMessage({mseeage: "nuber of keypressCount: " +keypressCount });
        }
        else if (e === "scroll") {
            scrollCount++;
            //document.getElementById("scroll").innerHTML = scrollCount;
            //console.log("scroll: "+scrollCount);
            // chrome.runtime.sendMessage({mseeage: "nuber of scrollCount: " +scrollCount });
        }
        // else if (e === "mousemove") {
        //     getMouseDirection(e);
        //     // mouseMovementCount++;
        //     // //document.getElementById("mouse").innerHTML = mouseMovementCount;
        //     // console.log("mouse: "+mouseMovementCount);
        //     // chrome.runtime.sendMessage({mseeage: "nuber of mouseMovementCount: " +mouseMovementCount });
        // }
        });
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.messages) {
    // Process the message received from the popup script
    console.log("Message received from popup");
    // You can add your logic here

  }
  if(request.messages.presision){
    let presision=request.messages.presision;
    let comment=request.messages.comment;
    console.log(presision);
    console.log(comment);
    console.log(condition);

    fetch('http://localhost/Detection_Extension_copy/submit.php', {
    method: 'POST',
    body: JSON.stringify({presision, comment, condition})
    //body: problem, comment
    });
  }
});

// // Generate overlay HTML
// let overlay = `
//   <div id="feedback-overlay">
//     <div>
//       <h3>Do you experience any problem?</h3>
//       <input type="radio" name="problem" value="yes"> Yes</input>
//       <input type="radio" name="problem" value="no"> No</input>
//     </div>
    
//     <div>  
//       <label>Leave any comment:</label><br>
//       <textarea id="comment"></textarea>
//     </div>
    
//     <button id="submit">Submit</button>
//   </div>
// `;

// // Insert overlay  

// function insertOverlay() {
//   console.log("insertOverlay");
//   document.body.insertAdjacentHTML('beforeend', overlay);

//   // Submit handler
//   document.getElementById('submit').addEventListener('click', () => {

//   let problem = document.querySelector('input[name="problem"]:checked').value;
//   let comment = document.getElementById('comment').value;
//   console.log(problem, comment);
//   // Send data to server 
//   saveResponse(problem, comment);

//   // Remove overlay
//   document.getElementById('feedback-overlay').remove();

// });
// }
