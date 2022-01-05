'use strict';
/*! main.js - v0.1.1
 * http://admindesigns.com/
 * Copyright (c) 2015 Admin Designs;*/

/* Core theme functions required for
 * most of the themes vital functionality */

var Core = function(options) {

    // Variables
    var Window = $(window);
    var Body = $('body');
    var Navbar = $('.navbar');
    var Topbar = $('#topbar');

    // Constant Heights
    var windowH = Window.height();
    var bodyH = Body.height();
    var navbarH = 0;
    var topbarH = 0;

    // Variable Heights
    if (Navbar.is(':visible')) {
        navbarH = Navbar.height();
    }
    if (Topbar.is(':visible')) {
        topbarH = Topbar.height();
    }

    // Calculate Height for inner content elements
    var contentHeight = windowH - (navbarH + topbarH);

    // SideMenu Functions
    var runSideMenu = function(options) {

        // If Nano scrollbar exist and element is fixed, init plugin
        if ($('.nano.affix').length) {
            $(".nano.affix").nanoScroller({
                preventPageScrolling: true
            });
        }

        // Sidebar state naming conventions:
        // "sb-l-o" - SideBar Left Open
        // "sb-l-c" - SideBar Left Closed
        // "sb-l-m" - SideBar Left Minified
        // Same naming convention applies to right sidebar

        // SideBar Left Toggle Function
        var sidebarLeftToggle = function() {

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) {
                return;
            }

            // We check to see if the the user has closed the entire
            // leftside menu. If true we reopen it, this will result
            // in the menu resetting itself back to a minified state.
            // A second click will fully expand the menu.
            if (Body.hasClass('sb-l-c') && options.collapse === "sb-l-m") {
                Body.removeClass('sb-l-c');
            }

            // Toggle sidebar state(open/close)
            Body.toggleClass(options.collapse).removeClass('sb-r-o').addClass('sb-r-c');
            triggerResize();
        };

        // SideBar Right Toggle Function
        var sidebarRightToggle = function() {

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) {
                return;
            }

            // toggle sidebar state(open/close)
            if (options.siblingRope === true && !Body.hasClass('mobile-view') && Body.hasClass('sb-r-o')) {
                Body.toggleClass('sb-r-o sb-r-c').toggleClass(options.collapse);
            } else {
                Body.toggleClass('sb-r-o sb-r-c').addClass(options.collapse);
            }
            triggerResize();
        };

        // SideBar Left Toggle Function
        var sidebarTopToggle = function() {

            // Toggle sidebar state(open/close)
            Body.toggleClass('sb-top-collapsed');

        };

        // Sidebar Left Collapse Entire Menu event
        $('.sidebar-toggle-mini').on('click', function(e) {
            e.preventDefault();

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) {
                return;
            }

            // Close Menu
            Body.addClass('sb-l-c');
            triggerResize();

            // After animation has occured we toggle the menu.
            // Upon the menu reopening the classes will be toggled
            // again, effectively restoring the menus state prior
            // to being hidden 
            if (!Body.hasClass('mobile-view')) {
                setTimeout(function() {
                    Body.toggleClass('sb-l-m sb-l-o');
                }, 250);
            }
        });

        // Check window size on load
        // Adds or removes "mobile-view" class based on window size
        var sbOnLoadCheck = function() {

            // If sidebar menu is set to Horizontal we add
            // unique custom mobile css classes
            if ($('body.sb-top').length) {
                // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
                if ($(window).width() < 900) {
                    Body.addClass('sb-top-mobile').removeClass('sb-top-collapsed');
                }
                return;
            }

            // Check Body for classes indicating the state of Left and Right Sidebar.
            // If not found add default sidebar settings(sidebar left open, sidebar right closed).
            if (!$('body.sb-l-o').length && !$('body.sb-l-m').length && !$('body.sb-l-c').length) {
                $('body').addClass(options.sbl);
            }
            if (!$('body.sb-r-o').length && !$('body.sb-r-c').length) {
                $('body').addClass(options.sbr);
            }

            if (Body.hasClass('sb-l-m')) {
                Body.addClass('sb-l-disable-animation');
            } else {
                Body.removeClass('sb-l-disable-animation');
            }

            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 1080) {
                Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
            }

            resizeBody();
        };

        // Check window size on resize
        // Adds or removes "mobile-view" class based on window size
        var sbOnResize = function() {

            // If sidebar menu is set to Horizontal mode we return
            // as the menu operates using pure CSS
            if ($('body.sb-top').length) {
                // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
                if ($(window).width() < 900 && !Body.hasClass('sb-top-mobile')) {
                    Body.addClass('sb-top-mobile');
                } else if ($(window).width() > 900) {
                    Body.removeClass('sb-top-mobile');
                }
                return;
            }

            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 1080 && !Body.hasClass('mobile-view')) {
                Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
            } else if ($(window).width() > 1080) {
                Body.removeClass('mobile-view');
            } else {
                return;
            }

            resizeBody();
        };

        // Function to set the min-height of content
        // to that of the body height. Ensures trays
        // and content bgs span to the bottom of the page
        var resizeBody = function() {

            var sidebarH = $('#sidebar_left').outerHeight();
            var cHeight = (topbarH + navbarH + sidebarH);

            // Body.css('min-height', cHeight);
        };

        // Most CSS menu animations are set to 300ms. After this time
        // we trigger a single global window resize to help catch any 3rd 
        // party plugins which need the event to resize their given elements
        var triggerResize = function() {
            setTimeout(function() {
                $(window).trigger('resize');

                if (Body.hasClass('sb-l-m')) {
                    Body.addClass('sb-l-disable-animation');
                } else {
                    Body.removeClass('sb-l-disable-animation');
                }
            }, 300)
        };

        // Functions Calls
        sbOnLoadCheck();
        $("#toggle_sidemenu_t").on('click', sidebarTopToggle);
        $("#toggle_sidemenu_l").on('click', sidebarLeftToggle);
        $("#toggle_sidemenu_r").on('click', sidebarRightToggle);

        // Attach debounced resize handler
        var rescale = function() {
            sbOnResize();
        }
        var lazyLayout = _.debounce(rescale, 300);
        $(window).resize(lazyLayout);

        //
        // 2. LEFT USER MENU TOGGLE
        //

        // Author Widget selector 
        var authorWidget = $('#sidebar_left .author-widget');

        // Toggle open the user menu
        $('.sidebar-menu-toggle').on('click', function(e) {
            e.preventDefault();

            // Horizontal menu does not support sidebar widgets
            // so we return and prevent the menu from opening
            if ($('body.sb-top').length) {
                return;
            }

            // If an author widget is present we let
            // its sibling menu know it's open
            if (authorWidget.is(':visible')) {
                authorWidget.toggleClass('menu-widget-open');
            }

            // Toggle Class to signal state change
            $('.menu-widget').toggleClass('menu-widget-open').slideToggle('fast');

        });

        // 3. LEFT MENU LINKS TOGGLE
        $('.sidebar-menu li a.accordion-toggle').on('click', function(e) {
            e.preventDefault();

            // If the clicked menu item is minified and is a submenu (has sub-nav parent) we do nothing
            if ($('body').hasClass('sb-l-m') && !$(this).parents('ul.sub-nav').length) {
                return;
            }

            // If the clicked menu item is a dropdown we open its menu
            if (!$(this).parents('ul.sub-nav').length) {

                // If sidebar menu is set to Horizontal mode we return
                // as the menu operates using pure CSS
                if ($(window).width() > 900) {
                    if ($('body.sb-top').length) {
                        return;
                    }
                }

                $('a.accordion-toggle.menu-open').next('ul').slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            }
            // If the clicked menu item is a dropdown inside of a dropdown (sublevel menu)
            // we only close menu items which are not a child of the uppermost top level menu
            else {
                // parse url to jquery
                //var url = $(this).attr('href');
                //loadURL(url + location.search, $('#content-container'));
                window.location.hash = $(this).attr('href');
                //
                var activeMenu = $(this).next('ul.sub-nav');
                var siblingMenu = $(this).parent().siblings('li').children('a.accordion-toggle.menu-open').next('ul.sub-nav');
                activeMenu.slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
                siblingMenu.slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            }

            // Now we expand targeted menu item, add the ".open-menu" class
            // and remove any left over inline jQuery animation styles
            if (!$(this).hasClass('menu-open')) {
                $(this).next('ul').slideToggle('fast', 'swing', function() {
                    $(this).attr('style', '').prev().toggleClass('menu-open');
                });
            }

        });

    }

    // Footer Functions
    var runFooter = function() {

        // Init smoothscroll on page-footer "move-to-top" button if exist
        var pageFooterBtn = $('.footer-return-top');
        if (pageFooterBtn.length) {
            pageFooterBtn.smoothScroll({
                offset: -55
            });
        }

    }

    // jQuery Helper Functions
    var runHelpers = function() {

        // Disable element selection
        $.fn.disableSelection = function() {
            return this
                .attr('unselectable', 'on')
                .css('user-select', 'none')
                .on('selectstart', false);
        };

        // Find element scrollbar visibility
        $.fn.hasScrollBar = function() {
            return this.get(0).scrollHeight > this.height();
        }

        // Test for IE, Add body class if version 9
        function msieversion() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                var ieVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
                if (ieVersion === 9) {
                    $('body').addClass('no-js ie' + ieVersion);
                }
                return ieVersion;
            } else {
                return false;
            }
        }

        msieversion();

        // Clean up helper that removes any leftover
        // animation classes on the primary content container
        // If left it can cause z-index and visibility problems
        setTimeout(function() {
            $('#content').removeClass('animated fadeIn');
        }, 800);

    }

    // Delayed Animations
    var runAnimations = function() {

        // Add a class after load to prevent css animations
        // from bluring pages that have load intensive resources
        if (!$('body.boxed-layout').length) {
            setTimeout(function() {
                $('body').addClass('onload-check');
            }, 100);
        }

        // Delayed Animations
        // data attribute accepts delay(in ms) and animation style
        // if only delay is provided fadeIn will be set as default
        // eg. data-animate='["500","fadeIn"]'
        $('.animated-delay[data-animate]').each(function() {
            var This = $(this)
            var delayTime = This.data('animate');
            var delayAnimation = 'fadeIn';

            // if the data attribute has more than 1 value
            // it's an array, reset defaults 
            if (delayTime.length > 1 && delayTime.length < 3) {
                delayTime = This.data('animate')[0];
                delayAnimation = This.data('animate')[1];
            }

            var delayAnimate = setTimeout(function() {
                This.removeClass('animated-delay').addClass('animated ' + delayAnimation)
                    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                        This.removeClass('animated ' + delayAnimation);
                    });
            }, delayTime);
        });

        // "In-View" Animations
        // data attribute accepts animation style and offset(in %)
        // eg. data-animate='["fadeIn","40%"]'
        $('.animated-waypoint').each(function(i, e) {
            var This = $(this);
            var Animation = This.data('animate');
            var offsetVal = '35%';

            // if the data attribute has more than 1 value
            // it's an array, reset defaults 
            if (Animation.length > 1 && Animation.length < 3) {
                Animation = This.data('animate')[0];
                offsetVal = This.data('animate')[1];
            }

            var waypoint = new Waypoint({
                element: This,
                handler: function(direction) {
                    console.log(offsetVal)
                    if (This.hasClass('animated-waypoint')) {
                        This.removeClass('animated-waypoint').addClass('animated ' + Animation)
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                This.removeClass('animated ' + Animation);
                            });
                    }
                },
                offset: offsetVal
            });
        });

    }

    // Header Functions
    var runHeader = function() {

        // Searchbar - Mobile modifcations
        $('.navbar-search').on('click', function(e) {
            // alert('hi')
            var This = $(this);
            var searchForm = This.find('input');
            var searchRemove = This.find('.search-remove');

            // Don't do anything unless in mobile mode
            if ($('body.mobile-view').length || $('body.sb-top-mobile').length) {

                // Open search bar and add closing icon if one isn't found
                This.addClass('search-open');
                if (!searchRemove.length) {
                    This.append('<div class="search-remove"></div>');
                }

                // Fadein remove btn and focus search input on animation complete
                setTimeout(function() {
                    This.find('.search-remove').fadeIn();
                    searchForm.focus().one('keydown', function() {
                        $(this).val('');
                    });
                }, 250)

                // If remove icon clicked close search bar
                if ($(e.target).attr('class') == 'search-remove') {
                    This.removeClass('search-open').find('.search-remove').remove();
                }

            }

        });

        // Init jQuery Multi-Select for navbar user dropdowns
        if ($("#user-status").length) {
            $('#user-status').multiselect({
                buttonClass: 'btn btn-default btn-sm',
                buttonWidth: 100,
                dropRight: false
            });
        }
        if ($("#user-role").length) {
            $('#user-role').multiselect({
                buttonClass: 'btn btn-default btn-sm',
                buttonWidth: 100,
                dropRight: true
            });
        }

        // Dropdown Multiselect Persist. Prevents a menu dropdown
        // from closing when a child multiselect is clicked
        $('.dropdown-menu').on('click', function(e) {

            e.stopPropagation();
            var Target = $(e.target);
            var TargetGroup = Target.parents('.btn-group');
            var SiblingGroup = Target.parents('.dropdown-menu').find('.btn-group');

            // closes all open multiselect menus. Creates Toggle like functionality
            if (Target.hasClass('multiselect') || Target.parent().hasClass('multiselect')) {
                SiblingGroup.removeClass('open');
                TargetGroup.addClass('open');
            } else {
                SiblingGroup.removeClass('open');
            }

        });

        // Sliding Topbar Metro Menu
        var menu = $('#topbar-dropmenu');
        var items = menu.find('.metro-tile');
        var metroBG = $('.metro-modal');

        // Toggle menu and active class on icon click
        $('.topbar-menu-toggle').on('click', function() {

            // If dropmenu is using alternate style we don't show modal
            if (menu.hasClass('alt')) {
                // Toggle menu and active class on icon click
                menu.slideToggle(230).toggleClass('topbar-menu-open');
                metroBG.fadeIn();
            } else {
                menu.slideToggle(230).toggleClass('topbar-menu-open');
                $(items).addClass('animated animated-short fadeInDown').css('opacity', 1);

                // Create Modal for hover effect
                if (!metroBG.length) {
                    metroBG = $('<div class="metro-modal"></div>').appendTo('body');
                }
                setTimeout(function() {
                    metroBG.fadeIn();
                }, 380);
            }

        });

        // If modal is clicked close menu
        $('body').on('click', '.metro-modal', function() {
            metroBG.fadeOut('fast');
            setTimeout(function() {
                menu.slideToggle(150).toggleClass('topbar-menu-open');
            }, 250);
        });
    }

    // Tray related Functions
    var runTrays = function() {

        // Match height of tray with the height of body
        var trayFormat = $('#content .tray');
        if (trayFormat.length) {

            // Loop each tray and set height to match body
            trayFormat.each(function(i, e) {
                var This = $(e);
                var trayScroll = This.find('.tray-scroller');

                //This.height(contentHeight);
                trayScroll.height(contentHeight);

                if (trayScroll.length) {
                    trayScroll.scroller();
                }
            });
            // Scroll lock all fixed content overflow
            $('#content').scrollLock('on', 'div');

        };

        // Debounced resize handler
        var rescale = function() {
            if ($(window).width() < 1000) {
                Body.addClass('tray-rescale');
            } else {
                Body.removeClass('tray-rescale tray-rescale-left tray-rescale-right');
            }
        }
        var lazyLayout = _.debounce(rescale, 300);

        if (!Body.hasClass('disable-tray-rescale')) {
            // Rescale on window resize
            $(window).resize(lazyLayout);

            // Rescale on load
            rescale();
        }

        // Perform a custom animation if tray-nav has data attribute
        var navAnimate = $('.tray-nav[data-nav-animate]');
        if (navAnimate.length) {
            var Animation = navAnimate.data('nav-animate');

            // Set default "fadeIn" animation if one has not been previously set
            if (Animation == null || Animation == true || Animation == "") {
                Animation = "fadeIn";
            }

            // Loop through each li item and add animation after set timeout
            setTimeout(function() {
                navAnimate.find('li').each(function(i, e) {
                    var Timer = setTimeout(function() {
                        $(e).addClass('animated animated-short ' + Animation);
                    }, 50 * i);
                });
            }, 500);
        }

        // Responsive Tray Javascript Data Helper. If browser window
        // is <575px wide (extreme mobile) we relocate the tray left/right
        // content into the element appointed by the user/data attr
        var dataTray = $('.tray[data-tray-mobile]');
        var dataAppend = dataTray.children();

        function fcRefresh() {
            if ($('body').width() < 585) {
                dataAppend.appendTo($(dataTray.data('tray-mobile')));
            } else {
                dataAppend.appendTo(dataTray);
            }
        }

        ;
        fcRefresh();

        // Attach debounced resize handler
        var fcResize = function() {
            fcRefresh();
        }
        var fcLayout = _.debounce(fcResize, 300);
        $(window).resize(fcLayout);

    }

    // Form related Functions
    var runFormElements = function() {

        // Init Bootstrap tooltips, if present 
        var Tooltips = $("[data-toggle=tooltip]");
        if (Tooltips.length) {
            if (Tooltips.parents('#sidebar_left')) {
                Tooltips.tooltip({
                    container: $('body'),
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                });
            } else {
                Tooltips.tooltip();
            }
        }

        // Init Bootstrap Popovers, if present 
        var Popovers = $("[data-toggle=popover]");
        if (Popovers.length) {
            Popovers.popover();
        }

        // Init Bootstrap persistent tooltips. This prevents a
        // popup from closing if a checkbox it contains is clicked
        $('.dropdown-menu.dropdown-persist').on('click', function(e) {
            e.stopPropagation();
        });

        // Prevents a dropdown menu from closing when
        // a nav-tabs menu it contains is clicked
        $('.dropdown-menu .nav-tabs li a').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).tab('show')
        });

        // Prevents a dropdown menu from closing when
        // a btn-group nav menu it contains is clicked
        $('.dropdown-menu .btn-group-nav a').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Remove active class from btn-group > btns and toggle tab content
            $(this).siblings('a').removeClass('active').end().addClass('active').tab('show');
        });

        // if btn has ".btn-states" class we monitor it for user clicks. On Click we remove
        // the active class from its siblings and give it to the button clicked.
        // This gives the button set a menu like feel or state
        if ($('.btn-states').length) {
            $('.btn-states').on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
            });
        }

        // If a panel element has the ".panel-scroller" class we init
        // custom fixed height content scroller. An optional delay data attr
        // may be set. This is useful when you expect the panels height to 
        // change due to a plugin or other dynamic modification.
        var panelScroller = $('.panel-scroller');
        if (panelScroller.length) {
            panelScroller.each(function(i, e) {
                var This = $(e);
                var Delay = This.data('scroller-delay');
                var Margin = 5;

                // Check if scroller bar margin is required
                if (This.hasClass('scroller-thick')) {
                    Margin = 0;
                }

                // Check if scroller bar is in a dropdown, if so 
                // we initilize scroller after dropdown is visible
                var DropMenuParent = This.parents('.dropdown-menu');
                if (DropMenuParent.length) {
                    DropMenuParent.prev('.dropdown-toggle').on('click', function() {
                        setTimeout(function() {
                            This.scroller();
                            $('.navbar').scrollLock('on', 'div');
                        }, 50);
                    });
                    return;
                }

                if (Delay) {
                    var Timer = setTimeout(function() {
                        This.scroller({
                            trackMargin: Margin,
                        });
                        $('#content').scrollLock('on', 'div');
                    }, Delay);
                } else {
                    This.scroller({
                        trackMargin: Margin,
                    });
                    $('#content').scrollLock('on', 'div');
                }

            });
        }

        // Init smoothscroll on elements with set data attr
        // data value determines smoothscroll offset
        var SmoothScroll = $('[data-smoothscroll]');
        if (SmoothScroll.length) {
            SmoothScroll.each(function(i, e) {
                var This = $(e);
                var Offset = This.data('smoothscroll');
                var Links = This.find('a');

                // Init Smoothscroll with data stored offset
                Links.smoothScroll({
                    offset: Offset
                });

            });
        }

    }

    // Run UI Elements
    var runWeUIElements = function() {
        $('.weui-datebegin').datepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            language: "zh-cn",
            dateFormat: 'yy-mm-dd',
            onClose: function(text, inst) {
                this.focus();
                this.blur();
                //var start = $("#start_time");
                var end = $(this).parents('.weui-form').find('.weui-dateend');
                var endDate = end.datepicker('getDate');
                if (endDate < text) {
                    end.datepicker('setDate', text - 3600 * 1000 * 24);
                }
                end.datepicker("option", "minDate", text);
            }
        });
        $('.weui-dateend').datepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            language: "zh-cn",
            dateFormat: 'yy-mm-dd',
            onClose: function(text, inst) {
                this.focus();
                this.blur();
                var start = $(this).parents('.weui-form').find('.weui-datebegin');
                var startDate = start.datepicker("getDate");
                if (text < startDate) {
                    start.datepicker('setDate', startDate + 3600 * 1000 * 24);
                }
                start.datepicker("option", "maxDate", text);
            }
        });
        // Initialize datepicker, make sure end date always later than begin date
        $('.weui-dateTimebegin').datetimepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            language: "zh-cn",
            timeFormat: 'HH:mm:ss', //格式化时间
            stepHour: 1, //设置步长
            stepMinute: 10,
            stepSecond: 10,
            onClose: function(text, inst) {
                this.focus();
                this.blur();
                //var start = $("#start_time");
                var end = $(this).parents('.weui-form').find('.weui-dateend');
                var endDate = end.datetimepicker('getDate');
                if (endDate < text) {
                    end.datetimepicker('setDate', text - 3600 * 1000 * 24);
                }
                end.datetimepicker("option", "minDate", text);
            }
        });
        // Initialize datepicker, make sure end date always later than begin date
        $('.weui-dateTimeend').datetimepicker({
            changeMonth: true,
            changeYear: true,
            showMonthAfterYear: true,
            showSecond: true, //显示秒
            timeFormat: 'HH:mm:ss', //格式化时间
            stepHour: 1, //设置步长
            stepMinute: 10,
            stepSecond: 10,
            language: "zh-cn",
            dateFormat: 'yy-mm-dd',
            onClose: function(text, inst) {
                this.focus();
                this.blur();
                var start = $(this).parents('.weui-form').find('.weui-datebegin');
                var startDate = start.datetimepicker("getDate");
                if (text < startDate) {
                    start.datetimepicker('setDate', startDate + 3600 * 1000 * 24);
                }
                start.datetimepicker("option", "maxDate", text);
            }
        });
        //
    }

    var runWeUIValidate = function(subfun) {
        $.validator.methods.fullNameChin = function(value, element, param) {
            return this.optional(element) || (/^[\u4e00-\u9faf]+$/.test(value));
        }
        $.validator.methods.fullNameEn = function(value, element, param) {
                return this.optional(element) || (/^[a-zA-Z\d]+$/.test(value));
            }
            //自定义语言验证
        var rules = {};
        $(".weui-valide .field>:first-child").each(function(i, ele) {
            //var initialized = ui.newPanel.attr('initialized');
            var weuilangue = $(ele).attr("weuilangue")
            var weuiremote = $(ele).hasClass("remote");
            if (weuilangue) {
                var obj = {
                    fullNameEn: Boolean($(ele).attr("weuilangue"))
                }
                rules[$(ele).attr("weuifieldclass")] = obj;
            }
            //用户名是否重复验证
            if (weuiremote) {
                var obj = {
                    remote: myapp.apiHost2 + "sysmng.initTemplate.do?subSys=survey&tplID=110"
                }
                rules[$(ele).attr("weuifieldclass")] = obj;

            }
        });
        var messages = {};
        $(".weui-valide .field>:first-child").each(function(i, ele) {
            var weuilangue = $(ele).attr("weuilangue")
            var weuiremote = $(ele).hasClass("remote");
            if (weuilangue) {
                var obj = {
                    fullNameEn: $(ele).attr("weuimessage")
                };
                messages[$(ele).attr("weuifieldclass")] = obj;
            }
            if (weuiremote) {
                var obj = {
                    remote: $(ele).attr("weuiremotemessage")
                };
                messages[$(ele).attr("weuifieldclass")] = obj;
            }
        });
        $('.weui-valide').validate({
            /* @validation states + elements
             ------------------------------------------- */
            errorClass: "state-error",
            validClass: "state-success",
            errorElement: "em",
            onsubmit: true,
            submitHandler: subfun,
            rules: rules,
            messages: messages,

            /* @validation highlighting + error placement
             ---------------------------------------------------- */
            highlight: function(element, errorClass, validClass) {
                $(element).closest('.field').addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).closest('.field').removeClass(errorClass).addClass(validClass);
            },
            errorPlacement: function(error, element) {
                if (element.is(":radio") || element.is(":checkbox")) {
                    element.closest('.option-group').after(error);
                } else {
                    error.insertAfter(element.parent());
                }
            }
        })
    }

    var loadURL = function(url, container) {
        //console.log(container)
        //window.location.hash = url+"?guid="+new Date().getTime();
        //window.location.hash = url;
        //
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'html',
            cache: true, // (warning: this will cause a timestamp and will call the request twice)
            beforeSend: function() {
                // cog placed
                container.html('<h1><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                //
                if (container[0] == $("#content-container")[0]) {
                    // scroll up
                    $("html").animate({
                        scrollTop: 0
                    }, "fast");
                }
            },
            success: function(data) {
                container.css({
                    opacity: '0.0'
                }).html(data).delay(50).animate({
                    opacity: '1.0'
                }, 300);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                container.html('<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>');
            },
            async: false
        });
    }

    /*
     */
    var initDataTable = function(datatable, columns, option) {
        var sdom = (option && option.tabletools == false) ?
            '<"dt-panelmenu clearfix hidden"lfr>t<"dt-panelfooter clearfix hidden"ip>' :
            '<"dt-panelmenu clearfix"lfrT>t<"dt-panelfooter clearfix"ip>';
        var params = {
            "sDom": sdom,
            "autoWidth": false,
            "bDestroy": true,
            "paging": option.paging === undefined ? true : option.paging,
            "ordering": option.ordering === undefined ? false : option.ordering,
            "info": option.info === undefined ? true : option.info,
            "searching": option.searching === undefined ? false : option.searching,
            "bProcessing": option.processing === undefined ? false : option.processing,
            "bServerSide": option.serverSide === undefined ? false : option.serverSide,
            "sAjaxSource": option.ajaxSource === undefined ? null : option.ajaxSource,
            "sAjaxDataProp": option.ajaxDataProp === undefined ? null : option.ajaxDataProp,
            "sServerMethod": option.serverMethod === undefined ? null : option.serverMethod,
            "stateSave": option.stateSave === undefined ? null : option.stateSave,
            "oTableTools": {
                // ["csv", "xls", "pdf", "copy", "print", "sall", "asel"],
                "aButtons": option.aButtons,
                "sSwfPath": "assets/plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
            },
            "oLanguage": {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(共 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索：",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页",
                }
            },
            "scrollX": true,
            "aoColumnDefs": columns,
            "aaSorting": [], //[1, 'asc']
            "aLengthMenu": [
                [10, 20, 30, 50, -1],
                [10, 20, 30, 50, "All"]
            ],
            "ajax": option.ajax,
            "fnPreDrawCallback": option.preDrawCallback,
            "fnRowCallback": option.rowCallback,
            "fnDrawCallback": option.drawCallback,
            "fnServerParams": option.serverParams,
            "stateSaveCallback": option.stateSaveCallback,
            "fnServerData": function serverData(url, aoData, fnCallback) {
                option.basicDataCallback(aoData);
                $.ajax({
                    url: url,
                    data: aoData,
                    type: 'post',
                    dataType: 'json',
                    async: false,
                    beforeSend: function(request) {
                        request.setRequestHeader("ticket", myapp.ticket);
                        showSpinner();
                    },
                    success: function(result) {
                        //theCount = result.count;
                        option.setCountCallback(result.count);
                        fnCallback(result);
                        hideSpinner();
                    },
                    error: function(msg) {
                        hideSpinner();
                    }
                });
            }
        };

        //
        datatable.dataTable(params);
        //
        datatable.find("tbody").unbind("click").click(function(event) {
            var theLink = $(event.target);
            if (theLink.hasClass("action-update")) {
                if (option.onUpdate)
                    option.onUpdate(theLink.parents("tr").data(), theLink.parents("tr"));
            } else if (theLink.hasClass("action-delete")) { // Delete
                if (option.onDelete)
                    option.onDelete(theLink.parents("tr").data(), theLink.parents("tr"));
                else
                    datatable.fnDeleteRow(theLink.parents("tr"));
            } else if (theLink.hasClass("action-activate")) { // Activate
                if (option.onActivate)
                    option.onActivate(theLink.parents("tr").data(), theLink.parents("tr"));
            }
            if (theLink.hasClass("action-deactivate")) { // Deactivate
                if (option.onDeactivate)
                    option.onDeactivate(theLink.parents("tr").data(), theLink.parents("tr"));
            }
        });
        //
        datatable.parents(".dataTables_wrapper").find(".DTTT_button_exp").unbind("click").click(function(event) {
            if (option.onExport)
                option.onExport();
        });
        //
        datatable.parents(".dataTables_wrapper").find(".DTTT_button_add").unbind("click").click(function(event) {
            if (option.onCreate)
                option.onCreate();
        });
    }

    //
    var fillDataTable = function(datatable, data) {
        var dt = datatable.dataTable();
        if ($.fn.DataTable.fnIsDataTable(datatable[0]))
            dt.fnClearTable();
        //else
        //    datatable.dataTable(tableParam);
        for (var i in data) {
            var ai = dt.fnAddData(data[i], false);
            var tr = dt.fnSettings().aoData[ai].nTr;
            $(tr).data(data[i]);
        }
        dt.fnDraw();
    }

    //
    var insertRow = function(datatable, data) {
        var dt = datatable.dataTable();
        var ai = dt.fnAddData(data);
        var tr = dt.fnSettings().aoData[ai].nTr;
        $(tr).data(data);
    }

    //
    var updateRow = function(datatable, data, tr) {
        datatable.dataTable().fnUpdate(data, tr[0]);
        $(tr).data(data);
    }

    //
    var deleteRow = function(datatable, tr) {
        datatable.fnDeleteRow(tr);
    }

    //
    var fillSelect = function(select, data) {
        select.empty().append("<option value=''>请选择</option>");
        for (var i in data)
            select.append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
        //if (blank)
        //    select.append("<option value=''></option>");
        if (data.length > 0)
            select.val(data[data.length]);
    }

    //
    var fillSelect2 = function(select, data) {
        select.empty().append("<option value=''>请选择</option>");
        for (var i in data)
            select.append("<option value='" + data[i].id + "'>" + data[i].alias + "卷" + ">" + data[i].name + "</option>");
        //if (blank)
        //    select.append("<option value=''></option>");
        if (data.length > 0)
            select.val(data[data.length]);
    }

    //
    var initSelect2 = function(select, data) {
        select.empty().append("<option value='' disabled selected>请选择</option>");
        for (var i in data)
            select.append("<option value='" + data[i].ID + "'>" + data[i].Name + "</option>");
        if (data.length > 0)
            select.val(data[data.length - 1]);
        select.select2();
    };
    //
    var pageCache = {};

    // Export interfaces
    return {
        pageCache: {},
        getPageCache: function(pageUrl) {
            return this.pageCache[pageUrl];
        },
        putPageCache: function(pageUrl, pageState) {
            this.pageCache[pageUrl] = pageState;
        },
        init: function(options) {
            // Set Default Options
            var defaults = {
                sbl: "sb-l-o", // sidebar left open onload
                sbr: "sb-r-c", // sidebar right closed onload
                sbState: "save", //Enable localstorage for sidebar states

                collapse: "sb-l-m", // sidebar left collapse style
                siblingRope: true
                    // Setting this true will reopen the left sidebar
                    // when the right sidebar is closed
            };

debugger;
            // Extend Default Options.
            var options = $.extend({}, defaults, options);

            // Call Core Functions
            runHelpers();
            runAnimations();
            runHeader();
            runSideMenu(options);
            runFooter();
            runTrays();
            runFormElements();
        },
        runWeUIElements: runWeUIElements,
        runWeUIValidate: runWeUIValidate,
        loadURL: loadURL,
        initDataTable: initDataTable,
        fillDataTable: fillDataTable,
        insertRow: insertRow,
        updateRow: updateRow,
        deleteRow: deleteRow,
        fillSelect: fillSelect,
        fillSelect2: fillSelect2,
        initSelect2: initSelect2,
    }
}();

