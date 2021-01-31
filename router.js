// template
const playTemplate = require('./pages/play.hbs')
const reportTemplate = require('./pages/report.hbs')

const Play = playTemplate()
const Report = reportTemplate()

const routes = {
    '/': Play,
    '/play': Play,
    '/report': Report
}

// entry point
function initialRoutes (mode, el) {
    renderHTML(el, routes['/'])
    
    if (mode === 'history') {
        window.onpopstate = () => renderHTML(el, routes[window.location.pathname])
    } else {
        window.addEventListener('hashchange', () => {
            return renderHTML(el, getHashRoute())
        })
    }
}

// set browser history
function historyRouterPush (pathName, el) {
    window.history.pushState({}, pathName, window.location.origin + pathName)
    renderHTML(el, routes[pathName])
}

// get hash history route
function getHashRoute () {
    let route = '/'
    
    Object.keys(routes).forEach(hashRoute => {
        if (window.location.hash.replace('#', '') === hashRoute.replace('/', '')) {
            route = routes[hashRoute]
        }
    })
    
    return route
}

// set hash history
function hashRouterPush (pathName, el) {
    renderHTML(el, getHashRoute())
}

// render
function renderHTML (el, route) {
    el.innerHTML = route
}

module.exports = {
    initialRoutes,
    historyRouterPush,
    hashRouterPush
}