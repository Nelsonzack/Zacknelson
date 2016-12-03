
## Overview

Welcome to my Prog270 Website.

## Foo Data

<button id="elfDatabasePush" class="btn btn-default btn-lg">Foo Data Insert
</button>

<button id="elfDatabaseGet" class="btn btn-default btn-lg">Foo Data Get </button>


<div id="firebaseui-auth-container"></div>
<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.css" />
<script src="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.5.2/firebase.js"></script>        
<script>
    elfFireStart();
    elfFireConfig();
</script>

## Shared Data

<div>
  <input type="text" id="userInput" name="userInput">
</div>

<div>
<button id="elfInput" class="btn btn-default btn-lg">Post Input </button>

<button id="elfDatabaseGetAllQux" class="btn btn-default btn-lg">Get All Qux Data </button>
</div>

<div id="userInputList">
<ul>
  <li>Login</li>
  <li>Foo Data</li>
  <li>Shared Data</li>
  <li>User Details</li>
  <li>User Sign-In Status</li>
</ul>
</div>

## User Details

<button id="elfGetCurrentUser" class="btn btn-default btn-lg">Get User Data</button>

<div class="container">
  <p id="userName"></p>
  <p id="userEmail"></p>
  <p id="userPhotoUrl"></p>
  <p id="userId"></p>
  <img src="" id="userImg" alt="Wait">
</div>

<div class="container">
    <p>Status: <span id="sign-in-status">Unknown</span></p>
    <button class="btn btn-primary btn-lg" id="sign-in"></button>
    <pre id="account-details"></pre>
</div>

<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.css" />
<script src="https://www.gstatic.com/firebasejs/3.5.2/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.js"></script>

<script>
  elfFireStart();
  elfFireInitPage();
</script>
