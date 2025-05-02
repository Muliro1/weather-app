<?php

namespace app\Http\Controllers;

use app\Services\WeatherService;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    public function getLocation(Request $request, OpenWeatherService $weather)
    {
        $city = $request->input('city');
        $state = $request->input('state');
        $country = $request->input('country');
        $limit = $request->input('limit', 1);

        $result = $weather->getLocation($city, $state, $country, $limit);

        return response()->json($result);
    }
}
