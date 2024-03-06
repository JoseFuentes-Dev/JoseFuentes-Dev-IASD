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
function scrollTo(pos) {
	$('html, body').stop().animate({scrollTop: pos}, 500);
  }
  
  function activeClass(target, className) {
	  target.addClass(className).siblings().removeClass(className);
  }
  
  function resizeHeight() {
	const _sectionHeight = $(window).height();
	 $(".tab-content .sec").height(_sectionHeight);
  }
  
  function getOffsets() {
	const _offsets = [];
	$(".tab-content .sec").each(function (i) {
	  _offsets[i] = $(this).offset().top;
	});
	return _offsets;
  }
  
  
  $(function() {
	const tabButtons = $(".tab-navigation li");
	let offsets = [];
	
	$(window).load(function () {
	  resizeHeight();
	  offsets = getOffsets();
	});
	
	$(window).resize(function(){
	  resizeHeight();
	  offsets = getOffsets();
	})
  
	//click (tab-navgigation-button)
	tabButtons.click(function (event) {
	  event.preventDefault();
  
	  const index = $(this).index();
	  const pos = index > 0 ? offsets[index] : 0;
	  scrollTo(pos);
	});
	
  $(window).scroll(function () {
	const pos = $(this).scrollTop();
	let targetClass;
	let activeTarget;
  
	 for (let i = 0; i < offsets.length; i++) {
		if (pos <= offsets[0]) {
		  targetClass = ".tab01";
		  break;
		} else if (pos > offsets[i - 1] && pos <= offsets[i]) {
		  targetClass = ".tab0" + (i+1);
		} else if (pos >= offsets[offsets.length]) {
		  targetClass = ".tab05";
		}
	  }
	  activeTarget = $(targetClass);
	  activeClass(activeTarget, "active");
	});
  });
