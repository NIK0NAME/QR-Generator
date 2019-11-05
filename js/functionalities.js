
async function printMsg(msg) {
    console.log("Entra - " + msg);
    console.log(msg.length);
    for(var i = 0; i < msg.length; i++) {
        var a = msg[i];
        setTimeout(function(a){ 
            $('[name="qr_text"]').val($('[name="qr_text"]').val() + a);
            console.log(a);
        }, 500);
    }
}

//Generate QR with google service using simple url to ger QR
function getMyQR() {
    //$('.result').hide();
    var gifUrl = "https://i.giphy.com/media/oQxxiAx3EzaU0/giphy.webp";
    var errorUrl = "https://i.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.webp";

    var my_code = "";

    $('#result_content').attr('src', gifUrl);

    var seed = window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;//Math.floor(Math.random() * 100) + 1;
    var generateMD5;
    

    

    var cht = "cht=qr",
        chs = "chs=100x100",
        chl = "chl=" + "ALKI",
        choe = "choe=UTF-8";

    if($('[name="qr_w"]').val() != "" && $('[name="qr_h"]').val() != "") {
        chs = "chs=" + $('[name="qr_w"]').val();
        chs += "x" + $('[name="qr_h"]').val();
    }

    if($('[name="qr_text"]').val() != "") {
        chl = "chl=" + $('[name="qr_text"]').val();
        my_code = $('[name="qr_text"]').val();
        console.log(chl);
    }else {
        generateMD5 = hex_sha256(seed);
        //$('[name="qr_text"]').val(generateMD5);
        //printMsg(generateMD5 + "");
        my_code = generateMD5;
        console.log(generateMD5 + " - - " + seed);
        chl = "chl=" + $('[name="qr_text"]').val();
    }

    $('[name="qr_text"]').val("");

    var generatedURL = "https://chart.googleapis.com/chart?" + cht + "&" + chs + "&" + chl + "&" + choe;

    $.ajax({
        url: generatedURL,
        async: false,
        success: function(result) {
            setTimeout(function(){ 
                //console.log(result);
                $('.resulto').text("Code: " + my_code);
                $('#result_content').attr('src', generatedURL);
            }, 3000);
        },
        error(xhr,status,error) {
            //console.log(error);
            $('#result_content').attr('src', errorUrl);
        }
    });
}

function generateQrJs() {

}