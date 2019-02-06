<?php

namespace App\Http\Controllers;
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
}
