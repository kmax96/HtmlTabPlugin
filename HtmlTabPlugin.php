<?php
/*
Plugin Name: Html Tab Plugin
Plugin URI:  http://XXX.com.hk/
Description: Using Js, Jquery and CSS to provide tab interface in html editor
Author: Max (NWC)
Version: 1.0

*/
	//echo (is_admin())?"true":"false";
	 //echo the_ID();
	//add_action('admin_menu','HtmlTabPlugin_admin_actions');
	add_action('admin_init', 'my_theme_add_editor_styles' );
	
 
	add_site_option("page_init","initJquery");
		
	 
	
	//add_action('admin_head', 'ImportJs' );//only add in admin page
	ImportCSS();
	
	 
	ImportJs();
	
	//add_action('admin_head', 'initJquery' );//only add in admin page
	//add_action('publish_portfolio','initJquery');
	//add_action('publish_page','initJquery');

function HtmlTabPlugin_admin_actions()
{	 
	add_options_page('HtmlTabPlugin','HtmlTabPlugin-Text','manage_options',_FILE_,'HtmlTabPlugin_admin');//Add to Setting as sub item
	//add_options_page('HtmlTabPlugin','HtmlTabPlugin-Text','manage_options',_FILE_,'HtmlTabPlugin_admin');
	//add_object_page("1","2","manage_options",_FILE_,"menuFunc");//Show bottom comment as new Item
	//add_utility_page("1","2","manage_options",_FILE_,"menuFunc");//Show on bottom as new Item
	//add_menu_page("1","2","manage_options",_FILE_,"menuFunc");//Show on bottom as new Item
}


function initJquery()
{
	wp_register_script('myscript2', plugins_url("js/jquery-1.11.3.min.js", __FILE__ ));
	wp_enqueue_script('myscript2');
	
}
function ImportJs()
{
	
	if(!is_admin()){
		initJquery();
		print "<meta http-equiv='X-UA-Compatible' content='IE=9; IE=8; IE=7' />"; 
	}
	
	
	//wp_register_script('myscript2', plugins_url("js/jquery-1.11.3.min.js", __FILE__ ));
	wp_register_script('AnimateScript', plugins_url("js/Animate.js", __FILE__ ));   
	wp_register_script('FuncScript', plugins_url("js/Func.js", __FILE__ ));   
	//wp_register_script('jqueryScript', plugins_url("js/jquery-1.10.2.js", __FILE__ ));
	
	
	
	/* wp_deregister_script('jquery');
	 wp_register_script('jquery', plugins_url("js/jquery-1.11.3.min.js", __FILE__ ), false, null);
  
   wp_enqueue_script('jquery');*/
	wp_enqueue_script('AnimateScript');
	wp_enqueue_script("FuncScript");
	
	//wp_enqueue_script('jqueryScript');
	/*$jqueryUrl=plugins_url("js/jquery-1.11.3.min.js", __FILE__ );
 
	print "<script src='$jqueryUrl' type='text/javascript'></script>";
	$jqueryUrl=plugins_url("js/Animate.js", __FILE__ );*/
	//echo "<head><script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js\"></script></head>";  
	
}
function ImportCSS()
{
    
	wp_register_style('Animate-style', plugins_url('css/Animate.css', __FILE__ ));
	wp_register_style('tab-style', plugins_url('css/tab.css', __FILE__ ));	
	wp_enqueue_style('Animate-style');
	wp_enqueue_style('tab-style');
	

}
function my_theme_add_editor_styles() {
  	add_editor_style(plugins_url('css/tab.css', __FILE__ ));
	//add_editor_script(plugins_url('js/tab.js', __FILE__ ));
}



function HtmlTabPlugin_admin()
{
	/*Show this html in Setting >""HtmlTabPlugin-Text"" */
	  echo "<div>AAAAAAAAAAAAAAAAAAAAAAAAA</div>";
}

function menuFunc()
{
	echo "123213213";
	
	
}
?>