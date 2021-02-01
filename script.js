//for input file
$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
  
//declaring variable
var input, extension, inputArray, 
inputX, inputY, lengthX, lengthY, sumX, sumY, meanX, meanY, inputXMinusMeanX, inputYMinusMeanY, inputXYMinusMeanXY, sumInputXYMinusMeanXY, 
squareInputXMinusMeanX, sumSquareInputXMinusMeanX, b
bTimesSumX, sumYMinusbTimesSumX, a, eq;
  
//get the input file data
function init() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
};
  
function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
};
  
function handleFileLoad(event){
    console.log(event);
    input = event.target.result;
};
  
//calculating the correlation
function calculation() {
    //get the file input extension
    extension = document.getElementById("fileInput").value.split(".")[1];
    console.log(extension);

    if (extension == "dat") {
        inputing();
        console.log(inputArray);
        if (typeof inputY[0] == "string") {
            calculating();
            showResult();
        }
        else {
            warning();
        };
    }
    else {
        if (extension == "txt") {
            inputing();
            console.log(inputArray);
            if (typeof inputY[0] == "string") {
                calculating();
                showResult();
            }
            else {
                warning();
            };
        }
        else {
            warning();
        };
    };
};

//inputing
function inputing() {
    //converting input data from string to array
    inputArray = input.split("\n").map(function (d) {
        return d.split("\t");
    });

    //determining x and y
    inputX = [];
    inputY = [];
    for (i = 0;i < inputArray.length;i++) {
        inputX[i] = inputArray[i][0];
        inputY[i] = inputArray[i][1];
        if (inputX[i] == "-999.25") {
            inputX[i] = "0";
        }
        else {
            inputX[i] = inputX[i];
        };
        if (inputY[i] == "-999.25") {
            inputY[i] = "0";
        }
        else {
            inputY[i] = inputY[i];
        };
    };

    //determining input data x and y length
    lengthX = inputX.length;
    lengthY = inputY.length;
};

//calculating
function calculating() {
    //calculating sum x and y
    sumX = eval(inputX.join("+"));
    sumY = eval(inputY.join("+"));
    
    //calculating mean x and y
    meanX = sumX / lengthX;
    meanY = sumY / lengthY;

    //calculating x minus mean x
    inputXMinusMeanX = [];
    for (j = 0;j < lengthX;j++) {
        inputXMinusMeanX[j] = inputX[j] - meanX;
    };

    //calculating y minus mean y
    inputYMinusMeanY = [];
    for (k = 0;k < lengthY;k++) {
        inputYMinusMeanY[k] = inputY[k] - meanY;
    };

    //calculating xy minus mean xy
    inputXYMinusMeanXY = [];
    for (l = 0;l < lengthX;l++) {
        inputXYMinusMeanXY[l] = inputXMinusMeanX[l] * inputYMinusMeanY[l];
    };

    //calculating sum of xy minus mean xy
    sumInputXYMinusMeanXY = eval(inputXYMinusMeanXY.join("+"));

    //calculating square of x minus mean x
    squareInputXMinusMeanX = [];
    for (m = 0;m < lengthX;m++) {
        squareInputXMinusMeanX[m] = Math.pow(inputXMinusMeanX[m], 2);
    };

    //calculating sum of square of x minus mean x
    sumSquareInputXMinusMeanX = eval(squareInputXMinusMeanX.join("+"));

    //calculating b
    b = sumInputXYMinusMeanXY / sumSquareInputXMinusMeanX;

    //calculating b times sum of x
    bTimesSumX = b * sumX;

    //calcualting sum of y minus b times sum of x
    sumYMinusbTimesSumX = sumY - bTimesSumX;

    //calculating a
    a = sumYMinusbTimesSumX / lengthX;

    //determining the regression equation
    //determining b
    if (b == "1") {
        bb = "X";
    }
    else if (b == "0") {
        bb = "";
    }
    else if (b == "-1") {
        bb = "- X";
    }
    else {
        bb = b + "X";
    };
    //determining a
    if (a > "0") {
        aa = "+" + " " + a;
    }
    else if (a == "0") {
        aa = "";
    }
    else if (a < "0") {
        aa = "-" + " " + Math.abs(a);
    }
    else {
        aa = a;
    };
    //determining the equation
    eq = "<i>" + "Y = " + bb + " " + aa +"</i>";
};

