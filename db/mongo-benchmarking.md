## Enable Database profiling

Reference: https://www.mongodb.com/docs/manual/tutorial/manage-the-database-profiler/#database-profiler

```mongosh
use jackson
db.setProfilingLevel(2)
```

## Execute the query

Below query is to get the count of connections by product index

```mongosh
db.jacksonStore.countDocuments({indexes: 'saml:config:product:cd242302f9e6682512d03f876fae2ea6ee74776a'},{hint: 'indexes_1'});
```

## View profiler data for last executed query

```mongosh
db.system.profile.find().limit(1).sort( { ts : -1 } ).pretty()
```