var stack = [];

var showSpinner = function() {
    if (stack.length == 0)
        $('#ajax-mask').show();
    stack.push('x');
}

var hideSpinner = function() {
    stack.pop();
    if (stack.length == 0)
        $('#ajax-mask').hide();
}

var getCookie = function(key) {
    if (window.document.cookie.length > 0) {
        var begin = document.cookie.indexOf(key + "=");
        if (begin != -1) {
            begin = begin + key.length + 1;
            var end = document.cookie.indexOf(';', begin);
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return "";
}

var setCookie = function(key, value, expires) {
    var index = -1;
    if (window.document.cookie != document.cookie)
        index = window.document.cookie.indexOf(key);
    if (index == -1) {
        var _date = new Date();
        _date.setMinutes(_date.getMinutes() + expires);
        window.document.cookie = key + "=" + value + ";expires=" + _date.toGMTString();
    }
}

// Message modal
var MessageModal = function(view, message, tr, accpet) {
    // Cache
    var theView = $(view);
    var theTr = tr;
    var theAccept = accpet;
    // Initialize
    var init = function() {
            theView.find('.modal-message').text(message);
            theView.find(".accept").unbind("click").click(function() {
                if (theAccept) {
                    theAccept(theTr);
                    theView.modal("hide");
                } else {
                    theView.modal("hide");
                }
            });
        }
        // Show info
    var showInfo = function() {
            theView.find(".modal-title>i").removeClass().addClass("fa fa-info");
            theView.modal("show");
        }
        // Show warning
    var showWarning = function() {
            theView.find(".modal-title>i").removeClass().addClass("fa fa-warning");
            theView.modal("show");
        }
        // Show error
    var showError = function() {
            theView.find(".modal-title>i").removeClass().addClass("fa fa-close");
            theView.modal("show");
        }
        // Show confirm
    var showConfirm = function() {
            theView.find(".modal-title>i").removeClass().addClass("fa fa-question");
            theView.modal("show");
        }
        // Hide modal
    var hideModal = function() {
            theView.modal("hide");
        }
        // Initialize 
    init();
    // Export
    return {
        info: showInfo,
        warn: showWarning,
        error: showError,
        confirm: showConfirm,
        hide: hideModal,
    };
};

//
var Modal = function(view, model, tr, accpet, option) {
    // Cache
    var theView = $(view);
    var theModel = model;
    var theTr = tr;
    var theAccept = accpet;
    var theOption = option;

    // Initialize
    var init = function() {
            //
            initModal();
            //
            wireUpEvent();
        }
        // Wireup event handlers
    var wireUpEvent = function() {
            // Accept
            theView.find(".accept").unbind("click").bind("click", function() {
                submitForm();
            });
            // Changed
            //theView.find(".treeview input[type=checkbox]").change(function () { });
        }
        // Initialize modal
    var initModal = function() {
            if (theModel) {
                // Text, Date, DateTime
                theView.find('input[type="text"]').each(function(i, input) {
                    $(input).val(theModel[$(input).attr('weuifieldname')]);
                });
                theView.find('textarea[type="text"]').each(function(i, textarea) {
                    $(textarea).html(theModel[$(textarea).attr('weuifieldname')]);
                });
                // Select
                theView.find('select').each(function(i, select) {
                    $(select).val(theModel[$(select).attr('weuifieldcode')]);
                });
                //
                theView.find('.accept .caption').text("更新");
                theView.find(".modal-title .caption").text("编辑" + option.Entity);
            } else {
                theView.find('input[type="text"]').val('');
                theView.find('textarea[type="text"]').html('');
                // theView.find('select').val('');
                theView.find('.accept .caption').text("添加");
                theView.find(".modal-title .caption").text("添加" + option.Entity);
            }
        }
        // Update object
    var updateObject = function() {
            if (theModel) {
                // Text, Date, DateTime
                theView.find('input[type="text"]').each(function(i, input) {
                    theModel[$(input).attr('weuifieldname')] = $(input).val();
                });
                // Select
                theView.find('select').each(function(i, input) {
                    theModel[$(input).attr('weuifieldcode')] = $(input).val();
                });
                // Textarea
                theView.find('textarea').each(function(i, input) {
                    theModel[$(input).attr('weuifieldname')] = $(input).val();
                });
                //theModel.remark = theView.find(".col_remark").val();

            } else {
                theModel = {};
                //theView.find('input[type="text"]').each(function (i, input) {
                //    theModel[$(input).attr('weuifieldname')] = $(input).val();
                //});
                //theView.find('select').each(function (i, input) {
                //    theModel[$(input).attr('weuifieldname')] = $(input).val();
                //});
                theView.find(".weui-form .field>:first-child").each(function(i, input) {
                    if (input.tagName == "INPUT") {
                        theModel[$(input).attr('weuifieldname')] = $(input).val();
                    } else if (input.tagName == "SELECT") {
                        theModel[$(input).attr('weuifieldname')] = $(input).val();
                    } else if (input.tagName == "TEXTAREA") {
                        theModel[$(input).attr('weuifieldname')] = $(input).val();
                    }
                });
            }
            //
            return theModel;
        }
        // Submit form
    var submitForm = function() {
            $.validator.setDefaults({
                submitHandler: function(form, event) {
                    var model = updateObject();
                    if (theAccept) {
                        theAccept(model, theTr);
                        theView.modal("hide");
                    } else {
                        theView.modal("hide");
                    }
                }
            });
            //
            var rules = {};
            var messages = {};
            //
            theView.find(".weui-form").validate({
                errorClass: "state-error",
                validClass: "state-success",
                errorElement: "em",
                onsubmit: true,
                onkeyup: false,
                onfocusout: function(ele) {
                    $(ele).valid();
                },
                highlight: function(element, errorClass, validClass) {
                    $(element).closest('.field').addClass(errorClass).removeClass(validClass);
                },
                unhighlight: function(element, errorClass, validClass) {
                    $(element).closest('.field').removeClass(errorClass).addClass(validClass);
                },
                errorPlacement: function(error, element) {
                    if (element.is(":radio") || element.is(":checkbox")) {
                        element.closest('.option-group').after(error);
                    } else {
                        error.insertAfter(element.parent());
                    }
                }
            });
        }
        // Show modal
    var showModal = function() {
            theView.modal("show");
        }
        // Hide modal
    var hideModal = function() {
            theView.modal("hide");
        }
        // Initialize
    init();
    // Export
    return {
        show: showModal,
        hide: hideModal,
    };
}

//
var Dialog = function(view, accpet, validator) {
    // Cache
    var theView = $(view);
    var theAccept = accpet;
    var theValidator = validator;

    // Initialize
    var init = function() {
            wireUpEvent();
        }
        // Wireup event handlers
    var wireUpEvent = function() {
            // Accept
            theView.find(".accept").unbind("click").bind("click", function() {
                var result = true;
                if (theValidator)
                    result = theValidator();
                if (result) {
                    if (theAccept)
                        theAccept();
                    hideModal();
                }
            });
        }
        // Show modal
    var showModal = function() {
            theView.modal("show");
        }
        // Hide modal
    var hideModal = function() {
            theView.modal("hide");
        }
        // Initialize
    init();
    // Export
    return {
        show: showModal,
        hide: hideModal,
    };
}

//
function getParameterByName(name, url) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

//后台API所需数据
var linkApiData = function(repID) {
    var data = {
        subSys: 'wesurvey',
        repID: repID,
        isQuery: '1',
        dispType: '12',
        perRows: '2000'

    }
    return data;
};

// Datatable aoData
function basicData(aoData, repVal, theCount, view) {
    var dispStart = 0,
        dispLength = 0;
    for (var i = 0; i < aoData.length; ++i) {
        if (aoData[i].name == 'iDisplayStart') {
            dispStart = aoData[i].value;
        } else if (aoData[i].name == 'iDisplayLength') {
            dispLength = aoData[i].value;
        }
    }
    aoData.push({
        name: 'toPageNo',
        value: theCount > 0 ? (dispStart / dispLength + 1) : 1
    });
    aoData.push({
        name: 'perRows',
        value: dispLength
    });
    aoData.push({
        name: 'subSys',
        value: 'wesurvey'
    });
    aoData.push({
        name: 'repID',
        value: repVal
    });
    aoData.push({
        name: 'isQuery',
        value: '1'
    });
    aoData.push({
        name: 'dispType',
        value: '12'
    });
    var searchData = searchCondition(view);
    for (var key in searchData) {
        var objs = {};
        objs.name = key;
        objs.value = searchData[key];
        aoData.push(objs);
    };
    return aoData;
}

//查询条件
function searchCondition(UI) {
    var selCndIDs = [];
    var data = {};
    $(UI + " .admin-form .form-control").each(function() {
        var cnd = $(this);
        if (cnd.val() != '') {
            selCndIDs.push(cnd.attr('data-id').split("_")[1]);
            data[cnd.attr('data-id')] = cnd.val();
        }
    })
    if (selCndIDs.length > 0) {
        data.selCndIDs = selCndIDs.join("|");
    }
    return data;
}

//
function AjaxGet2(url, dataType, type, data, onsuccess, onerror) {
    $.ajax({
        url: url,
        dataType: dataType,
        type: type,
        data: data,
        beforeSend: function(request) {
            request.setRequestHeader("ticket", myapp.ticket);
            showSpinner();
        },
        error: function(xhr, status, error) {
            if (onerror)
                onerror(error);
            hideSpinner();
        },
        success: function(data, status, xhr) {
            if (onsuccess) {
                if (data && data.errors && data.errors.length > 0 && data.errors[0].code == 0) {
                    location.href = "login.html";
                } else {
                    onsuccess(data);
                }
            };
            hideSpinner();
        }
    });
}

//
function AjaxGet(url, onsuccess, onerror) {
    $.ajax({
        url: url,
        dataType: "json",
        contentType: 'application/json',
        type: "get",
        beforeSend: function(request) {
            request.setRequestHeader("ticket", myapp.ticket);
            showSpinner();
        },
        error: function(xhr, status, error) {
            if (onerror)
                onerror(error);
            hideSpinner();
        },
        success: function(data, status, xhr) {
            if (onsuccess) {
                if (data.errors.length > 0 && data.errors[0].code == 0) {
                    location.href = "login.html";
                } else {
                    onsuccess(data);
                }
            };
            hideSpinner();
        }
    });
}

//
function AjaxPut(url, data, tag, onsuccess, onerror) {
    $.ajax({
        url: apiHost + url,
        dataType: "text",
        contentType: 'application/json',
        type: "put",
        data: JSON.stringify(data),
        beforeSend: function(request) {
            request.setRequestHeader("ticket", myapp.ticket);
            showSpinner();
        },
        error: function(xhr, status, error) {
            if (onerror)
                onerror(error);
            hideSpinner();
        },
        success: function(data, status, xhr) {
            if (onsuccess) onsuccess(data, tag);
            hideSpinner();
        }
    });
}

//跨域请求
function AjaxPost(url, data, tag, onsuccess, onerror) {
    $.ajax({
        url: url,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        type: "post",
        data: JSON.stringify(data),
        beforeSend: function(request) {
            request.setRequestHeader("ticket", myapp.ticket);
            showSpinner();
        },
        error: function(xhr, status, error) {
            if (onerror)
                onerror(error);
            hideSpinner();
        },
        success: function(data, status, xhr) {
            if (onsuccess) {
                if (data.errors.length > 0 && data.errors[0].code == 0) {
                    location.href = "login.html";
                } else {
                    onsuccess(data);
                }
            };
            hideSpinner();
        }
    });
}

//
function AjaxPost2(url, data, tag, onsuccess, onerror) {
    $.ajax({
        url: url,
        dataType: "json",
        type: "post",
        data: data,
        beforeSend: function(request) {
            request.setRequestHeader("ticket", myapp.ticket);
            showSpinner();
        },
        error: function(xhr, status, error) {
            if (onerror)
                onerror(error);
            hideSpinner();
        },
        success: function(data, status, xhr) {
            if (onsuccess) {
                if (data && data.errors && data.errors.length > 0 && data.errors[0].code == 0) {
                    location.href = "login.html";
                } else {
                    onsuccess(data);
                }
            };
            hideSpinner();
        }
    });
}

function AjaxPost3(url, data, tag, onsuccess, onerror) {
	var paramaData = {};
	paramaData['data'] = JSON.stringify(data);
    $.ajax({
        url: url,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        type: "post",
        data: paramaData,
        beforeSend: function(request) {
            request.setRequestHeader("ticket", myapp.ticket);
            showSpinner();
        },
        error: function(xhr, status, error) {
            if (onerror)
                onerror(error);
            hideSpinner();
        },
        success: function(data, status, xhr) {
            if (onsuccess) {
                if (data.errors.length > 0 && data.errors[0].code == 0) {
                    location.href = "login.html";
                } else {
                    onsuccess(data);
                }
            };
            hideSpinner();
        }
    });
}

// sync
function syncGet(url, onsuccess, onerror) {
    $.ajax({
        url: url,
        dataType: "json",
        contentType: 'application/json',
        type: "get",
        ansync: false,
        beforeSend: function(request) {
            request.setRequestHeader("ticket", myapp.ticket);
        },
        error: function(xhr, status, error) {
            if (onerror) onerror(error);
        },
        success: function(data, status, xhr) {
            if (onsuccess) {
                if (data.errors.length > 0 && data.errors[0].code == 0) {
                    location.href = "login.html";
                } else {
                    onsuccess(data);
                }
            };
        }
    });
}

//
function syncPut(url, data, tag, onsuccess, onerror) {
    $.ajax({
        url: url,
        dataType: "text",
        contentType: 'application/json',
        type: "put",
        data: JSON.stringify(data),
        ansync: false,
        beforeSend: function(request) {
            request.setRequestHeader("ticket", myapp.ticket);
        },
        error: function(xhr, status, error) {
            if (onerror) onerror(error);
        },
        success: function(data, status, xhr) {
            if (onsuccess) {
                if (data.errors.length > 0 && data.errors[0].code == 0) {
                    location.href = "login.html";
                } else {
                    onsuccess(data);
                }
            };
        }
    });
}

//
function syncPost(url, data, tag, onsuccess, onerror) {
    $.ajax({
        url: url,
        dataType: "json",
        contentType: 'application/json',
        type: "post",
        data: JSON.stringify(data),
        ansync: false,
        beforeSend: function(request) {
            request.setRequestHeader("ticket", myapp.ticket);
        },
        error: function(xhr, status, error) {
            if (onerror) onerror(error);
        },
        success: function(data, status, xhr) {
            if (onsuccess) {
                if (data.errors && data.errors.length > 0 && data.errors[0].code == 0) {
                    location.href = "login.html";
                } else {
                    onsuccess(data);
                }
            };
        }
    });
}

//城市联动
function city(provinceui, cityui) {
    //城市列表
    AjaxGet2(myapp.apiHost2 + 'sysmng.initTemplate.do?subSys=wesurvey&tplID=121', 'json', 'post', null, function(data) {
        var province = '';
        var address = data.objs;
        for (var i = 0; i < address.length; i++) {
            province += '<option value="' + address[i].code + '">' + address[i].name + '</option>'
        }
        $(provinceui).append(province);
        $(provinceui).change(function() {
            var i = $(this).find("option:selected").index(),
                j = 0,
                city = '<option value="">请选择</option>';
            if (i == 0) {
                $(cityui).html('<option value="">请选择</option>')
            } else {
                for (; j < address[i - 1].children.length; j++) {
                    city += '<option value="' + address[i - 1].children[j].code + '">' + address[i - 1].children[j].name + '</option>';
                }
                $(cityui).html(city);
            }
        });
    }, function(error) {
        console.log(error)
    });
}

//品牌车型联动
function car(brandui, carui) {
    //车辆品牌
    AjaxGet2(myapp.apiHost2 + 'sysmng.initTemplate.do?subSys=wesurvey&tplID=114', 'json', 'post', null, function(data) {
        var brand = '';
        var cardata = data.children;
        for (var i = 0; i < cardata.length; i++) {
            brand += '<option value="' + cardata[i].id + '">' + cardata[i].text + '</option>'
        }
        $(brandui).append(brand);
        $(brandui).change(function() {
            var i = $(this).find("option:selected").index(),
                j = 0,
                motorcycle = '<option value="">请选择</option>';
            if (i == 0) {
                $(carui).html('<option value="">请选择</option>')
            } else {
                for (; j < cardata[i - 1].children.length; j++) {
                    motorcycle += '<option value="' + (cardata[i - 1].children[j].id).split("-")[1] + '">' + cardata[i - 1].children[j].text + '</option>';
                }
                $(carui).html(motorcycle);
            }
        });
    }, function(error) {
        console.log(error);
    });
}

//省份/城市联动
function initLocationLink(context, provinceui, cityui, locations) {
    var province = '<option value="">请选择</option>';
    for (var i = 0; i < locations.length; i++) {
        province += '<option value="' + locations[i].code + '">' + locations[i].name + '</option>'
    }
    $(provinceui, context).html(province);
    $(provinceui, context).change(function() {
        var i = $(this).find("option:selected").index(),
            city = '<option value="">请选择</option>';
        if (i > 0) {
            for (var j = 0; j < locations[i - 1].children.length; j++) {
                city += '<option value="' + locations[i - 1].children[j].code + '">' + locations[i - 1].children[j].name + '</option>';
            }
        }
        $(cityui, context).html(city);
    });
}

//品牌/车型联动
function initBrochureLink(context, brandui, modelui, brochures) {
    var brand = '<option value="">请选择</option>';
    for (var i = 0; i < brochures.length; i++) {
        brand += '<option value="' + brochures[i].id + '">' + brochures[i].text + '</option>'
    }
    $(brandui, context).empty().append(brand);
    $(brandui, context).change(function() {
        var i = $(this).find("option:selected").index(),
            model = '<option value="">请选择</option>';
        if (i > 0) {
            for (var j = 0; j < brochures[i - 1].children.length; j++) {
                model += '<option value="' + brochures[i - 1].children[j].id.split('-')[1] + '">' + brochures[i - 1].children[j].text + '</option>';
            }
        }
        $(modelui, context).empty().html(model);
    });
}

var initSelect = function(select, oid, text, data) {
    select.empty().append("<option value=''>请选择</option>");
    for (var i = 0; i < data.length; ++i)
        select.append("<option value='" + data[i][oid] + "'>" + data[i][text] + "</option>");
    if (data.length > 0)
        select.val(data[0][oid]);
}

function getIndustries(onSuccess) {
    AjaxGet2(myapp.apiHost2 + 'sysmng.initTemplate.do?subSys=wesurvey&tplID=145', 'json', 'post', null, function(data) {
        if (onSuccess) onSuccess(data.objs);
    }, function(error) {
        console.log(error);
    });
}

function getProfessions(onSuccess) {
    AjaxGet2(myapp.apiHost2 + 'sysmng.initTemplate.do?subSys=wesurvey&tplID=146', 'json', 'post', null, function(data) {
        if (onSuccess) onSuccess(data.objs);
    }, function(error) {
        console.log(error);
    });
}

function getLocations(onSuccess) {
    AjaxGet2(myapp.apiHost2 + 'sysmng.initTemplate.do?subSys=wesurvey&tplID=121', 'json', 'post', null, function(data) {
        if (onSuccess) onSuccess(data.objs);
    }, function(error) {
        console.log(error)
    });
}

function getBrochures(onSuccess) {
    AjaxGet2(myapp.apiHost2 + 'sysmng.initTemplate.do?subSys=wesurvey&tplID=114', 'json', 'post', null, function(data) {
        if (onSuccess) onSuccess(data.children);
    }, function(error) {
        console.log(error)
    });
}

function getMember(memberid, onSuccess) {
    var criteria = {
        subSys: 'wesurvey',
        repID: '39',
        isQuery: '1',
        dispType: '12',
        perRows: '2000',
        selCndIDs: 'id',
        cnd_id: memberid,
    };
    AjaxGet2(myapp.apiHost2 + 'sysmng.jsonreport.do?', 'json', 'get', criteria, function(data) {
        if (onSuccess) onSuccess(data.objs.length > 0 ? data.objs[0] : null);
    }, function(error) {
        alert(error);
    });
}

function createMember(member, onSuccess) {
    if (onSuccess) onSuccess(member);
}

function updateMember(member, onSuccess) {
    AjaxGet2(myapp.apiHost2 + "wesurvey.member.do?op=update", "json", "post", member, function(data) {
        if (onSuccess) onSuccess(data.objs[0]);
    }, function(error) {
        alert(error);
    });
}

function getVehicles(memberid, onSuccess) {
    var criteria = {
        subSys: 'wesurvey',
        repID: '104',
        isQuery: '1',
        dispType: '12',
        perRows: '2000',
        selCndIDs: 'memberID',
        cnd_memberID: memberid,
    };
    AjaxGet2(myapp.apiHost2 + 'sysmng.jsonreport.do?', 'json', 'post', criteria, function(data) {
        if (onSuccess) onSuccess(data.objs);
    }, function(error) {
        alert(error);
    });
}

function createVehicle(vehicle, onSuccess) {
    AjaxGet2(myapp.apiHost2 + "wesurvey.vehicle.do?op=create", "json", "post", vehicle, function(data) {
        if (onSuccess) onSuccess(data.objs[0]);
    }, function(error) {
        alert(error);
    });
}

function updateVehicle(vehicle, onSuccess) {
    AjaxGet2(myapp.apiHost2 + "wesurvey.vehicle.do?op=update", "json", "post", vehicle, function(data) {
        if (onSuccess) onSuccess();
    }, function(error) {
        alert(error);
    });
}


// Global Library of Theme colors for Javascript plug and play use  
var bgPrimary = '#4a89dc',
    bgPrimaryL = '#5d9cec',
    bgPrimaryLr = '#83aee7',
    bgPrimaryD = '#2e76d6',
    bgPrimaryDr = '#2567bd',
    bgSuccess = '#70ca63',
    bgSuccessL = '#87d37c',
    bgSuccessLr = '#9edc95',
    bgSuccessD = '#58c249',
    bgSuccessDr = '#49ae3b',
    bgInfo = '#3bafda',
    bgInfoL = '#4fc1e9',
    bgInfoLr = '#74c6e5',
    bgInfoD = '#27a0cc',
    bgInfoDr = '#2189b0',
    bgWarning = '#f6bb42',
    bgWarningL = '#ffce54',
    bgWarningLr = '#f9d283',
    bgWarningD = '#f4af22',
    bgWarningDr = '#d9950a',
    bgDanger = '#e9573f',
    bgDangerL = '#fc6e51',
    bgDangerLr = '#f08c7c',
    bgDangerD = '#e63c21',
    bgDangerDr = '#cd3117',
    bgAlert = '#967adc',
    bgAlertL = '#ac92ec',
    bgAlertLr = '#c0b0ea',
    bgAlertD = '#815fd5',
    bgAlertDr = '#6c44ce',
    bgSystem = '#37bc9b',
    bgSystemL = '#48cfad',
    bgSystemLr = '#65d2b7',
    bgSystemD = '#2fa285',
    bgSystemDr = '#288770',
    bgLight = '#f3f6f7',
    bgLightL = '#fdfefe',
    bgLightLr = '#ffffff',
    bgLightD = '#e9eef0',
    bgLightDr = '#dfe6e9',
    bgDark = '#3b3f4f',
    bgDarkL = '#424759',
    bgDarkLr = '#51566c',
    bgDarkD = '#2c2f3c',
    bgDarkDr = '#1e2028',
    bgBlack = '#283946',
    bgBlackL = '#2e4251',
    bgBlackLr = '#354a5b',
    bgBlackD = '#1c2730',
    bgBlackDr = '#0f161b';