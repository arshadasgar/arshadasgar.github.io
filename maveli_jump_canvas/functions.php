<?php

$action = base64_decode($_POST['action']);
$emp_id = base64_decode($_POST['emp_id']);
// echo $action;
if ($action == 'get_token') {
    echo $emp_id;
} else if ($action == 'save_score') {
    $score = base64_decode($_POST['score']);
}
