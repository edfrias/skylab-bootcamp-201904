(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,n){e.exports=n(65)},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},43:function(e,t,n){},55:function(e,t,n){},64:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(21),s=n.n(o),i=(n(31),n(3)),c=n(14),l=n(6),u=n(2),m=n(4),f={undefinedOrNull:function(e){return"null"===e?null:"undefined"!==e?e:void 0}},h=n(10),p=function(e){function t(e){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),t}(Object(h.a)(Error)),d=function(e){function t(e){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),t}(Object(h.a)(Error)),v=function(e){function t(e){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),t}(Object(h.a)(Error)),_=function(e){function t(e){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),t}(Object(h.a)(Error)),b=function(e){function t(e){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),t}(Object(h.a)(Error)),g=function(e){function t(e){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),t}(Object(h.a)(Error)),E={arguments:function(e){e.forEach(function(e){var t=e.name,n=e.value,a=e.type,r=e.notEmpty,o=e.optional;if(void 0!=n){if(typeof n!==a)throw TypeError("".concat(t," ").concat(n," is not a ").concat(a));if(r)if("string"===a){if(!n.trim().length)throw new p("".concat(t," is empty"))}else if("object"===a&&!Object.keys(n).length)throw new p("".concat(t," is empty"))}else if(!o)throw new v("".concat(t," is not optional"))})},email:function(e){if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e)))throw new d("".concat(e," is not an e-mail"))},url:function(e){if(!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(String(e)))throw new d("".concat(e," is not a url"))}},y=n(25);var k=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=n.method,r=void 0===a?"GET":a,o=n.headers,s=n.body,i=n.timeout,c=void 0===i?0:i;if(E.arguments([{name:"url",value:e,type:"string",notEmpty:!0},{name:"method",value:r,type:"string",notEmpty:!0},{name:"headers",value:o,type:"object",optional:!0},{name:"body",value:s,type:"string",notEmpty:!0,optional:!0},{name:"timeout",value:c,type:"number",notEmpty:!0,optional:!0}]),E.url(e),c){var l=new AbortController;t=l.signal,setTimeout(function(){return l.abort()},c)}return fetch(e,{method:r,headers:o,body:s,signal:t}).catch(function(e){throw e instanceof TypeError?new _("cannot connect"):e instanceof DOMException?new b("time out, exceeded limit of ".concat(c,"ms")):e})},N={__url__:"https://skylabcoders.herokuapp.com/api",__timeout__:0,create:function(e,t,n){return E.arguments([{name:"username",value:e,type:"string",notEmpty:!0},{name:"password",value:t,type:"string",notEmpty:!0},{name:"data",value:n,type:"object",notEmpty:!0,optional:!0}]),k("".concat(this.__url__,"/user"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object(y.a)({username:e,password:t},n)),timeout:this.__timeout__}).then(function(e){return e.json()})},authenticate:function(e,t){return E.arguments([{name:"username",value:e,type:"string",notEmpty:!0},{name:"password",value:t,type:"string",notEmpty:!0}]),k("".concat(this.__url__,"/auth"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t}),timeout:this.__timeout__}).then(function(e){return e.json()})},retrieve:function(e,t){return E.arguments([{name:"id",value:e,type:"string",notEmpty:!0},{name:"token",value:t,type:"string",notEmpty:!0}]),k("".concat(this.__url__,"/user/").concat(e),{headers:{Authorization:"Bearer ".concat(t)},timeout:this.__timeout__}).then(function(e){return e.json()})},update:function(e,t,n){return E.arguments([{name:"id",value:e,type:"string",notEmpty:!0},{name:"token",value:t,type:"string",notEmpty:!0},{name:"data",value:n,type:"object",notEmpty:!0}]),k("".concat(this.__url__,"/user/").concat(e),{method:"PUT",headers:{Authorization:"Bearer ".concat(t),"Content-Type":"application/json"},body:JSON.stringify(n),timeout:this.__timeout__}).then(function(e){return e.json()})}},j={__url__:"https://openlibrary.org",searchBooks:function(e){return E.arguments([{name:"query",value:e,type:"string"}]),k("".concat(this.__url__,"/search.json?title=").concat(e)).then(function(e){return e.json()})},retrieveBook:function(e){return E.arguments([{name:"isbn",value:e,type:"string"}]),k("".concat(this.__url__,"/api/books?bibkeys=ISBN:").concat(e,"&jscmd=details&format=json")).then(function(e){return e.json()})}},O={set __userId__(e){sessionStorage.userId=e},get __userId__(){return f.undefinedOrNull(sessionStorage.userId)},set __userToken__(e){sessionStorage.userToken=e},get __userToken__(){return f.undefinedOrNull(sessionStorage.userToken)},get isUserLoggedIn(){return!(!this.__userId__||!this.__userToken__)},registerUser:function(e,t,n){return E.arguments([{name:"alias",value:e,type:"string",notEmpty:!0},{name:"email",value:t,type:"string",notEmpty:!0},{name:"password",value:n,type:"string",notEmpty:!0}]),E.email(t),N.create(t,n,{alias:e}).then(function(e){if("OK"!==e.status)throw new g(e.error)})},loginUser:function(e,t){var n=this;return E.arguments([{name:"email",value:e,type:"string",notEmpty:!0},{name:"password",value:t,type:"string",notEmpty:!0}]),E.email(e),N.authenticate(e,t).then(function(e){if("OK"!==e.status)throw new g(e.error);var t=e.data,a=t.id,r=t.token;n.__userId__=a,n.__userToken__=r})},retrieveUser:function(){return N.retrieve(this.__userId__,this.__userToken__).then(function(e){if("OK"===e.status){var t=e.data;return{alias:t.alias,email:t.username}}throw new g(e.error)})},logoutUser:function(){sessionStorage.clear()},searchBooks:function(e){return E.arguments([{name:"query",value:e,type:"string"}]),j.searchBooks(e)},retrieveBook:function(e){return E.arguments([{name:"isbn",value:e,type:"string"}]),j.retrieveBook(e)},toggleFavBook:function(e){var t=this;return E.arguments([{name:"isbn",value:e,type:"string"}]),N.retrieve(this.__userId__,this.__userToken__).then(function(n){var a=n.status,r=n.data;if("OK"===a){var o=r.bookFavs,s=void 0===o?[]:o,i=s.indexOf(e);return i<0?s.push(e):s.splice(i,1),N.update(t.__userId__,t.__userToken__,{bookFavs:s}).then(function(){return s})}throw new g(n.error)})},retrieveFavBooks:function(){return N.retrieve(this.__userId__,this.__userToken__).then(function(e){var t=e.status,n=e.data;if("OK"===t){var a=n.bookFavs,r=void 0===a?[]:a;if(r.length){var o=r.map(function(e){return j.retrieveBook(e)});return Promise.all(o)}return r}throw new g(e.error)})}};n(32);var w=function(e){var t=e.onLogout,n=O.isUserLoggedIn;return r.a.createElement("header",{className:"great-vibes header"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Skybrary"),r.a.createElement("hr",null)),n&&r.a.createElement("button",{className:"button is-small is-pulled-left",onClick:function(){t()}},r.a.createElement("i",{className:"fas fa-power-off"}),r.a.createElement("span",null,"Log Out")))};n(33);var S=function(){return r.a.createElement("footer",{className:"footer has-text-centered "},r.a.createElement("p",{className:"footer__text"},"Made with ",r.a.createElement("i",{className:"fas fa-heart"})," by Daniela, Albert and Edgar (the amazing 'los ninjas')"))};n(34);var B=function(e){var t=e.onClickRegister,n=e.onClickLogin;return r.a.createElement("section",{className:"section landing"},r.a.createElement(w,null),r.a.createElement("section",{className:"landing__buttons-container columns",onClick:function(e){return e.preventDefault()}},r.a.createElement("div",{className:"column is-3 is-offset-2"},r.a.createElement("a",{className:"button is-primary is-large",href:"#",onClick:function(){return t()}},"Register")),r.a.createElement("div",{className:"column is-2"},r.a.createElement("span",{className:"or"},"or")),r.a.createElement("div",{className:"column is-3"},r.a.createElement("a",{className:"button is-link is-large",href:"#",onClick:function(){return n()}},"Login"))),r.a.createElement(S,null))};n(35);var F=function(e){var t=e.onRegister,n=e.error;return r.a.createElement("section",{className:"section register"},r.a.createElement(w,null),r.a.createElement("div",{className:"section"},r.a.createElement("h2",{className:"subtitle has-text-centered"},"Register"),r.a.createElement("form",{className:"columns is-multiline",onSubmit:function(e){e.preventDefault();var n=e.target,a=n.alias.value,r=n.username.value,o=n.password.value;t(a,r,o)}},r.a.createElement("div",{className:"column is-10 is-offset-1"},r.a.createElement("div",{className:"columns is-multiline"},r.a.createElement("input",{className:"column is-4 is-10-mobile is-offset-1-mobile",type:"text",name:"alias",placeholder:"Alias"}),r.a.createElement("input",{className:"column is-4 is-10-mobile is-offset-1-mobile",type:"text",name:"username",placeholder:"Email"}),r.a.createElement("input",{className:"column is-4 is-10-mobile is-offset-1-mobile",type:"password",name:"password",placeholder:"Password"}))),r.a.createElement("p",{className:"column is-2 is-offset-5 has-text-centered"},r.a.createElement("button",{className:"button is-medium is-link is-inverted"},"Send")),n&&r.a.createElement("article",{className:"column is-12  message is-danger register__error"},r.a.createElement("div",{className:"message-body"},n)))),r.a.createElement(S,null))};n(36);var T=function(e){var t=e.onLogin,n=e.error;return r.a.createElement("section",{className:"section login"},r.a.createElement(w,null),r.a.createElement("div",{className:"section"},r.a.createElement("h2",{className:"subtitle has-text-centered"},"Login"),r.a.createElement("form",{className:"columns is-multiline",onSubmit:function(e){e.preventDefault();var n=e.target.username.value,a=e.target.password.value;t(n,a)}},r.a.createElement("input",{className:"column is-5 is-four-fifths-mobile is-offset-1 is-offset-1-mobile",type:"text",name:"username",placeholder:"Email"}),r.a.createElement("input",{className:"column is-5 is-four-fifths-mobile is-offset-1-mobile",type:"password",name:"password",placeholder:"Password"}),r.a.createElement("p",{className:"column is-2 is-offset-5 has-text-centered"},r.a.createElement("button",{className:"button is-medium is-link is-inverted"},"Send")),n&&r.a.createElement("article",{className:"column is-12  message is-danger register__error"},r.a.createElement("div",{className:"message-body"},n)))),r.a.createElement(S,null))};n(37);var I=function(e){var t=e.onSearch;return r.a.createElement("form",{className:"columns search-form is-multiline",onSubmit:function(e){e.preventDefault();var n=e.target.query.value;t(n)}},r.a.createElement("input",{className:"column is-3-desktop is-offset-4-desktop is-6-tablet is-offset-2-tablet is-8-mobile is-offset-2-mobile",type:"text",name:"query",placeholder:"Search your books by title"}),r.a.createElement("p",{className:" search-form__button column is-2 is-offset-mobile-5 has-text-centered-mobile"},r.a.createElement("button",{className:" button is-medium  is-link is-inverted"},"Search")))};n(38),n(39);var L=function(e){var t=e.items,n=e.onItem,a=e.onFav,o=e.bookFavs;return r.a.createElement("section",{className:"library container"},r.a.createElement("ul",{className:"columns is-centered is-multiline is-mobile"},t.map(function(e){var t=e.key,s=e.isbn,i=e.cover_edition_key,c=e.title,l=e.author_name,u=e.cover_i,m=e.publish_date,f=o.some(function(e){return!!s&&Object.keys(e)[0]==="ISBN:"+s[0]});return s&&i&&r.a.createElement("li",{className:"library__book column is-3-desktop is-4-tablet is-10-mobile",key:i,onClick:function(){return n(s[0],t)}},r.a.createElement("article",{className:"card"},r.a.createElement("div",{className:"card-image"},r.a.createElement("figure",{className:"image is-3by4"},r.a.createElement("img",{src:u&&u>0?"http://covers.openlibrary.org/b/id/".concat(u,"-L.jpg"):"https://www.motorolasolutions.com/content/dam/msi/images/business/products/accessories/p_-_r/raf4220a/_images/static_files/b2b_product_raf4220a_lg_us-en.jpg",alt:c}))),r.a.createElement("div",{className:"card-content"},r.a.createElement("div",{className:"media"},r.a.createElement("div",{className:"media-content"},r.a.createElement("p",{className:"title is-4"},c),r.a.createElement("p",{className:"subtitle is-6"},l))),r.a.createElement("div",{className:"content"},r.a.createElement("span",{className:"book__isbn"},"ISBN: ",s[0]),r.a.createElement("time",null,m&&r.a.createElement("span",null,m[0]))),r.a.createElement("i",{onClick:function(e){e.stopPropagation(),a(s[0])},className:f?"fas fa-heart":"far fa-heart"}))))})))};n(43);var C=function(e){var t=e.item,n=e.onFav,o=e.bookFavs;return t?r.a.createElement("section",{className:"container"},r.a.createElement("article",{className:"columns card-detail"},r.a.createElement("i",{onClick:function(e){e.stopPropagation(),n(t.isbn)},className:o.some(function(e){return!!t.isbn&&Object.keys(e)[0]==="ISBN:"+t.isbn})?"fas fa-heart":"far fa-heart"}),r.a.createElement("div",{className:"column is-4 card-detail__image"},r.a.createElement("img",{src:t.cover&&t.cover>0?"https://covers.openlibrary.org/b/id/".concat(t.cover,"-L.jpg"):"https://www.motorolasolutions.com/content/dam/msi/images/business/products/accessories/p_-_r/raf4220a/_images/static_files/b2b_product_raf4220a_lg_us-en.jpg"})),r.a.createElement("div",{className:"column is-8 card-detail__info"},t.title&&r.a.createElement(a.Fragment,null,r.a.createElement("p",{className:"info__BoldTitle"},"Title:",r.a.createElement("span",null,t.title))),r.a.createElement("p",{className:"info__BoldTitle"},"Author:",r.a.createElement("span",null,t.author_name.join(", "))),t.numberOfPages&&r.a.createElement("p",{className:"info__BoldTitle"},"Num of pages:",r.a.createElement("span",null,t.numberOfPages)),t.description&&r.a.createElement(a.Fragment,null,r.a.createElement("p",{className:"info__BoldTitle"},"Synopsis:",r.a.createElement("span",null,t.description)))))):"Este detalle no es correcto"},x=n(9),R=n(22),P=n.n(R),U=(n(55),function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={query:null,error:null,books:[],bookDetail:null,bookInfo:{},bookFavs:[]},n.search=function(e){return O.searchBooks(e).then(function(t){return O.retrieveFavBooks().then(function(a){n.setState({query:e,bookFavs:a,bookDetail:null,books:t.docs})})}).catch(function(e){return n.setState({error:e.message})})},n.handleSearch=function(e){return n.props.history.push("/home?query=".concat(e))},n.handleRetrieve=function(e,t){var a=n.state.books.find(function(e){return e.key===t}),r=a.cover_i,o=a.title,s=a.author_name,i=void 0===s?[]:s,c=a.publish_date,l=void 0===c?[]:c;O.retrieveBook(e).then(function(t){var a=Object.values(t)[0].details,s=void 0===a?{}:a,c=s.description,u=void 0===c?{}:c,m=s.number_of_pages,f=u.value,h={author_name:i,cover:r,description:void 0===f?"":f,numberOfPages:m,title:o,publish_date:l[0],isbn:e};n.setState({bookDetail:h,isbn:e})}).catch()},n.handleFav=function(e){return O.toggleFavBook(e).then(function(){return O.retrieveFavBooks()}).then(function(e){return n.setState({bookFavs:e})})},n.handleLogout=function(){O.logoutUser(),n.props.history.push("/")},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentWillReceiveProps",value:function(e){if(e.location.search){var t=P.a.parse(e.location.search).query;t&&this.search(t)}}},{key:"render",value:function(){var e=this.handleLogout,t=this.handleSearch,n=this.handleRetrieve,a=this.state,o=a.query,s=a.books,i=a.bookDetail,c=a.bookFavs,l=this.handleFav;return r.a.createElement("main",{className:"home"},r.a.createElement(w,{onLogout:e}),r.a.createElement(I,{query:o,onSearch:t}),!i&&r.a.createElement(L,{items:s,onItem:n,onFav:l,bookFavs:c}),i&&r.a.createElement(C,{item:i,onFav:l,bookFavs:c}),r.a.createElement(S,null))}}]),t}(a.Component)),q=Object(x.f)(U),A=(n(64),function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={name:null,error:null},n.handleRegister=function(e,t,a){try{O.registerUser(e,t,a).then(function(){return n.props.history.push("/login")}).catch(function(e){return n.setState({error:e.message})})}catch(o){var r=o.message;n.setState({error:r})}},n.handleLogin=function(e,t){try{O.loginUser(e,t).then(function(){return O.retrieveUser()}).then(function(e){n.setState({name:e.alias,error:null},function(){return n.props.history.push("/home")})}).catch(function(e){return n.setState({error:e.message})})}catch(r){var a=r.message;n.setState({error:a})}},n.handleLoginNavigation=function(){return n.props.history.push("/login")},n.handleRegisterNavigation=function(){return n.props.history.push("/register")},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state.error,t=this.handleLogin,n=this.handleRegisterNavigation,o=this.handleLoginNavigation,s=this.handleRegister;return r.a.createElement(a.Fragment,null,r.a.createElement(x.d,null,r.a.createElement(x.b,{exact:!0,path:"/",render:function(){return r.a.createElement(B,{onClickRegister:n,onClickLogin:o})}}),r.a.createElement(x.b,{path:"/register",render:function(){return r.a.createElement(F,{onRegister:s,error:e})}}),r.a.createElement(x.b,{path:"/login",render:function(){return r.a.createElement(T,{onLogin:t,error:e})}}),r.a.createElement(x.b,{path:"/home",render:function(e){return r.a.createElement(q,e)}}),r.a.createElement(x.a,{to:"/"})))}}]),t}(a.Component)),D=Object(x.f)(A);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var z=n(13);s.a.render(r.a.createElement(z.a,null,r.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[26,1,2]]]);
//# sourceMappingURL=main.a414fc0c.chunk.js.map