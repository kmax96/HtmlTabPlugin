var div_maskId = "div_mask";


function GetDefaultPanelId() {
     
    return headerPane.name;
}
function GetRootPanel(panelId)
{
    if (panelId === undefined || panelId == null) {
        //panelId = GetDefaultPanelId();
        return document.body;
    }
    else {
       return  document.getElementById(panelId);
    }



}


function ShowLoading(panelId, messageText) {
    //custom paratmeter here
    //when panelId not given
     
    var showText = true;
    if (messageText === undefined || messageText == null) {
        showText = false;
    }

    //Fix section
    var div_mask = document.getElementById(div_maskId);
    if (!(div_mask != null && typeof (div_mask) != "undefined")) {
        div_mask = document.createElement('div');
        div_mask.className = "div_mask";
        div_mask.id = div_maskId;
        var div_obj = document.createElement('div');
        div_obj.className = (!showText) ? "MaskLoadingImage" : "MaskText CenterText";
        div_obj.innerText = (!showText) ? "" : messageText;
        div_mask.appendChild(div_obj);

        GetRootPanel(panelId).appendChild(div_mask);
    }
}


function HideLoading() {
    var div_mask = document.getElementById(div_maskId);
    if (div_mask != null && typeof (div_mask) != "undefined") {
        // document.getElementById(headerPane.name).removeChild(div_mask);
        div_mask.parentElement.removeChild(div_mask)
        //div_mask.remove();
    }
}

function ShowMessageText(ShowTrick, messageText) {

    var div_Text = document.getElementById("div_Text");
    if ((div_Text != null && typeof (div_Text) != "undefined")) {
        //div_Text.remove();
        if ((div_Text.parentElement != null && typeof (div_Text.parentElement) != "undefined")) {
            div_Text.parentElement.removeChild(div_Text);
        }
    }
    div_Text = document.createElement('div');
    div_Text.id = "div_Text";
    div_Text.className = "MaskText RightTopText";

    // div_Text.innerHTML = "<img class='img_Trick'></img>" + messageText + "";
    div_Text.innerHTML = "<div><div class='" + ((ShowTrick) ? "img_Trick" : "img_Cross") + "'></div></div><div><span style=''>" + messageText + "</span></div>";
    // div_Text.innerHTML = "<a>" + messageText + "</a>";
    
    GetRootPanel(null).appendChild(div_Text);
    div_Text.style.opacity = 0.8;
    div_Text.addEventListener("click", function () {

        var interval = setInterval(function () {
            var o = div_Text.style.opacity;
            div_Text.style.opacity = o - 0.01; //For real browsers;
            div_Text.style.filter = "alpha(opacity=" + ((o - 0.01) * 100) + ")"; //For IE;

            setTimeout(function () {
                if ((div_Text.parentElement != null && typeof (div_Text.parentElement) != "undefined")) {
                    div_Text.parentElement.removeChild(div_Text);
                }

                clearInterval(interval);
              
            }, 800);

        }, 10);
    });
}
    