//warning that the data doesn't meet the requierments
function warning() {
    console.log("Your data doesn't meet requierments");
    $("#fileLabel").removeClass("border-primary");
    $("#fileLabel").addClass("border-danger");
    $("#dataReq").removeClass("text-secondary");
    $("#dataReq").addClass("text-danger font-weight-bold");
    $("#details").addClass("d-none");
    $("#result").hide();
    $("#details-show").addClass("d-none");
    $("#warning").removeClass("d-none").show();
};

//showing the data result
function showResult() {
    //showing the data result
    $("#warning").hide();
    $("#details").hide();
    $("#result").show();
    $("#details-show").removeClass("d-none").show();
    console.log(inputX);
    document.getElementById("inputX").innerHTML = inputX.join("<p></p>");
    console.log(inputY);
    document.getElementById("inputY").innerHTML = inputY.join("<p></p>");
    console.log(lengthX);
    document.getElementById("lengthX").innerHTML = lengthX;
    console.log(lengthY);
    document.getElementById("lengthY").innerHTML = lengthY;
    console.log(sumX);
    document.getElementById("sumX").innerHTML = sumX;
    console.log(sumY);
    document.getElementById("sumY").innerHTML = sumY;
    console.log(meanX);
    document.getElementById("meanX").innerHTML = meanX;
    console.log(meanY);
    document.getElementById("meanY").innerHTML = meanY;
    console.log(inputXMinusMeanX);
    document.getElementById("inputXMinusMeanX").innerHTML = inputXMinusMeanX.join("<p></p>");
    console.log(inputYMinusMeanY);
    document.getElementById("inputYMinusMeanY").innerHTML = inputYMinusMeanY.join("<p></p>");
    console.log(inputXYMinusMeanXY);
    document.getElementById("inputXYMinusMeanXY").innerHTML = inputXYMinusMeanXY.join("<p></p>");
    console.log(sumInputXYMinusMeanXY);
    document.getElementById("sumInputXYMinusMeanXY").innerHTML = sumInputXYMinusMeanXY;
    console.log(squareInputXMinusMeanX);
    document.getElementById("squareInputXMinusMeanX").innerHTML = squareInputXMinusMeanX.join("<p></p>");
    console.log(sumSquareInputXMinusMeanX);
    document.getElementById("sumSquareInputXMinusMeanX").innerHTML = sumSquareInputXMinusMeanX;
    console.log(b);
    document.getElementById("b").innerHTML = b;
    console.log(bTimesSumX);
    document.getElementById("bTimesSumX").innerHTML = bTimesSumX;
    console.log(sumYMinusbTimesSumX);
    document.getElementById("sumYMinusbTimesSumX").innerHTML = sumYMinusbTimesSumX;
    console.log(a);
    document.getElementById("a").innerHTML = a;
    console.log(eq);
    document.getElementById("eq").innerHTML = eq;
    document.getElementById("eq-big").innerHTML = eq;
    $("#fileLabel").removeClass("border-danger text-danger");
    $("#fileLabel").addClass("border-primary");
    $("#dataReq").removeClass("text-danger font-weight-bold");
    $("#dataReq").addClass("text-secondary");
};

//copy to clipboard
function copy(selector){
    var $temp = $("<div>");
    $("body").append($temp);
    $temp.attr("contenteditable", true)
         .html($(selector).html()).select()
         .on("focus", function() { document.execCommand('selectAll',false,null); })
         .focus();
    document.execCommand("copy");
    $temp.remove();
};

//details button
$("#details-show").click(function() {
    $("#result").hide();
    $("#details").removeClass("d-none").show();
    $("#details-show").hide();
});
$("#details-hide").click(function() {
    $("#details").hide();
    $("#result").show();
    $("#details-show").show();
});