
// Toggle Settings Gear On Click
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    // Toggle Class Fa-spin 
    this.classList.toggle("fa-spin");

    // Toggle Class Open 
    document.querySelector(".settings-box").classList.toggle("open");
};



// Local Storage Color Option, Checking if there is a color in the storage 
let mainColors = localStorage.getItem("color-option")

// If There Is A Color, set the color property in the local storage and give it the value
if (mainColors !== null) {

    document.documentElement.style.setProperty('--main-color', mainColors);

    // After Refreshing the Main Color Is Still Active Even If We Chose Another Color And The Theme Changed, We Should Add This
    // Remove Active Class From All Colors List Items 
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        // Add Active Class On Element With Data Color === Local Storage Item
        if (element.dataset.color === mainColors) {

            // Add Active Class
            element.classList.add("active");
        }
    });
}


// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval 
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty 
if  (backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {
        
        backgroundOption === true;

    } else {

        backgroundOption = false;
    }

    // Remove Active Class From All Spans
    document.querySelectorAll(".background-box span").forEach(element => {

        element.classList.remove("active");

    });

    if (backgroundLocalItem === 'true') {

        document.querySelector(".background-box .yes").classList.add("active");

    }   else {

        document.querySelector(".background-box .no").classList.add("active");
    }
}

// Switch Colors 
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items 
colorsLi.forEach(li => {
    
    // Click on List Items
    li.addEventListener("click", (e) => {   // adding event listener which is on click and event will happen

        // Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set Color On Local Storage 
        localStorage.setItem("color-option", e.target.dataset.color);

  /*      // Remove Active Class From All 
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");
        })

        // Add Active Class On Self 
        e.target.classList.add("active");  */

        // Adding function handleactive instead of the 3 lines up after we wrote the event in the handleActive function
        handleActive(e);  

    });
});



// Switch Backgrounds Option
const randomBackEl = document.querySelectorAll(".background-box span");

// Loop On All Spans 
randomBackEl.forEach(span => {

    // Click On Every Span
    span.addEventListener("click", (e) => {

        handleActive(e);
   /*   // Remove Active Class From All Childrens 
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");

        });

        // Add Active Class On Self
        e.target.classList.add("active");  */

        if (e.target.dataset.background === 'yes') {
            
            backgroundOption = true;
            
            randomizeImgs();

            localStorage.setItem("background_option", true);

        } else { 

            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);
        }
    });
});







// Select Landing Page Element 
let landingPage = document.querySelector(".landing-page");

// Get Array of Imgages 
let imgsArray =  ["landing1.png", "landing2.png", "landing3.png", "landing4.png", "landing5.png"]; 

// Function To Randomize Imgs
function randomizeImgs() {
    
    if (backgroundOption === true) {

// Arrow function to get random image every 5 seconds from the img array 
        backgroundInterval = setInterval(() => {
    
    // Get Random Number 
    let randomNumber = Math.floor(Math.random() * imgsArray.length);

    // Change Background Image URL 
    landingPage.style.backgroundImage = 'url("./Imgs/' + imgsArray[randomNumber] + '" )';
}, 4000);

    }
}

randomizeImgs ();



// Select Services Selector 
let ourServices = document.querySelector(".services");

window.onscroll = function () {

    // Services Offset Top      The Section Above The Services
    let servicesOffsetTop = ourServices.offsetTop;

    // Services Outer Height    The Height Of Our Section
    let servicesOuterHeight = ourServices.offsetHeight;

    // Window Height    
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let widnowScrollTop = this.pageYOffset;

    if (widnowScrollTop > (servicesOffsetTop + servicesOuterHeight - windowHeight)) {

        let allServices = document.querySelectorAll(".service-box .service-progress span");

        allServices.forEach(service => {

            service.style.width = service.dataset.progress;

        });
    }
};


// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add Class To Overylay
        overlay.className = 'popup-overlay';

        // Append Overylay To The Body
        document.body.appendChild(overlay);

        // Create The Popup Box
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = 'popup-box';

                // Adding the Title For Popup Image
                if (img.alt !== null) {

                    // Create Heading 
                    let imgHeading = document.createElement("h3");
        
                    // Create Text
                    let imgText = document.createTextNode(img.alt);
        
                    // Append The Text To The Heading 
                    imgHeading.appendChild(imgText);
        
                    // Append The Heading To The Popup Box
                    popupBox.appendChild(imgHeading);
                }

        

        // Create The Image
        let popupImage = document.createElement("img");

        // Set Image Source 
        popupImage.src =img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        // Append The Popup Box To Body
        document.body.appendChild(popupBox);

        // Create The Close Span
        let closeButton = document.createElement("span");

        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class to Close Button
        closeButton.className = 'close-button';

        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);

    });
});

// Close Popup
document.addEventListener("click", function (e) {

    if (e.target.className == 'close-button') {

        // Remove The Current Popup
        e.target.parentNode.remove();

        // Remove Overlay 
        document.querySelector(".popup-overlay").remove();
    }

});



// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {
    
    bullet.addEventListener("click", (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({
            
            behavior: 'smooth'

        });

    });
});


// Handle Active State 
function handleActive (ev) {

    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    // Add Active Class On Self
    ev.target.classList.add("active");

}


// Selecting Span In The Bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletlocalItem = localStorage.getItem("bullets-option");

if (bulletlocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletlocalItem === 'block') {

        bulletsContainer.style.display = 'block';
        
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");
    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'yes') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets-option", 'block');

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets-option", 'none');

        }

        handleActive(e);

    })
})


// Reset Button 

document.querySelector(".reset-options").onclick = function () {

    localStorage.clear();
/*  localStorage.removeItem("bullets-option");
    localStorage.removeItem("colors-option");
    localStorage.removeItem("background-option") */

    // Reload Window
    window.location.reload();
}



// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");

let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop Propagation
    e.stopPropagation();

    // Toggle Class menu active On Button
    this.classList.toggle("menu-active");

    // Toggle Class open On Links
    tlinks.classList.toggle("open");

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tlinks) {

        // Check If Menu Is Open
        if (tlinks.classList.contains("open")) {

            // Toggle Class menu active On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class open On Links
            tlinks.classList.toggle("open");
        }
        
    }

});

// Stop Propagation On Menu
tlinks.onclick = function (e) {
    
    e.stopPropagation();
}