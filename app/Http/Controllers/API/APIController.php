<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Mail;

class APIController extends Controller
{
	public function sendEmail(Request $request)
	{
		$sender_email = $request['sender_email'];
		$receiver_email = $request['receiver_email'];
		$role = $request['role'];

		$data = [
			'sender_email' => $sender_email,
			'receiver_email' => $receiver_email,
			'role' => $role,
        ];

		Mail::send('emails.invite', $data, function($message) use ($sender_email, $receiver_email, $role) {
			$message->to($receiver_email, '')->subject('Invitation to a new room');
			$message->from($sender_email,'ClosingRoom');
		});

		return [$sender_email, $receiver_email, $role];
	}
}
