<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Mail;

class APIController extends Controller
{
	public function sendEmail(Request $request)
	{
		$data = [
			'sender_email' => $request['sender_email'],
			'receiver_email' => $request['receiver_email'],
			'displayname' => $request['displayname'],
			'role' => $request['role'],
			'rid' => $request['rid'],
			'participants' => $request['participants'],
			'link' => $request['link']
		];

		Mail::send('email.invite', $data, function($message) use ($sender_email, $receiver_email, $role) {
			$message->to($receiver_email, '')->subject('Invitation to a new room');
			$message->from($sender_email, 'ClosingRoom');
		});

		return $data;
	}
}
