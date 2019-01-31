<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use PDF;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	public function pdf_DealDetails()
	{
		$data = [
			'roomname' => 'Room1',
			'timelimit' => '2'
		];
		$pdf = PDF::loadView('pdf.dealdetails', $data);

		return $pdf->download('dealdetails.pdf');
    }
}
