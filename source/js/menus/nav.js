import $ from "properjs-hobo";
import * as core from "../core";
import Menu from "./Menu";
import router from "../router";
import Vue from "vue";


/**
 *
 * @public
 * @namespace nav
 * @description Handles opening / closing the main nav menu.
 * @memberof menus
 *
 */
const nav = {
    /**
     *
     * @public
     * @method init
     * @memberof menus.nav
     * @description Initializes navmenu interactions.
     *
     */
    init () {
        this.element = core.dom.body.find( ".js-nav" );
        this.trigger = core.dom.header.find( ".js-controller--nav" );
        this.menu = new Menu( this.element );
        this.initView();

        core.log( "nav initialized" );
    },


    /**
     *
     * @public
     * @method initView
     * @memberof menus.nav
     * @description Render the nav view.
     *
     */
    initView () {
        const data = router.getState( "data" );
        const viewData = {
            navs: data.nav.sort(( navA, navB ) => {
                let ret = 0;

                if ( navA.data.order.value < navB.data.order.value ) {
                    ret = -1;

                } else {
                    ret = 1;
                }

                return ret;
            }),
            socials: data.social
        };

        this.view = new Vue({
            el: this.element[ 0 ],
            data: viewData,
            replace: false,
            compiled: () => {
                this.items = this.element.find( ".js-nav-item" );
                this.bindEvents();
                this.toggleActive();
            }
        });
    },


    /**
     *
     * @public
     * @method open
     * @memberof menus.nav
     * @description Opens the navmenu.
     *
     */
    open () {
        this.menu.open();
    },


    /**
     *
     * @public
     * @method close
     * @memberof menus.nav
     * @description Closes the navmenu.
     *
     */
    close () {
        this.menu.close();
    },


    /**
     *
     * @public
     * @method bindEvents
     * @memberof menus.nav
     * @description Setup main interaction events for nav/header.
     *
     */
    bindEvents () {
        this.element.on( "click", onHitMenu );
        this.trigger.on( "click", onHitIcon );
    },


    /**
     *
     * @public
     * @method toggleActive
     * @memberof menus.nav
     * @description Toggle the active nav menu item by id.
     *
     */
    toggleActive () {
        const $navi = this.items.filter( `[href='${window.location.pathname}']` );

        this.items.removeClass( "is-active" );

        if ( $navi.length ) {
            $navi.addClass( "is-active" );
        }
    }
};


/**
 *
 * @private
 * @method onHitMenu
 * @param {object} e The Event object
 * @memberof menus.nav
 * @description Handles list icon event.
 *
 */
const onHitMenu = function ( e ) {
    const $target = $( e.target );

    if ( $target.is( ".js-nav" ) ) {
        nav.close();
    }
};


/**
 *
 * @private
 * @method onHitIcon
 * @memberof menus.nav
 * @description Handles list icon event.
 *
 */
const onHitIcon = function () {
    nav.open();
};



/******************************************************************************
 * Export
*******************************************************************************/
export default nav;
