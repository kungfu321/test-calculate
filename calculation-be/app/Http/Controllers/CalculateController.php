<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResultRequest;
use App\Models\Result;

class CalculateController extends Controller
{
    public function index()
    {
        try {
            $results = Result::orderByDesc('created_at')->get();

            return $this->success($results);
        } catch (\Throwable $th) {
            return $this->error($th);
        }
    }

    public function sum(StoreResultRequest $request)
    {
        $number1 = $request->get('number1');
        $number2 = $request->get('number2');

        try {
            if ($number1 && $number2) {
                $check = Result::where('number1', $number1)->where('number2', $number2)->exists();

                if ($check) {
                    return $this->error("Already exists");
                }

                $total = $number1 + $number2;

                $result = Result::create([
                    'total' => $total,
                    'number1' => $number1,
                    'number2' => $number2
                ]);

                return $this->success($result);
            } else {
                return $this->error("Missing parameters");
            }
        } catch (\Throwable $th) {
            return $this->error($th);
        }
    }
}
