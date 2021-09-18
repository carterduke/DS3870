var arrEmployees;
$.getJSON("https://www.swollenhippo.com/getStaffByAPIKey.php?APIKey=DuffManSays,Phrasing!", function(result){
    console.log(result);
    arrEmployees = result;
    buildEmployeeCard();

})

function buildEmployeeCard(){
    $.each(arrEmployees,function(i,person){
        if(person.FirstName != 'John'){
            let strHTML = '<div class="card col-3 mt-5 ml-2">';
            strHTML += '<img src="images/profile.png" alt="Profile Image" style="margin:auto; max-width:100%;">';
            strHTML += '<h3 class="text-center"><a href="mailto:' + person.Email + '">' + person.FirstName + ' ' + person.LastName + '</a></h3>';
            strHTML += '<h4 class="text-center">' + person.Title +'</h4>';
            strHTML += '<h4 class="mt-3">Contact Details</h4>';
            strHTML += '<p>Phone Number: ' + person.HomePhone + '</p>';
            strHTML += '<p>Email: ' + person.Email + '</p>';
            strHTML += '<h4 class="mt-3">Address</h4>';
            strHTML += '<p> ' + person.StreetAddress1 + '</p>';
            strHTML += '<p> ' + person.City + ',' + person.State + ' </p>' ;
            strHTML += '<h4 class="mt-3">Pay Details</h4>';
            strHTML += '<p class="txtHourlyWage" data-rate="' + person.HourlWage + '">Pay Rate: ' + person.HourlyWage + '</p>';
            strHTML += '<p>Hours Worked: ' + person.Hours + '</p>';
            strHTML += '<p>Tax Rate: ' + person.TaxRate + '</p>';
            strHTML += '<div class="form-group">';
            strHTML += '<label class="mr-2">Goal Pay</label>';
            strHTML += '<input class="txtGoalPay" enabled>';
            strHTML += '<button class="btn btn-primary btn-block btnCalculatePay">Find Hours For Goal</button>'
            strHTML += '</div>';
            strHTML += '</div>';
            $('#divEmployeeCards').append(strHTML);
            $('#tblEmployees tbody').append('<tr><td>' + person.FirstName + '</td><td>' + person.LastName + '</td><td>'  + person.Title + '</td><td>' +  + '</td></tr>');
        }
        
    });
    $('#tblEmployees').DataTable();
}

$(document).on('click','.btnCalculatePay',function() {
    let decHours = $(this).closest('.card').find('.txtHours').val();
    let decRate = $(this).closest('.card').find('.txtHourlyRate').val().split(': ')[1];
    // let decRate = $(this).closest('.card').find('.txtHourlyRate').attr('data-rate');
    $(this).closest('.card').find('.txtTotalPay').val(decHours * decRate);
});