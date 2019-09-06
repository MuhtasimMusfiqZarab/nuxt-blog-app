// this middleware redirects unauthenticated users if they try to access some pages that needs authentication

export default function(context) {
  //checking authentication (else redirect)
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/admin/auth");
  }
}

// now we need to provide this middleware to:
/* 
1. individual pages (all the admin pages except the login page)
2. layout (login/signup page is also included there, thus it must not be included there)
3. 
*/
