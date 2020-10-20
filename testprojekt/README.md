# webb3_moment5_del1

Detta är del 1 av moment 5 bestående av PHP och PDO. 
Repositoryt som du nu är inne i, del 1 innehåller tre mappar.
- api: PHP, objekt för CRUD
- config: databasuppkoppling samt htaccess 
- classes: funktioner

I den skapade webbtjänsten kan kurser lagras, vilket kan testas genom följande adress i advanced rest client eller postman:
https://malinsvensson.se/miun/webbutveckling3/moment5/api/create.php 
Utvecklaren väljer då post -> länk -> och sedan fylls värdena i genom body. ID fylls inte i då det är ett AI och fylls på av sig självt. 

Läsas: https://malinsvensson.se/miun/webbutveckling3/moment5/api/read.php genom GET -> länk --> sedan kommer värdena dycka upp

Läsas ut som enskild: https://malinsvensson.se/miun/webbutveckling3/moment5/api/read_one.php  + ?id= och valfritt id, detta genom GET --> länk + id --> värden läses ut

Raderas med delete: https://malinsvensson.se/miun/webbutveckling3/moment5/api/delete.php + ?id= och valfritt id som ska raderas, detta genom DELETE --> länk + id

Uppdateras: https://malinsvensson.se/miun/webbutveckling3/moment5/api/update.php + ?id= och valfritt id som ska uppdatera, görs likt create genom body. ID fylls inte i här heller, förutom i länken. I update används PUT. 

