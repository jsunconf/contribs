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

## Prepare the db

```
geddy jake db:init environment=production
geddy jake db:migrate environment=production # until: (No migrations to run)
```
