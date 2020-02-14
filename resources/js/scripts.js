var in_url = document.getElementById("in_url");
var sel_method = document.getElementById("sel_method");
var sel_c_type = document.getElementById("sel_c_type");
var in_body = document.getElementById("in_body");
var result = document.getElementById("result");

function justDoIt(){
    var method = sel_method.options[sel_method.selectedIndex].value;
    var c_type = sel_c_type.options[sel_c_type.selectedIndex].value;

    var options = optionsGET(c_type);
    if(method==='POST'){
        if(in_body.value.length===0){
            result.value = 'Empty body not allowed!';
            return;
        }
        options = optionsPOST(c_type);
    }
    
    var url = in_url.value;

    if(url===null || url.length===0){
        result.value = 'Invalid URL!';
        return;
    }

    fetch(url, options)
    .then(response => {
        return response.text();
    })
    .then(data => {
        result.value = data;
    })
    .catch(function(error) {
        console.log(error);
        result.value = error;
    });;
}

function optionsGET(c_type){
    return {
        method: 'GET',
        headers: {
            "Content-Type": c_type,
        }
    };
}

function optionsPOST(c_type){
    return {
        method: 'POST',
        headers: {
            "Content-Type": c_type,
            "Access-Control-Allow-Origin": 'http://www.google.com.br'
        },
        body: in_body.value,
    };
}

function methodChanged(){
    var method = sel_method.options[sel_method.selectedIndex].value;
    if(method==='POST'){
        document.getElementById("post_body_container").style.display = 'unset';
    }else{
        document.getElementById("post_body_container").style.display = 'none';
    }
}
  
