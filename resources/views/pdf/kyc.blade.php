@extends('pdf.layout')

@section('style')
  <style>

    .pdf-header .common-header {
      margin: 1rem 0 ;
      width: 100% ;
      border-bottom: 3px solid rgb(35, 31, 32) ;
    }
    .pdf-header .room-header {
      width: 100% ;
    }
    .room-header .label {
      margin-right: 1rem ;
    }
    .room-header .input {
      width: 60% ;
      display: inline-block ;
      text-align: center ;
      border-bottom: 1px solid rgb(35, 31, 32);
    }
    .pdf-content .sheet-container {
      width: 100% ;
    }
    .sheet-container th {
      font-size: 1.5rem ;
      color: rgb(24, 56, 99) ;
      border-bottom: 2px solid rgb(35, 31, 32) ;
    }

    .sheet-container td {
      width: 25% ;
      vertical-align: top;
    }

    .sheet-container td .user-label {
      font-weight: bold ;
      margin-bottom: .5rem ;
    }

  </style>
@endsection

@section('header')
  <table class="common-header" cellspacing=1 cellpadding=0>
    <tbody>
      <tr>
        <td style="padding-left: .5rem;">1</td>
        <td width="200px" style="color: rgb(24, 56, 99); border-bottom: 10px solid rgb(24, 56, 99)">
          CR-{{ $room['rid'] }} - KYC
        </td>
      </tr>
    </tbody>
  </table>
  <table class="room-header" cellpadding=0 borderspacing=0>
    <tbody>
      <tr>
        <td>
          <span class="label">Date:</span>
          <span class="input">{{ $room['create_date'] }}</span>
        </td>
        <td>
          <span class="label">ClosingRoom Number:</span>
          <span class="input">{{ $room['rid'] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
@endsection

@section('content')
  <table class="sheet-container" border=0 cellspacing=40 cellpadding=0>
    <thead>
      <tr>
        <th align="center" colspan=4>Intermediary Personal Data Sheet</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="user-label">First Name:</div>
          <div class="user-data">{{ $user['firstname'] }}</div>
        </td>
        <td>
          <div class="user-label">Last Name:</div>
          <div class="user-data">{{ $user['lastname'] }}</div>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <div class="user-label">Address:</div>
          <div class="user-data">{{ $user['address'] }}</div>
        </td>
        <td>
          <div class="user-label">Country:</div>
          <div class="user-data">{{ $user['country'] }}</div>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td colspan=4>
          <div class="user-label">Passport/ID Card No:</div>
          <div class="user-data">{{ $user['passport'] }}</div>
        </td>
      </tr>
    </tbody>
  </table>
@endsection
