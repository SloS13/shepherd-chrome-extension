import './index.scss'


let ajaxCompleted = false

function addLink(){
  var clinicName = document.querySelector('.nav--primary__clinic-name')

  if (document.querySelector('#shep-tools')) {
    return;
  }

  if (clinicName) {
    //get users email if available
    var emailElement = document.querySelector('.user-email');
    var email = emailElement?.innerHTML;
    console.log('email:', btoa(email));
    var emailHref = 'https://google.com?email='+btoa(email);


    var a = document.createElement('a');
    a.href = emailHref;
    a.target = '_blank';
    a.innerHTML = 'Tools';

    var newElement = document.createElement('div');
    newElement.classList.add('nav--primary');
    newElement.id = 'shep-tools';
    newElement.style.padding = '6px';
    newElement.style.textAlign = 'center';
    newElement.append(a);

    clinicName.after(newElement);

    
    console.log('nav found');
  } else {
    console.log('nav not found')
  }  
};



let lastUrl = ""; 
new MutationObserver(() => {
  const url = location.href;
  //do a 100ms timeout
  setTimeout(() => {
    if (url !== lastUrl) {
      lastUrl = url;
      addLink();
    }
  }, 100);



  
}).observe(document, {subtree: true, childList: true});

// function onUrlChange() {
//   console.log('URL changed!', location.href);
// }
