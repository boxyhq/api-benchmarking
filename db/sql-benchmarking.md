## Find the keys for the product index

```sql
SELECT DISTINCT
   "key"
 FROM
   "public"."jackson_index"
 WHERE
   "key" LIKE 'saml:config:product:%'
```

```shell
"saml:config:product:cd242302f9e6682512d03f876fae2ea6ee74776a"
"saml:config:product:b820df4f0ec59b4a30fd5dd3d7bac6bb4dea6bb0"
"saml:config:product:a225b7104159c80123c73051655da85e5a77922f"
"saml:config:product:12e9799990914fc2f3a63d218c6d36b09b9c1c48"
"saml:config:product:a0ba4260ca79dd59b77a5020c3bfea54a5514854"
"saml:config:product:e4ad69ca06131f199c6617fa17256020285f7f99"
"saml:config:product:82f82dd9ea62b0b9b8d9742fb792c243a94a4db6"
"saml:config:product:a0d01abd24243ec93f977e5cf27d96a971f2ed12"
"saml:config:product:1445fe2819c35e711cee63cd2fb9309589f5c79c"
"saml:config:product:cdbe637fbfebaeb399a8dfe6682d2d5c738d6ab7"
```

## Count of connections in the connectionStore

```sql
EXPLAIN ANALYZE
SELECT
COUNT(1) AS "cnt"
FROM
"jackson_store" "JacksonStore"
WHERE
("JacksonStore"."namespace" = 'saml:config')
```

## Count of connections by product Index

```sql
EXPLAIN ANALYZE
SELECT
COUNT(DISTINCT ("JacksonIndex"."id")) AS "cnt"
FROM
"jackson_index" "JacksonIndex"
LEFT JOIN "jackson_store" "JacksonIndex__store" ON "JacksonIndex__store"."key" = "JacksonIndex"."storeKey"
WHERE
(
"JacksonIndex"."key" = 'saml:config:product:12e9799990914fc2f3a63d218c6d36b09b9c1c48'
)
```
