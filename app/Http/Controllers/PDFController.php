<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use PDF;

class PDFController extends Controller
{
	public function dealdetails()
	{
		$data = [
			'roomname' => 'Room1',
			'timelimit' => '2'
		];
		$pdf = PDF::loadView('pdf.dealdetails', $data);

		return view('pdf.dealdetails', $data);
		// return $pdf->stream('dealdetails.pdf');
		// return $pdf->download('dealdetails.pdf');
	}

	public function kyc(Request $request)
	{
		$data = [
			'room' => [
				'rid' => $request->rid,
				'create_date' => $request->create_date,
			],
			'user' => [
				'firstname' => $request->firstname,
				'lastname' => $request->lastname,
				'address' => $request->address,
				'country' => $request->country,
				'passport' => $request->passport,
			]
		];

		$pdf = PDF::loadView('pdf.kyc', $data);

		// return view('pdf.kyc', $data);
		return $pdf->stream('kyc.pdf');
		// return $pdf->download('kyc.pdf');
	}
}
