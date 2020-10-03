  ((window, document) => {
    const SIDE_NAV_STORAGE_KEY = 'side-nav-is-open';

    displaySideNav(); //initialize the nav state when the page is refreshed

    window.addEventListener('DOMContentLoaded', function() {
      let menutoggle = document.getElementById('menutoggle');
      menutoggle.addEventListener('click', function() { //toggle state when clicked
        toggleSideNav();
      });
    });

    function isSideNavOpen() {
      const NAV_STATE = window.localStorage.getItem(SIDE_NAV_STORAGE_KEY);
      if (!NAV_STATE) {
        return false;
      }

      return (NAV_STATE === 'true');
    }

    function displaySideNav() {
      let leftNav = document.getElementById('left');
      if (!leftNav) {
        return;
      }
      if (isSideNavOpen()) { //update element display
        leftNav.classList.remove('closed');
        leftNav.classList.add('open');
        leftNav.setAttribute('aria-expanded', 'true');
      } else {
        leftNav.classList.remove('open');
        leftNav.classList.add('closed');
        leftNav.setAttribute('aria-expanded', 'false');
      }
    }

    function toggleSideNav() {
      window.localStorage.setItem(SIDE_NAV_STORAGE_KEY, (!isSideNavOpen()).toString());
      displaySideNav();
    }
  })(window, document);

  window.addEventListener('load', function() {
    let profileToggle = document.getElementById('profileToggle');

    profileToggle.addEventListener('click', function() {
      let profilePopup = document.getElementById('profilePopup');

      if (!profilePopup) {
        return;
      }

      if (profilePopup.classList.contains('open')) {
        profilePopup.classList.replace('open', 'closed');
        profileToggle.classList.replace('open', 'closed');
      } else {
        profilePopup.classList.replace('closed', 'open');
        profileToggle.classList.replace('closed', 'open');
      }
    });
  });
