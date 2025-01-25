import './index.scss'

var className = 'nav--primary'

let ajaxCompleted = false

const observer = new MutationObserver(() => {
  // Check if all AJAX requests are completed
  if (checkAjaxComplete()) {
    ajaxCompleted = true
    observer.disconnect()

    // Execute your code here after all AJAX requests are done
    console.log('All AJAX requests have completed!')

    //wait for 1 second
    setTimeout(() => {
      var nav = document.querySelector(`.${className}`)
    if (nav) {
      let firstNav = nav.children[1]; //this will be Dashboard

      //we want to clone this item and place it just after the first item
      let clone = firstNav.cloneNode(true);

      //set clone aria-label to 'Home'
      clone.setAttribute('aria-label', 'Tools');

      clone.querySelector('.nav__icon').classList.remove('nav__icon--dashboard');
      clone.querySelector('.nav__icon').classList.add('nav__icon--enter-beta');

      clone.classList.remove('active');  

      var emailElement = document.querySelector('.user-email');
      var email = emailElement?.innerHTML;
      console.log('email:', btoa(email));

      //find element within clone with class "nav__icon--dashboard" and replace with "nav__icon--enter-beta"
      //base 64 encode email
      // var encodedEmail = btoa(email);

      let emailHref = 'https://google.com?email='+btoa(email);

      clone.querySelector('.nav__text').innerHTML = '<a href="'+emailHref+'" target="_blank">Tools</a>';

      // alert(email);

      //set id to bayside-tools
      // clone.setAttribute('id', 'bayside-tools');

      //add a listener for clicks on this
      clone.addEventListener('click', function() {
        //redirect to tools page
        window.location.href = 'https://baysidevetclinic.com/portal';
      })

      

      // clone.querySelector('.nav__icon--dashboard').classList.remove('nav__icon--dashboard');
      // clone.querySelector('.nav__icon--dashboard').classList.add('nav__icon--enter-beta');

      //find an element with class "nav__text" and set the innerHTML to 'Home'
      // clone.querySelector('.nav__notif').hide();
      // clone.querySelector('.nav__notif-badge').delete();
      
      nav.insertBefore(clone, firstNav.nextSibling);

      
      console.log('nav found');
    } else {
      console.log('nav not found')
    }  
    }, 1000)

    
  }
})

observer.observe(document.body, { childList: true, subtree: true })

function checkAjaxComplete() {
  // Implement your own logic to check if all AJAX requests are finished
  // For example, you can check for a specific element that is added to the DOM after the last AJAX request
  return document.querySelector('#ajax-loader') === null
}
