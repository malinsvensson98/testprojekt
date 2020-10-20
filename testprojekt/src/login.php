<?php include "includes/config.php"?>
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="stylesheet.css" />
    <title>Gästbok</title>
</head>
<body>

<?php

// Kontrollerar fält 
if (isset($_POST['username'])) {
 $username = $_POST['username'];
 $password = $_POST['password'];


// Tillåt ej html taggar och liknande 
 $username = strip_tags($username);
 $password  = strip_tags($password);

 // Kontrollerar om lösen och anvnamn är korrekt (hårdkodat)
 if ($username == "admin" && $password == "password") {
  $_SESSION['username'] = $username;

  // Skickar vidare till admin-sidan 
  header("Location: admin.php");
 } else {
  $message = "<h5><br/>Felaktiga användaruppgifter!</h5>";
 }
}

?>
<?php

if (isset($_GET['message'])) {
 echo $_GET['message'];
}

if (isset($message)) {
 echo $message;
}
?>

<br/>
<h4>Användarnamn: admin <br/> 
Lösenord: password </h4> <br/>
<form method="post" class="loggaIn">
Användarnamn: <br/> <input type="text" name="username"> <br/> <br/>
Lösenord: <br/> <input type="password" name="password"> <br/> <br/>
<input type="submit" name="loggIn" value="Logga in">
</form>


</div>
</div>
</body>
</html>