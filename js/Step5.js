(function () {    
    document.querySelector('#drpCat').value = stProfile.roomCategory;
    document.querySelector('#drpCat').dispatchEvent(new Event('change'));

    setTimeout(function () {
        var intvl = setInterval(function () {
            var btn = document.querySelector('#BtnAccept')
            if (btn.clientHeight > 0) {
                clearInterval(intvl);

                var dt = stProfile.travelDate;
                if(!dt)
                {
                    let allDt = document.querySelectorAll('#DrpResvDate option');
                    dt = allDt[allDt.length - 1].value;
                }
                document.querySelector('#DrpResvDate').value = dt;                                
                document.querySelector('#drpNOB').value = stProfile.noOfBeds;
                
                document.querySelector('#BtnAccept').click();

                setTimeout(function () {
                    var intvl = setInterval(function () {
                        var grid = document.querySelector('#GridView1');
                        if (grid.clientHeight > 0) {
                            clearInterval(intvl);
                            let bhawanBookingSlot = document.querySelector('#GridView1_RadBook_7');
                            if(bhawanBookingSlot)
                            {
                                bhawanBookingSlot.click();
                            }
                            else {
                                alert('No room available at Bhawan. Drive manually now.');
                            }
                        }
                    }, 250);
                }, 1000);
            }
        }, 250);
    }, 1000);
})()