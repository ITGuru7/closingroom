@extends('emails.layout')

@section('style')
    <style>
        .content-header .heading {
            font-size: 2rem ;
        }
        .content-footer .footer {
            color: #999999 ;
            font-size: .8rem ;
        }
    </style>
@endsection

@section('header')
    <div class="heading">Closing Room Invitation</div>
@endsection

@section('footer')
    <div class="footer">
        MNMCS Closing Room Team<br/>
        Automated message, please do not reply.
    </div>
@endsection

@section('content')
    <div>
        Hello, you have been invited to participate in a private closing room at MNCS by [{{$displayname}}] as {{$role}}.<br/>
        Room #{{$room_id}} [{{$participants}} participants]<br/><br/>
        Please click the link below<br/><br/>
        <a href="{{$link}}">{{$link}}</a>
    </div>
    <div>
    </div>
@endsection
