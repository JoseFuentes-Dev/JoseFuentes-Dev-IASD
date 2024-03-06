const menu = document.querySelector(".menu");
const menuMain = menu.querySelector(".menu-main");
const goBack = menu.querySelector(".go-back");
const menuTrigger = document.querySelector(".mobile-menu-trigger");
const closeMenu = menu.querySelector(".mobile-menu-close");
let subMenu;
menuMain.addEventListener("click", (e) =>{
	if(!menu.classList.contains("active")){
		return;
	}
  if(e.target.closest(".menu-item-has-children")){
	   const hasChildren = e.target.closest(".menu-item-has-children");
	 showSubMenu(hasChildren);
  }
});
goBack.addEventListener("click",() =>{
	 hideSubMenu();
})
menuTrigger.addEventListener("click",() =>{
	 toggleMenu();
})
closeMenu.addEventListener("click",() =>{
	 toggleMenu();
})
document.querySelector(".menu-overlay").addEventListener("click",() =>{
	toggleMenu();
})
function toggleMenu(){
	menu.classList.toggle("active");
	document.querySelector(".menu-overlay").classList.toggle("active");
}
function showSubMenu(hasChildren){
   subMenu = hasChildren.querySelector(".sub-menu");
   subMenu.classList.add("active");
   subMenu.style.animation = "slideLeft 0.5s ease forwards";
   const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
   menu.querySelector(".current-menu-title").innerHTML=menuTitle;
   menu.querySelector(".mobile-menu-head").classList.add("active");
}

function  hideSubMenu(){  
   subMenu.style.animation = "slideRight 0.5s ease forwards";
   setTimeout(() =>{
	  subMenu.classList.remove("active");	
   },300); 
   menu.querySelector(".current-menu-title").innerHTML="";
   menu.querySelector(".mobile-menu-head").classList.remove("active");
}

window.onresize = function(){
	if(this.innerWidth >991){
		if(menu.classList.contains("active")){
			toggleMenu();
		}

	}
}
//navbar down

window.addEventListener("scroll",function(){
	
 let header =  document.querySelector("header");
  header.classList.toggle("down",window.scrollY>0);
});





//priueba
function Tabs(options){
	
	var tabs = document.querySelector(options.el);
	var initCalled = false;
	var tabNavigation = tabs.querySelector(".c-tabs-nav");
	var tabNavigationLinks = tabs.querySelectorAll(".c-tabs-nav__link");
	var tabContentContainers = tabs.querySelectorAll(".c-tab");

	var marker = options.marker ? createNavMarker() : false;

	var activeIndex = 0;

  function init(){
		if (!initCalled){
			initCalled = true;

			for (var i = 0; i < tabNavigationLinks.length; i++){
    			var link = tabNavigationLinks[i];
    			clickHandlerSetup(link, i)
    		}

    		if (marker){
    			setMarker(tabNavigationLinks[activeIndex]);
    		}
		}
	}

	function clickHandlerSetup(link, index){
    	link.addEventListener("click", function(e){
    		e.preventDefault();
    		goToTab(index);
    	})
    }

    function goToTab(index){
    	if (index >= 0 && index != activeIndex && index <= tabNavigationLinks.length){
    		tabNavigationLinks[activeIndex].classList.remove('is-active');
    		tabNavigationLinks[index].classList.add('is-active');
    		
    		tabContentContainers[activeIndex].classList.remove('is-active');
    		tabContentContainers[index].classList.add('is-active');

    		if (marker){
    			setMarker(tabNavigationLinks[index]);
    		}

    		activeIndex = index;
    	}
    }

    function createNavMarker(){
    	var marker = document.createElement("div");
    	marker.classList.add("c-tab-nav-marker");
    	tabNavigation.appendChild(marker);
    	return marker;
    }

    function setMarker(element){
        marker.style.left = element.offsetLeft +"px";
        marker.style.width = element.offsetWidth + "px";
    }

    return {
    	init: init,
    	goToTab: goToTab
    }
}


var m = new Tabs({
	el: "#tabs",
	marker: true
});

m.init();