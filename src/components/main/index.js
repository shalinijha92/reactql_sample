// Main React component, that we'll import in `src/app.js`
//
// Note a few points from this file:
//
// 1.  We're using the format `main/index.js` for this file, which means we
// can simply import 'src/components/main', which will auto-default to index.js.
// This is a useful pattern when you have styles/images to pull from, and you
// want to keep the component tree organised.
//
// 2.  We import SASS and a logo SVG file directly.  Classnames will be hashed
// automatically, and images will be compressed/optimised in production.  File
// names that are made available in the import variable will be identical on
// both the server and browser.
//
// 3.  We're introducing React Router in this component.  In RR v4, routes are
// not defined globally-- they're defined declaratively on components, so we
// can respond to route changes anywhere.
//
// 4.  We're using `react-helmet`, which allows us to set <head> data like
// a <title> or <meta> tags, which are filtered up to the main <Html> component
// before HTML rendering.

// ----------------------
// IMPORTS

/* NPM */

// React
import React from 'react';

// Routing via React Router
import {
  Route,
  Switch,
} from 'react-router-dom';

// <Helmet> component for setting the page title/meta tags
import Helmet from 'react-helmet';


/* App */

// Child React components. Note:  We can either export one main React component
// per file, or in the case of <Home>, <Page> and <WhenFound>, we can group
// multiple components per file where it makes sense to do so
import Header from 'src/components/header';
import Gridwall from 'src/components/gridwall';
import Cart from 'src/components/cart';
// Styles
import '../../bootstrap.global.css';

// Get the ReactQL logo.  This is a local .svg file, which will be made
// available as a string relative to [root]/dist/assets/img/

// ----------------------

export default () => (
  <div className="container-fluid">
    <Helmet
      title="ReactQL application"
      meta={[{
        name: 'description',
        content: 'Graphql Sample App',
      }]} />
    <Header />
    <Switch>
      <Route exact path="/" component={Gridwall} />
      <Route path="/cart" exact component={Cart} />
    </Switch>
  </div>
);
