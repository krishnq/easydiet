function onlo() {
    if(screen.availWidth < 500)
    document.getElementsByClassName('collapse')[0].style.height = "0px";
}/*
function toggleSearch() {

    if(document.getElementById('search-bar').style.display == "none") $('#search-bar').fadeIn();
    else  $('#search-bar').fadeOut();
}*/
function navbar() {
    let elem = document.createElement('div');
    elem.className = "[ navbar-bootsnipp animate ][ navbar-fixed-top ]";
    elem.style.color = "white";
    elem.role = "navigation";
    elem.innerHTML = `

          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="[ navbar-header ] col-lg-offset-1">
              <button type="button" class="[ navbar-toggle ]" data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1" style="color: orange;">
                  <span class="[ sr-only ]">Toggle navigation</span>
                  <span class="[ icon-bar ]"></span>
                  <span class="[ icon-bar ]"></span>
                  <span class="[ icon-bar ]"></span>
              </button>
              <div class="[ animbrand ]">
                  <a class="[ navbar-brand ][ animate ]" href="#"><div style="height: 30px;width: 150px;"><img src="http://pickmycart.com/img/pick-my-cart-logo.png" style="height: 100%;" alt="Pick My Cart"/></div></a>
              </div>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="[ collapse pull-right col-lg-8 ] collapse" style="display: block!important;overflow: hidden;" id="bs-example-navbar-collapse-1">
            <ul class="[ nav navbar-nav ] col-lg-9 pull-right">

                  <li id="btn_login"><a href="../index.html" class="[ animate ]">Login</a></li>
                  <li><a href="index.html" class="[ animate ]">Home</a></li>
              </ul>
          </div>
`;
    document.getElementById("naav").appendChild(elem);
}
