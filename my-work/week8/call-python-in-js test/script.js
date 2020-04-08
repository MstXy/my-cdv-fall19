console.log('script loaded.');
console.log('hi');

function postData(input) {
    console.log('loaded');
    $.ajax({
        type: "POST",
        url: "python_code.py",
        data: { param: input },
        success: callbackFunc
    });
}

function callbackFunc(response) {
    // do something with the response
    console.log(response);
    alert("working");
    console.log(getRandom('data'));
}


console.log('hi');
postData('data to process');
