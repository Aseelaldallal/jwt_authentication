


# Summary

I create an authentication with JSON web tokens using passport-jwt. This API is to be used by React/Angular/Vue or a similar front end framework. I sent the jwt with every request, meaning that I don't rely on sessions, but simply put the token on every request I make to the API. This way, I don't have to worry about cookies. On the front end, you save the token in localStorage.

