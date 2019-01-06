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
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <style>
        .email-wrapper {
            margin: auto ;
            max-width: 800px ;
        }
        header {
            display: flex ;
            justify-content: center ;
            padding: 2rem 0 ;
        }
        header .logo-image {
            margin-right: 1rem ;
        }
        header .logo-image img {
            width: 80px ;
        }
        header .logo-text {
            color: #183863 ;
            text-align: center ;
            align-self: flex-end ;
        }
        header .logo-text .title {
            font-weight: bold ;
            color: inherit ;
            font-size: 3rem ;
            line-height: 2rem ;
        }
        header .logo-text .subtitle {
            color: inherit ;
            font-size: 1rem ;
        }

        footer {
            margin-top: 1rem ;
            color: #808080 ;
            font-size: .8rem ;
            text-align: center ;
        }
        footer a {
            color: inherit ;
            text-decoration: none ;
        }

        .content-wrapper {
            background-color: white ;
            min-height: 300px ;
            display: flex ;
            flex-direction: column ;
        }
        .content-header {
            margin: 0 5rem 2rem ;
            padding: 2rem 0 1rem ;
            text-align: center ;
            border-bottom: 1px solid #B3B3B3 ;
        }
        .content-body {
            margin: 0 4rem ;
            min-height: 300px ;
        }
        .content-footer {
            margin: auto 4rem 2rem ;
        }
        .content-footline {
            height: 15px;
            background: linear-gradient(to right, white, rgb(0, 31, 126));
        }

    </style>

    @yield('style')

</head>

<body>
    <div style="background-color: #E6E7E8 ;">
        <div class="email-wrapper">
            <header>
                <div class="logo-image">
                    <img src="{{ asset('images/logo.svg') }}">
                </div>
                <div class="logo-text">
                    <div class="title">
                        MNM
                    </div>
                    <div class="subtitle">
                        Crypto Specialists
                    </div>
                </div>
            </header>

            <div class="content-wrapper">
                <div class="content-header">
                    @yield('header')
                </div>
                <div class="content-body">
                    @yield('content')
                </div>
                <div class="content-footer">
                    @yield('footer')
                </div>
                <div class="content-footline">
                </div>
            </div>

            <footer>
                © 2018 mnmcs.com All Rights Reserved<br/>
                URL：<a href="www.mnmcs.com">www.mnmcs.com</a>  E-mail：<a href="mailto:support@mnmcs.com.com">support@mnmcs.com.com</a>
            </footer>
        </div>
    </div>
</body>
</html>
