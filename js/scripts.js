
//проверка устройства

const isMobile = {
  Android: () => {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: () => {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  ios: () => {
    return navigator.userAgent.match(/ios/i);
  },
  Opera: () => {
    return navigator.userAgent.match(/Opera/i);
  },
  Windows: () => {
    return navigator.userAgent.match(/Windows/i);
  },
  any: () => {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.ios() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  }
};

if (isMobile.any()){
  document.body.classList.add('_touch');
} else {
  document.body.classList.add('_pc');
}


//меню бургер

const head = document.querySelector('.header');
const imgFix = document.querySelector('.logo-img');
const linkFix = document.querySelectorAll('a.header-menu__body-list-item-link');
// const imgFix = document.querySelector('.logo-img');
const iconMenu = document.querySelector('.header-menu__icon');
const menuBody = document.querySelector('.header-menu__body');
// console.log(iconMenu);
// console.log(menuBody);
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

var scroll_distance = 120;

window.addEventListener('scroll', fixHeader);

function fixHeader() {
  if(linkFix.length > 0){
    if ( window.pageYOffset >= scroll_distance ){
      linkFix.forEach(linkFix => {
        // console.log("add!" );
        linkFix.classList.add('_fix');
      });
    }else {
      linkFix.forEach(linkFix => {
        // console.log("rem!" );
        linkFix.classList.remove('_fix');
      });
    }
  }
  if ( window.pageYOffset >= scroll_distance) {
    head.classList.add('_fix');
    iconMenu.classList.add('_fix');
    menuBody.classList.add('_fix');
    imgFix.classList.add('_fix');
  } else {
    head.classList.remove('_fix');
    iconMenu.classList.remove('_fix');
    menuBody.classList.remove('_fix');
    imgFix.classList.remove('_fix');
  }
};

// прокрутка к якорю

const menuLinks = document.querySelectorAll('.header-menu__body-list-item-link[data-goto]');
// console.log(menuLinks.length);
if(menuLinks.length > 0){
  menuLinks.forEach(menuLinks => {
    // console.log("click!" );
    menuLinks.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    // console.log(menuLink);
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;
      // console.log("Гото ",gotoBlock);
      if (iconMenu.classList.contains('_active') || iconMenu.classList.contains('_pc')){
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove ('_active');
      }

      // console.log("Ссылка ",gotoBlockValue);

      window.scrollTo({
        top: gotoBlockValue,
        dehavior: "smooth"
      });
      //отключает работу ссылки!
      e.preventDefault();
    }
  }
}