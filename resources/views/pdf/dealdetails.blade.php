@extends('pdf.layout')

@section('content')
    <h1 class="dealdetails-header">Room - {{ $roomname }}</h1>
    <p>Timelimit - {{ $timelimit }}</p>
@endsection()
