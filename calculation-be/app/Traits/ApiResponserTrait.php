<?php

namespace App\Traits;

/*
|--------------------------------------------------------------------------
| Api Responser Trait
|--------------------------------------------------------------------------
|
| This trait will be used for any response we sent to clients.
|
*/

trait ApiResponserTrait
{
	/**
	 * Return a success JSON response.
	 *
	 * @param  array|string  $data
	 * @param  string  $message
	 * @param  int|null  $code
	 * @return \Illuminate\Http\JsonResponse
	 */
	protected function success($data, string $message = null, int $code = 200)
	{
		// key have to 32 character string
		$resp = [
			'success' => true,
			'message' => $message,
			'data' => $data
		];

		return response()->json($resp, $code);
	}

	/**
	 * Return an error JSON response.
	 *
	 * @param  string  $message
	 * @param  int  $code
	 * @param  array|string|null  $data
	 * @return \Illuminate\Http\JsonResponse
	 */
	protected function error(string $message = 'Something went wrong. Please try again.', int $code = 400, $data = null)
	{
		return response()->json([
			'success' => false,
			'message' => $message,
		], $code);
	}
}
