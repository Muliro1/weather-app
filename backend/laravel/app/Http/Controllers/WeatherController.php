<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    public function getLocation(Request $request, WeatherService $weather)
    {
        $city = $request->input('city');
        $state = $request->input('state');
        $country = $request->input('country');
        $limit = $request->input('limit', 1);

        $result = $weather->getLocation($city, $state, $country, $limit);

        return response()->json($result);
    }

    public function getWeather(Request $request, WeatherService $weather)
{
    $city = $request->input('city');
    $state = $request->input('state');
    $country = $request->input('country');
    $limit = $request->input('limit', 1);

    $locations = $weather->getLocation($city, $state, $country, $limit);

    if (empty($locations) || !isset($locations[0]['lat'], $locations[0]['lon'])) {
        return response()->json(['error' => 'Location not found'], 404);
    }

    $lat = $locations[0]['lat'];
    $lon = $locations[0]['lon'];

    $weatherData = $weather->getWeatherByCoordinates($lat, $lon);

    return response()->json($weatherData);
}
}
