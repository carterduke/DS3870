var employees;
$.getJSON("https://www.swollenhippo.com/getProfileDetailsByAPIKey.php?APIKey=DuffManSays,Phrasing!", function(result){
    employees = result;
    buildEmployeeCard();
    buildDetailsCard();
})

function buildEmployeeCard(){
    $.each(employees,function(i,employee){
        let strHTML = '<div class>';
        strHTML += '<div class="mt-3 mb-3">';
        strHTML += '<img class="mb-3" src="https://www.swollenhippo.com/archer.jpg" alt="Profile"  style="border-radius: 50%; float: left; margin-right:20px;">';
        strHTML += '</div>';
        strHTML += '<div class="mt-4">';
        strHTML += '<h3 class="text-info">' + employee.FirstName + ' ' + employee.LastName + '</h3>';
        strHTML += '</div>';
        strHTML += '<div>';
        strHTML += '<h4>Code Name: ' + employee.CodeName + '</h4>';
        strHTML += '</div>';
        strHTML += '<div>';
        strHTML += '<h4 class="mb-0">Billing Agency: ' + employee.Agency + '</h4>';
        strHTML += '<h4 class="mb-0">Position: ' + employee.Job + '</h4>';
        strHTML += '<h4 class="mt-0">Hire Date: ' + employee.HireDate + '</h4>';
        strHTML += '</div>';
        strHTML += '<div class="btn btn-primary btnToggleContact text-center" style="margin:30px auto 40px auto; width:95%;" >Toggle Contact Details</div>';
        strHTML += '</div>'
        $('#divEmployeeContainer').append(strHTML);
    })
}



$(document).on('click','.btnToggleContact',function(){
    $('#divContactDetails').slideToggle();
})

function buildDetailsCard(){
    $.each(employees,function(i,employee){
        let strHTML = '<div class="text-left mt-3">'
        strHTML += '<p class="mb-0 mt-3">Email: <a href="mailto:' + employee.Email + '" class="aEmail">' + employee.Email + '</a></p>';
        strHTML += '<p class="mt-0">Phone: <a href="tel' + employee.Phone + '" class="aPhone">' + employee.Phone + '</a></p>';
        strHTML += '<p class="mb-0">Street Address: ' + employee.Street1 + '</p>';
        strHTML += '<p class="mb-0">City: ' + employee.City + '</p>';
        strHTML += '<p class="mb-0">State: ' + employee.State + '</p>';
        strHTML += '<p class="mt-0">Zip Code: ' + employee.ZIP + '</p>';
        strHTML += '<p class="mb-0">Emergency Contact: ' + employee.Econtact + '</p>';
        strHTML += '<p class="mt-0">Phone: <a href="tel:' + employee.EContactNumber + '" class="aPhone">' + employee.EContactNumber + '</a></p>';
        strHTML += '</div>'
        $('#divContactDetails').append(strHTML);
    })
}

var table
$.getJSON("https://www.swollenhippo.com/getPayStubsByAPIKey.php?APIKey=DuffManSays,Phrasing!",function(result){
    table = result;
    buildTable();
})

function buildTable(){
    $.each(table,function(i,employee){
        $('#tblPayStubs tbody').append('<tr><td>' + employee.Month + '</td><td>' + employee.Year + '</td><td>' + employee.Sales + '</td><td>' + employee.Hours + '</td><td>' + employee.Rate + '</td><td>' + employee.CommissionRate + '</td><td>' + ((employee.Hours * employee.Rate) + ( employee.CommissionRate * employee.Sales)).toFixed(2) + '</td></tr>');
    })
    $('#tblPayStubs').DataTable();
}