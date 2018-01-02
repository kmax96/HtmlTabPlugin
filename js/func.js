function confirmAction(s, msg) {
    if (confirm(msg)) {
       
        return true;
    }
    else {
        return false;
    }
}

jQuery(document).ready(function() {
	
	// $ Works! You can test it with next line if you like
	// console.log($);
	 
	$=jQuery.noConflict();
	AddPublishEvent();
	
	
});
   
 jQuery("#content_ifr").ready(function() {
	
	// $ Works! You can test it with next line if you like
	 
	 
	//$=jQuery.noConflict();
	AddTabButton();
	
	setTimeout(setupTabJsInIframe,1000);
	 
	
});

 jQuery(function ($) {
        // Was needed a timeout since RTE is not initialized when this code run.
        setTimeout(function () {
			
			$("#content-tmce").on("click",function(){setupTabJsInIframe();});
		
			if(!$("#tinymce",$("#content_ifr").contents()).length>0)
			{return ;}
			if(tinymce!=null && typeof(tinymce)!="undefined"){
            for (var i = 0; i < tinymce.editors.length; i++) {
                tinymce.editors[i].onChange.add(function (ed, e) {
					 
                    setupTabJsInIframe();
					 
                   
                });
				}
			}
        }, 1000);
});
 
   
function AddTabButton()
{
	//var ed_toolbar = document.getElementById("ed_toolbar");
	var ed_toolbar = document.getElementById("wp-content-media-buttons");
	
	if(ed_toolbar!=null && typeof(ed_toolbar)!='undefined')
	{
		var input = document.createElement("input");
		input.id="qt_content_tab";
		 
		input.className="button";
		input.type="button";
		input.value="TAB";
		input.onclick=AddTabToHtmlEditor;
		ed_toolbar.appendChild(input);
		
	}	
}

function AddTabToHtmlEditor()
{
	var htmleditor= document.getElementById("content-html");
	if (!(htmleditor!=null && typeof(htmleditor)!="undefined"))
	{		
		return;
	}
	
	
	 if($('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents()).length==0)
		 {
			 var tab_num= prompt("How many tab page you need? ", "3");
			 if(!isInt(tab_num))
			 {
				 //alert("Please input an integer");
				 ShowMessageText(false,"Please input an integer");
				 return;				 
			 }
			 
			 switchEditors.switchto(htmleditor);
			 var htmlStr =getContent(tab_num);
			 if (htmlStr!=null && typeof(htmlStr)!="undefined")
			 {
				 var content= document.getElementById("content");
				 if (!(content!=null && typeof(content)!="undefined"))
				 {
					 return;
				 }
				 content.value +=htmlStr;
			}
			switchEditors.switchto(document.getElementById("content-tmce"));
			setupTabJsInIframe();	
		}
		else
		{
			//alert("Tab already exist");
			ShowMessageText(false,"Tab already exist");
		}	
}


function getContent(tab_num)
{
	var num= parseFloat(tab_num);
	var htmlStr="";
	if(num>0)
	{
		htmlStr= "<div style='clear:both;'><div class='HtmlTabPlugin_tabs standard'>";
		
		var tab_header="";
		var tab_body="";
		
		
		tab_header+="<ul class='HtmlTabPlugin_tab-links'>";
		tab_body+="<div class='HtmlTabPlugin_tab-content'>";
		
		for (i = 0; i < num; i++) {			
			var tabNum= i+1;
			tab_header+= (i==0)?"<li class='active'>":"<li>";
			tab_header+= "<a href='#tab"+tabNum+"' tabindex='-1' disabled>&nbsp;Tab #"+tabNum+"&nbsp;</a></li>";
			
			tab_body+= "<div id='tab"+tabNum+"' class='HtmlTabPlugin_tab"+ ((i==0)?" active":"") +  "'>";
			tab_body+="<div><p>Tab #"+tabNum+" content here</p></div></div>";	
			
		}
		tab_header+= "</ul>";
		tab_body+="</div>";
		
		htmlStr+=tab_header+tab_body;
		
		htmlStr+= "</div></div>";
	}
	 
	 
	
	return htmlStr;
}

function setupTabJsInIframe()
{
	
		reloadTab();
		AddRightClickEventWithTab();
	
}

function reloadTab()
{
	var obj_tab = null;
	
	
	if($('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents()).length>0){
		
		//setup Tab event in Admin editor
		$('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents()).off("click");
		
		
		$('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents()).on('click', function(e)  {
			//ShowLoading();
			
			var currentAttrValue = $(this,$("#content_ifr").contents()).attr('href');
			document.activeElement.blur();
			// Show/Hide Tabs
			$('.HtmlTabPlugin_tabs ' + currentAttrValue,$("#content_ifr").contents()).show().siblings().hide();
			// Change/remove current tab to active
			jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
			
			 
			//setTimeout(HideLoading,500);
			e.preventDefault();
		 
			
			
		 
		});
		 
	}
	else
	{
		if($('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a').length>0){
			//setup Tab event in display page
			$('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a').off("click");
			$('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a').on('click', function(e)  {
				var currentAttrValue = $(this).attr('href');
				// Show/Hide Tabs
				$('.HtmlTabPlugin_tabs ' + currentAttrValue).show().siblings().hide();
				// Change/remove current tab to active
				jQuery(this).parent('li').addClass('active').siblings().removeClass('active');		
				 				 
				e.preventDefault();
				 
			});
		}
	}
}

function AddRightClickEventWithTab()
{
	if($('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents()).length>0)	{
		$('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents()).off("contextmenu");
		$('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents()).on('contextmenu', function(e)  {
			var tab_text= prompt("Please input the tab name" ,$(this,$("#content_ifr").contents()).text());
			if(tab_text!="" && tab_text!=null){
				$(this,$("#content_ifr").contents()).text(tab_text);
				
			}
			e.preventDefault();
			 //return false;
		});
	}
}

function AddPublishEvent()
{
	if($("#publish").length>0)
	{
		$("#publish").on('click', function(e)  {
			if($('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents()).length>0){
				$('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents())[0].click();	
			}
		});
	}
	
	if($("#save-post").length>0)
	{
		$("#save-post").on('click', function(e)  {
			if($('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents()).length>0){
				$('.HtmlTabPlugin_tabs.standard .HtmlTabPlugin_tab-links a', $("#content_ifr").contents())[0].click();	
			}
		});
	}
	
	
	
}


function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}


