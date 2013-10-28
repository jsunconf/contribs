## Development

Starting the app:
```
$ npm run dev
```

Less is used for the stylings. There is a grunt watch task for changes to less files:

```
$ grunt watch
```

Integration tests using selenium webdriver

needs `selenium-server-standalone-2.37.0.jar` in `test/bin`

```
$ npm run int
```

## Preparing the deploy on heroku:

Configure compiling of the .less files on heroku

```
heroku config:add BUILDPACK_URL=https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
heroku labs:enable user-env-compile -a $MYAPP
```

Set environment variables

```
heroku config:set NODE_ENV=production

heroku config:set RECAPTCHA_PUBLIC=$YOUR_PUBLIC_KEY
heroku config:set RECAPTCHA_PRIVATE=$YOUR_PRIVATE_KEY

heroku config:set DB_HOST=$YOUR_HOST
heroku config:set DB_DATABASE=$YOUR_DATABASE
heroku config:set DB_USER=$YOUR_USER
heroku config:set DB_PORT=$YOUR_PORT
heroku config:set DB_PW=$YOUR_PASSWORD

heroku config:set GEDDY_SECRET=$YOUR_KEY # generate one with `geddy gen secret` but do not check it in

After the first deploy prepare the Postgres DB

```
heroku run geddy jake db:init environment=production
heroku run geddy jake db:migrate environment=production # until: (No migrations to run)
```
