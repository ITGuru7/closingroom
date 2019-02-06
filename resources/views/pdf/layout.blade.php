<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>ClosingRoom</title>

  <!-- Styles -->

  <style>
    .pdf-header {
      position: fixed ;
      top: 0 ;
      left: 0;
      right: 0;
      padding: 0 2rem ;
    }
    .pdf-content {
      margin-top: 100px ;
    }
    .pdf-footer {
      position: fixed ;
      bottom: -50px ;
      left: -100px;
      right: -100px;

      padding: 1rem ;
      height: 40px ;
      box-sizing: border-box ;

      text-align: center ;
      color: white ;
      background-color: rgb(24, 56, 99) ;
    }
  </style>

  @yield('style')
</head>
<body>
  <div class="pdf-container">
    <div class="pdf-header">
      @yield('header')
    </div>
    <div class="pdf-content">
      @yield('content')
    </div>
    <div class="pdf-footer">
      Created Using MNM ClosingRoom - www.mnmcs.com/closingroom<br/>
      © 2019 MNMCS
    </div>
    </table>
  </div>
</body>
</html>
