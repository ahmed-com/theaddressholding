# The Address Holding Business Case
This repo contains the code for an apartment listing application that allows users to view apartment details.
## Backend
The backend is an API with the main requested endpoints, as well as a `create-root-user` command that is called on application bootstrap. It correctly handles both user authentication and authorization. I also accounts for image uploads.
- [x] login
- [x] register
- [x] list apartments
- [x] view apartment details
- [x] create an apartment
- [x] (optional) create admin
- [x] api swagger documentation `/api-docs`

 ## Frontend
 - [x] authentication
 - [x] authorization
 - [x] shadcn UI integration
 - [x] SSR/SSG apartment listings are generated in the build process for performance optimization

To run the application locally, make sure you have both docker and docker-compose installed in your machine, then simply run `docker-compose up --build`.
Make sure to have the `NGINX_PORT` environment variable ready in your environment.
The root user by default will the credentials `root` & `ChangeMe123!` , but you can also adjust these credentials via environment variables.

The app is server-side-generated as requested so after creating an apartment listing as an admin, make sure to wait for next.js to revalidate the cache, or manually rebuild the app to see your changes.
