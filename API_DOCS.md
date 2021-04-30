# DataStreamer API Documentation #

**uploading a file**

> Method : POST

uploading common files
```language
http://localhost:4000/api/upload/null
```
uploading subtitle file
```language
http://localhost:4000/api/upload/<filename-of-the-subtitle-in-base-encode-64-format>
```

----------
**Downloading a file**

> Method : GET

```language
http://localhost:4000/downloadfile/<id-of-the-file-get-from-fetchallfile-endpoint>
```

----------
**Fetch and List all files**

> Method : GET

```language
http://localhost:4000/fetchallfiles
```

----------
**Fetch and List all videos**

> Method : GET

```language
http://localhost:4000/fetchallvideos
```

----------
**Delete a file**

> Method : GET

```language
http://localhost:4000/deletefile/<id-of-the-file-get-from-fetchallfile-endpoint>
```

----------
**Delete all files**

> Method : GET

```language
http://localhost:4000/deleteallfiles
```
----------
**Stream video or audio file**

> Method : GET

```language
http://localhost:4000/streamcontent/<path-of-the-file-get-from-fetchallvideo-endpoint>
```
----------

**Stream Static content such as subtitle file and other image files**

> Method : GET

```language
http://localhost:4000/servestaticcontent/<path-of-the-file-get-from-corresponding-endpoints>
```
----------







