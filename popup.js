document.addEventListener('DOMContentLoaded', function() {    
    loadProfileData();    

    function getStorageKey(key, success, failed)
    {
        chrome.storage.local.get([key], function(result) {            
            if(!!result[key])
            {
                success && success(result[key]);
            }
            else{
                failed && failed();
            }
        });  
    }

    function setStorageKey(key, value, cb)
    {
        var obj = {};
        obj[key] = value;
        chrome.storage.local.set(obj, function(result) {            
            cb && cb();
        });  
    }

    function hasProfile(success, failed)
    {        
        getStorageKey('profile_datetime', success, failed);        
    }

    function btnClicked(btn, success, failed){
       hasProfile(()=>{
        btn.classList.add('clicked');
        success && success();
       }, ()=>{        
        failed ? failed() : toggleWrapperDiv();
       });     
    }

    function toggleWrapperDiv()
    {
        document.getElementById('btnWrapper').classList.toggle('my-hide');
        document.getElementById('btnWrapper2').classList.toggle('my-hide');
    }

    document.getElementById('toggle').addEventListener('click', function(e) {        
        toggleWrapperDiv();
    });
    

    function executeButtonScript(btn, stepNo, )
    {
        btnClicked(btn, ()=> {
            getStorageKey('profile', pro=>{
                chrome.tabs.executeScript( {
                    code:'var stProfile='+JSON.stringify(pro),                    
                }, chrome.tabs.executeScript( {                    
                    file: `js/step${stepNo}.js`
                }, chrome.tabs.executeScript( {
                    code:'var stProfile="";'                    
                })));
            });   
        });     
    }

    document.getElementById('step1').addEventListener('click', function(e) {        
        executeButtonScript(e.target, 1);        
    });

    document.getElementById('step2').addEventListener('click', function(e) {    
        executeButtonScript(e.target, 2);
    });

    document.getElementById('step3').addEventListener('click', function(e) {    
        executeButtonScript(e.target, 3);
    });

    document.getElementById('step4').addEventListener('click', function(e) {    
        executeButtonScript(e.target, 4);
    });

    document.getElementById('step5').addEventListener('click', function(e) {    
        executeButtonScript(e.target, 5);
    });

    document.getElementById('step6').addEventListener('click', function(e) {    
        executeButtonScript(e.target, 6);
    });

    document.getElementById('step7').addEventListener('click', function(e) {    
        executeButtonScript(e.target, 7);
    });

    document.getElementById('clearProfile').addEventListener('click', function(e) {    
        chrome.storage.local.clear(()=>{            
            var error = chrome.runtime.lastError;            
            error && alert(error);
            loadProfileData();
        });        
    }); 
    
    document.getElementById('btnSaveProfile').addEventListener('click', function(e){

        chrome.storage.local.set({'profile_datetime':'value'}); 
        setStorageKey('profile', {
            userName: document.querySelector('#userName').value,
            userPassword: document.querySelector('#userPassword').value,
            travelDate: document.querySelector('#travelDate').value,
            roomCategory: document.querySelector('#roomCategory').value,
            noOfBeds: document.querySelector('#noOfBeds').value,
            bookieIdType:document.querySelector('#bookieIdType').value,
            bookieIdNo: document.querySelector('#bookieIdNo').value            
        }, ()=>loadProfileData() )
    });

    function loadProfileData() {
        getStorageKey('profile', pro => {
            document.querySelector('#userName').value = pro.userName;
            document.querySelector('#userPassword').value = pro.userPassword;
            document.querySelector('#travelDate').value = pro.travelDate;
            document.querySelector('#roomCategory').value = pro.roomCategory;
            document.querySelector('#noOfBeds').value = pro.noOfBeds;
            document.querySelector('#bookieIdType').value = pro.bookieIdType;
            document.querySelector('#bookieIdNo').value = pro.bookieIdNo;
        }, () => {
            document.querySelector('#userName').value = '';
            document.querySelector('#userPassword').value = '';
            document.querySelector('#travelDate').value = '';
            document.querySelector('#roomCategory').value = undefined;
            document.querySelector('#noOfBeds').value = undefined;            
            document.querySelector('#bookieIdType').value = undefined;
            document.querySelector('#bookieIdNo').value = '';
        } );
    }

  });
  