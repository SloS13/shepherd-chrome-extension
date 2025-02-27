chrome.runtime.onInstalled.addListener(async (opt) => {
  if (opt.reason === 'install') {
    await chrome.storage.local.clear()

    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL('src/setup/index.html?type=install'),
    })
  }

  // if (opt.reason === 'update') {
  //   chrome.tabs.create({
  //     active: true,
  //     url: chrome.runtime.getURL('src/setup/index.html?type=update'),
  //   })
  // }
})


//async set last to zero

//read all xhr requests
// chrome.webRequest.onCompleted.addListener(
//   function (details) {
//     console.log(details)
//   },
//   { urls: ['<all_urls>'] }
// )

//read all xhr requests
// chrome.webRequest.onCompleted.addListener(async function(details) {
//   // get response headers here here
//   console.log(details)
// }, {urls: ['<all_urls>']}, ['responseHeaders'])

//functionality to read all xhr responsees
chrome.webRequest.onCompleted.addListener(function (responseDetails) {
  // get response headers here here


  if (responseDetails.method == 'POST' && responseDetails.url.includes('invoices/search'))
  {
    console.log("Response Details:",responseDetails)
  }
}
, { urls: ['<all_urls>'] }, ['responseHeaders'])


chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    // get request headers here
    //find details.requestHeaders with name of 'AUTHORIZATION'
    // console.log(details)
    // chrome.storage.local.set({ lastShepTokenUpdate: 0 })
    
    //if the token is older than 5 minutes

    
    if (false) {
      if (details.requestHeaders) {
        for (let i = 0; i < details.requestHeaders.length; i++) {
          if (details.requestHeaders[i].name === 'AUTHORIZATION') {
            let token = details.requestHeaders[i].value
            //split at space
            let tokenParts = token.split(' ')
            //get the token part
            let tokenValue = tokenParts[1]
            
            chrome.storage.local.set({shepToken: tokenValue}, function() {
              if(chrome.runtime.lastError) {
                console.error(
                  "Error setting " + key + " to " + JSON.stringify(tokenValue) +
                  ": " + chrome.runtime.lastError.message
                );
              }
            });
            
            // Getting
            chrome.storage.local.get("key", function(data) {
              // Do something with data.key
            });

            //store when last updated
            // chrome.storage.local.set({ lastShepTokenUpdate: Date.now().valueOf() })

          //   chrome.runtime.sendMessage({
          //     msg: "token_set", 
          //     data: {
          //         token: tokenValue,
          //     }
          // });

            console.log(
              'Set token to: ' + tokenValue + ' at ' + Date.now().valueOf()
            )
          }
        }
      }
    }
  },
  { urls: ['<all_urls>'] },
  ['requestHeaders']
)

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

export {}
