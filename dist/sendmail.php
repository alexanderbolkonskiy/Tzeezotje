<?php

/**
 * This example shows sending a message using PHP's mail() function.
 */

//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();

$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language');
$mail->IsHTML(true);

//Set who the message is to be sent from
$mail->setFrom('alekseyostapchenko@gmail.com', 'Aleksey');
//Set who the message is to be sent to
$mail->addAddress('alekseyostapchenko@gmail.com', 'Aleksey');
//Set the subject line
$mail->Subject = 'тест письма';


$body = '<h1>Письмо</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p>Имя: '.$_POST['name'].'</p>';
}

if(trim(!empty($_POST['tel']))){
    $body.='<p>Телефон: '.$_POST['tel'].'</p>';
}

if(trim(!empty($_POST['email']))){
    $body.='<p>E-mail: '.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['message']))){
    $body.='<p>Сообщение: '.$_POST['message'].'</p>';
}

if(!empty($_FILES['image']['tmp_name'])){
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];

    if(copy($_FILES['image']['tmp_name'], $filePath)) {
        $fileAttach = $filePath;
        $body.='<p>Фото в приложении</p>';
        $mail->addAttachment($fileAttach);
    }
}

$mail->Body = $body;


if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>