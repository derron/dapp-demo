/**
Template Controllers

@module Routes
*/

/**
The app routes

@class App routes
@constructor
*/

// Change the URLS to use #! instead of real paths
// Iron.Location.configure({useHashPaths: true});

// Router defaults
Router.configure({
    layoutTemplate: 'layout_main',
    notFoundTemplate: 'layout_notFound',
    yieldRegions: {
        'layout_header': {to: 'header'}
        , 'layout_footer': {to: 'footer'}
    }
});

// ROUTES

/**
The receive route, showing the wallet overview

@method dashboard
*/

// Default route
Router.route('/', {
    template: 'views_home',
    name: 'index'
});

// Route for view1
Router.route('/home', {
    template: 'views_home',
    name: 'home'
});

// Route for view2
Router.route('/admin', {
    template: 'views_admin',
    name: 'admin'
});
