# Cookies

This repository starts two endpoints. One that sets a cookie. Another one that performs a cross-site request forgery (CSRF).


## CSRF

The recommended solution is to use CSRF tokens.
https://github.com/expressjs/csurf

SameSite is still experimental and requires to turn on features in the browser.

```
res.set('Set-Cookie', ['cookie=choco', 'SameSite=None', 'Secure']);
```

A partial solution to prevent CSRF with Fetch (or XMLHTTPRequest) is to configure CORS correctly.

```
res.set('Access-Control-Allow-Origin', 'http://localhost');
```

Never do this, except if you don't have a good reason!

```
Access-Control-Allow-Origin: *
````
